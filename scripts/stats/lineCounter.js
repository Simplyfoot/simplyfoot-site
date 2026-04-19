const fs = require('fs');

const CONSOLE_RE = /^\s*console\.(log|warn|error|info|debug)\s*\([^)]*\)\s*;?\s*$/;

function shouldExcludeLine(trimmed) {
    if (trimmed.length === 0) return true;
    if (
        trimmed.startsWith('//') ||
        trimmed.startsWith('/*') ||
        trimmed.startsWith('*') ||
        trimmed.endsWith('*/')
    ) {
        return true;
    }
    return CONSOLE_RE.test(trimmed);
}

/**
 * Counts code lines (excludes blanks, comments, console statements).
 */
function countLines(filePath) {
    const content = fs.readFileSync(filePath, 'utf8');
    const lines = content.split('\n');

    let codeLines = 0;
    let inBlockComment = false;

    for (const line of lines) {
        const trimmed = line.trim();

        if (trimmed.includes('/*') && !trimmed.includes('*/')) {
            inBlockComment = true;
            continue;
        }
        if (inBlockComment) {
            if (trimmed.includes('*/')) inBlockComment = false;
            continue;
        }

        if (shouldExcludeLine(trimmed)) continue;
        codeLines++;
    }

    return codeLines;
}

function countRawLines(filePath) {
    return fs.readFileSync(filePath, 'utf8').split('\n').length;
}

module.exports = {
    countLines,
    countRawLines,
};
