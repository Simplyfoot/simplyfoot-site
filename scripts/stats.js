const fs = require('fs');
const path = require('path');

const { SOURCE_DIRS, SEPARATE_DIRS, TS_EXTENSIONS, TSX_EXTENSIONS } = require('./stats/config');
const { findFiles } = require('./stats/fileSystem');
const { countLines, countRawLines } = require('./stats/lineCounter');
const { isIgnoredSubdir } = require('./stats/utils');
const {
    displayCodeStatistics,
    displayDistribution,
    displayFileStatistics,
    displayTopFiles,
    displayDirectoryStatistics,
    displaySeparateStatistics,
} = require('./stats/display');

function analyzeCodebase(options = {}) {
    const { verbose = false, topCount } = options;

    let tsLines = 0;
    let tsFiles = 0;
    let tsxLines = 0;
    let tsxFiles = 0;
    let tsRawLines = 0;
    let tsxRawLines = 0;

    const fileLinesArray = [];
    const fileDetails = [];
    const perDirStats = {};

    for (const sourceDir of SOURCE_DIRS) {
        const dirPath = path.resolve(`src/${sourceDir}`);

        if (!fs.existsSync(dirPath)) {
            if (verbose) console.warn(`Directory src/${sourceDir} does not exist, skipping.`);
            continue;
        }

        perDirStats[sourceDir] = {
            tsFiles: 0,
            tsxFiles: 0,
            tsLines: 0,
            tsxLines: 0,
            subdirs: {},
        };

        const dirStats = perDirStats[sourceDir];

        const processFile = (file, extType) => {
            const codeLines = countLines(file);
            const rawLines = countRawLines(file);

            if (extType === 'TS') {
                tsLines += codeLines;
                tsRawLines += rawLines;
                tsFiles++;
                dirStats.tsLines += codeLines;
                dirStats.tsFiles++;
            } else {
                tsxLines += codeLines;
                tsxRawLines += rawLines;
                tsxFiles++;
                dirStats.tsxLines += codeLines;
                dirStats.tsxFiles++;
            }

            const relToSourceDir = path.relative(dirPath, file);
            const firstSeg = relToSourceDir.split(path.sep)[0];
            if (
                firstSeg &&
                firstSeg !== relToSourceDir &&
                !isIgnoredSubdir(firstSeg)
            ) {
                if (!dirStats.subdirs[firstSeg]) {
                    dirStats.subdirs[firstSeg] = {
                        name: firstSeg,
                        tsFiles: 0,
                        tsxFiles: 0,
                        tsLines: 0,
                        tsxLines: 0,
                    };
                }
                const sd = dirStats.subdirs[firstSeg];
                if (extType === 'TS') {
                    sd.tsFiles += 1;
                    sd.tsLines += codeLines;
                } else {
                    sd.tsxFiles += 1;
                    sd.tsxLines += codeLines;
                }
            }

            fileLinesArray.push(codeLines);
            fileDetails.push({
                path: path.relative(process.cwd(), file),
                lines: codeLines,
                type: extType,
            });
        };

        for (const file of findFiles(dirPath, TS_EXTENSIONS)) processFile(file, 'TS');
        for (const file of findFiles(dirPath, TSX_EXTENSIONS)) processFile(file, 'TSX');
    }

    const totalCodeLines = tsLines + tsxLines;
    const totalRawLines = tsRawLines + tsxRawLines;
    const tsPercentage = totalCodeLines > 0 ? ((tsLines / totalCodeLines) * 100).toFixed(2) : '0.00';
    const tsxPercentage =
        totalCodeLines > 0 ? ((tsxLines / totalCodeLines) * 100).toFixed(2) : '0.00';

    const totalFiles = tsFiles + tsxFiles;
    let averageLinesPerFile = 0;
    let medianLinesPerFile = 0;

    if (totalFiles > 0) {
        averageLinesPerFile = Math.round(totalCodeLines / totalFiles);
        const sorted = [...fileLinesArray].sort((a, b) => a - b);
        const mid = Math.floor(sorted.length / 2);
        medianLinesPerFile =
            sorted.length % 2 === 0 ? Math.round((sorted[mid - 1] + sorted[mid]) / 2) : sorted[mid];
    }

    const allFilesSorted = [...fileDetails].sort((a, b) => b.lines - a.lines);

    const separateStats = [];
    for (const sep of SEPARATE_DIRS) {
        const sepPath = path.resolve(`src/${sep}`);
        if (!fs.existsSync(sepPath)) continue;

        const agg = {
            dir: sep,
            tsFiles: 0,
            tsxFiles: 0,
            tsLines: 0,
            tsxLines: 0,
            tsRawLines: 0,
            tsxRawLines: 0,
        };

        for (const file of findFiles(sepPath, TS_EXTENSIONS)) {
            agg.tsFiles++;
            agg.tsLines += countLines(file);
            agg.tsRawLines += countRawLines(file);
        }
        for (const file of findFiles(sepPath, TSX_EXTENSIONS)) {
            agg.tsxFiles++;
            agg.tsxLines += countLines(file);
            agg.tsxRawLines += countRawLines(file);
        }

        separateStats.push(agg);
    }

    const perDirArray = Object.keys(perDirStats).map((dirName) => {
        const s = perDirStats[dirName];
        const codeLines = s.tsLines + s.tsxLines;

        const subdirs = Object.values(s.subdirs)
            .filter((sd) => !isIgnoredSubdir(sd.name))
            .map((sd) => ({
                name: sd.name,
                codeLines: sd.tsLines + sd.tsxLines,
                tsLines: sd.tsLines,
                tsxLines: sd.tsxLines,
                tsFiles: sd.tsFiles,
                tsxFiles: sd.tsxFiles,
            }));

        return {
            dir: dirName,
            codeLines,
            tsLines: s.tsLines,
            tsxLines: s.tsxLines,
            tsFiles: s.tsFiles,
            tsxFiles: s.tsxFiles,
            subdirs,
        };
    });

    perDirArray.sort((a, b) => b.codeLines - a.codeLines);

    displayCodeStatistics({
        tsFiles,
        tsLines,
        tsPercentage,
        tsxFiles,
        tsxLines,
        tsxPercentage,
        totalFiles,
        totalLines: totalCodeLines,
        tsRawLines,
        tsxRawLines,
        totalRawLines,
    });
    displayDistribution(tsPercentage, tsxPercentage, totalCodeLines);
    displayFileStatistics(medianLinesPerFile, averageLinesPerFile);
    displayTopFiles(allFilesSorted, topCount);
    displayDirectoryStatistics(perDirArray, totalCodeLines);
    displaySeparateStatistics(separateStats);

    return {
        typescript: { files: tsFiles, lines: tsLines, rawLines: tsRawLines },
        react: { files: tsxFiles, lines: tsxLines, rawLines: tsxRawLines },
        total: { files: totalFiles, lines: totalCodeLines, rawLines: totalRawLines },
        perDirectory: perDirArray,
        separate: separateStats,
    };
}

if (require.main === module) {
    const argv = process.argv;
    const verbose = argv.includes('--verbose') || argv.includes('-v');

    let topCount = 10;
    for (let i = 2; i < argv.length; i++) {
        const a = argv[i];
        if (a.startsWith('--top=')) {
            const v = parseInt(a.split('=')[1], 10);
            if (!Number.isNaN(v)) topCount = v;
        } else if (a === '--top' && i + 1 < argv.length) {
            const v = parseInt(argv[i + 1], 10);
            if (!Number.isNaN(v)) topCount = v;
        }
    }

    try {
        analyzeCodebase({ verbose, topCount });
    } catch (error) {
        console.error('Error during analysis:', error.message);
        process.exit(1);
    }
}

module.exports = { analyzeCodebase };
