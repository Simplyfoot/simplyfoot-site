function displayCodeStatistics(stats) {
    const {
        tsFiles,
        tsLines,
        tsPercentage,
        tsxFiles,
        tsxLines,
        tsxPercentage,
        totalFiles,
        totalLines,
        tsRawLines,
        tsxRawLines,
        totalRawLines,
    } = stats;

    console.log('CODE LINE STATISTICS (excluding comments and console statements)');
    console.log('==================================================================');
    console.log(`TypeScript (.ts):  ${tsFiles} files, ${tsLines} lines (${tsPercentage}%)`);
    console.log(`React (.tsx):      ${tsxFiles} files, ${tsxLines} lines (${tsxPercentage}%)`);
    console.log(`Total:             ${totalFiles} files, ${totalLines} lines`);
    console.log('');
    console.log('RAW LINE COUNT (no filtering):');
    console.log(`   TypeScript: ${tsRawLines} raw lines`);
    console.log(`   React:      ${tsxRawLines} raw lines`);
    console.log(`   Total:      ${totalRawLines} raw lines`);
}

function displayDistribution(tsPercentage, tsxPercentage, totalCodeLines) {
    console.log('');
    console.log('DISTRIBUTION:');

    const barLength = 50;
    const tsxBarLength = totalCodeLines > 0 ? Math.round((tsxPercentage / 100) * barLength) : 0;
    const tsBarLength = barLength - tsxBarLength;

    console.log(`[${'#'.repeat(tsxBarLength)}${'-'.repeat(tsBarLength)}]`);
    console.log(`  TSX: ${tsxPercentage}%    TS: ${tsPercentage}%`);
}

function displayFileStatistics(median, average) {
    console.log('');
    console.log('PER FILE:');
    console.log(`   Median:  ${median} lines`);
    console.log(`   Average: ${average} lines`);
}

function displayTopFiles(allFilesSorted, topCount) {
    console.log('');
    if (typeof topCount === 'number' && topCount > 0) {
        console.log(`TOP ${topCount} LARGEST FILES:`);
        allFilesSorted.slice(0, topCount).forEach((file, i) => {
            console.log(`   ${i + 1}. [${file.type}] ${file.path} - ${file.lines} lines`);
        });
    }
}

function displayDirectoryStatistics(perDirArray, totalCodeLines) {
    console.log('');
    console.log('DIRECTORIES');
    console.log('==================================================================');

    if (perDirArray.length === 0) {
        console.log('No source folders found under src/');
        return;
    }

    const totalForPercent = Math.max(1, totalCodeLines);

    console.log('');
    console.log(
        `${'RANK'.padEnd(6)} ${'DIR'.padEnd(20)} ${'LINES'.padStart(8)} ${'% GLOBAL'.padStart(10)} ${'TS'.padStart(8)} ${'TSX'.padStart(8)} ${'FILES'.padStart(9)}`,
    );
    console.log('-'.repeat(75));

    perDirArray.forEach((d, idx) => {
        const rank = `${idx + 1}.`;
        const percentGlobal = `${((d.codeLines / totalForPercent) * 100).toFixed(2)}%`;
        const totalFiles = d.tsFiles + d.tsxFiles;

        console.log(
            `${rank.padEnd(6)} ${d.dir.padEnd(20)} ${d.codeLines.toString().padStart(8)} ${percentGlobal.padStart(10)} ${d.tsLines.toString().padStart(8)} ${d.tsxLines.toString().padStart(8)} ${totalFiles.toString().padStart(9)}`,
        );

        if (d.subdirs && d.subdirs.length > 0) {
            d.subdirs
                .sort((a, b) => b.codeLines - a.codeLines)
                .forEach((sd, sdIdx) => {
                    const sdRank = `${idx + 1}.${sdIdx + 1}`;
                    const sdName = `  -- ${sd.name}`;
                    const sdPercentParent = `${((sd.codeLines / Math.max(1, d.codeLines)) * 100).toFixed(2)}%`;
                    const sdTotalFiles = sd.tsFiles + sd.tsxFiles;

                    console.log(
                        `${sdRank.padEnd(6)} ${sdName.padEnd(20)} ${sd.codeLines.toString().padStart(8)} ${sdPercentParent.padStart(10)} ${sd.tsLines.toString().padStart(8)} ${sd.tsxLines.toString().padStart(8)} ${sdTotalFiles.toString().padStart(9)}`,
                    );
                });
        }
    });
}

function displaySeparateStatistics(separateStats) {
    if (!separateStats || separateStats.length === 0) return;

    console.log('');
    console.log('SEPARATE DIRECTORIES (not included in global totals)');
    console.log('==================================================================');

    for (const s of separateStats) {
        const totalFiles = s.tsFiles + s.tsxFiles;
        const totalLines = s.tsLines + s.tsxLines;
        const totalRaw = s.tsRawLines + s.tsxRawLines;
        console.log('');
        console.log(
            `  ${s.dir}: ${totalFiles} files, ${totalLines} lines (TS: ${s.tsLines}, TSX: ${s.tsxLines})`,
        );
        console.log(`     Raw lines: ${totalRaw} (TS: ${s.tsRawLines}, TSX: ${s.tsxRawLines})`);
    }
}

module.exports = {
    displayCodeStatistics,
    displaySeparateStatistics,
    displayDistribution,
    displayFileStatistics,
    displayTopFiles,
    displayDirectoryStatistics,
};
