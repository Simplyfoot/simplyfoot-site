const fs = require('fs');
const path = require('path');

/**
 * Recursively finds files with the given extensions under `dir`.
 */
function findFiles(dir, extensions) {
    const files = [];

    function traverse(currentDir) {
        const items = fs.readdirSync(currentDir);

        for (const item of items) {
            const itemPath = path.join(currentDir, item);
            const stat = fs.statSync(itemPath);

            if (stat.isDirectory()) {
                traverse(itemPath);
            } else if (stat.isFile() && extensions.includes(path.extname(item))) {
                files.push(itemPath);
            }
        }
    }

    traverse(dir);
    return files;
}

module.exports = {
    findFiles,
};
