/**
 * Source directories to analyze (under src/)
 */
const SOURCE_DIRS = ['app', 'components', 'config', 'i18n', 'lib'];

/**
 * Directories analyzed separately (not included in global totals).
 */
const SEPARATE_DIRS = ['shadcn'];

const TS_EXTENSIONS = ['.ts'];
const TSX_EXTENSIONS = ['.tsx'];

/**
 * Subdirectories ignored in hierarchical display
 */
const IGNORED_SUBDIRS = new Set(['__tests__', 'node_modules', '.next']);

module.exports = {
    SOURCE_DIRS,
    SEPARATE_DIRS,
    TS_EXTENSIONS,
    TSX_EXTENSIONS,
    IGNORED_SUBDIRS,
};
