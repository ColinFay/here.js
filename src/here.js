const mod_path = require('path');
const fs = require('fs');

const here = function(path = "", max_depth = null) {

    if (max_depth === null) {
        var here_max_depth = process.env.HERE_MAX_DEPTH || 3
    } else {
        var here_max_depth = max_depth
    }

    var cwd = process.cwd();

    // Look for .here
    for (var i = 0; i < here_max_depth; i++) {
        let fls = fs.readdirSync(cwd);
        if (fls.includes('.here')) {
            return mod_path.join(cwd, path)
        } else {
            cwd = mod_path.dirname(cwd);
        }
    }

    var cwd = process.cwd();

    // Look for package.json
    for (var i = 0; i < here_max_depth; i++) {
        let fls = fs.readdirSync(cwd);
        if (fls.includes('package.json')) {
            return mod_path.join(cwd, path)
        } else {
            cwd = mod_path.dirname(cwd);
        }
    }

    return path
}

const set_here = function(path = ".") {
    fs.writeFileSync(
        mod_path.join(path, ".here"),
        ""
    )
}

module.exports = {
    here,
    set_here
}