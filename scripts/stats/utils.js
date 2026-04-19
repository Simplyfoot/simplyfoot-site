const { IGNORED_SUBDIRS } = require('./config');

function isIgnoredSubdir(name) {
    return IGNORED_SUBDIRS.has(name.toLowerCase());
}

module.exports = {
    isIgnoredSubdir,
};
