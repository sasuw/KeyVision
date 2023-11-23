const KeyCode = require('keycode-js');
const {all} = require("express/lib/application");

class Shortcut {
    constructor(name, displayName, ...keyCodes) {
        this.name = name;
        this.displayName = displayName;
        this.keyCodes = keyCodes;
    }
}

function getShortcuts(application) {
    if (application.toLowerCase() === 'exampleapp'.toLowerCase()) {
        return [
            new Shortcut("newfile", "New File", [KeyCode.KEY_N, KeyCode.KEY_CONTROL])
        ];
    }
    return [];
}

module.exports = getShortcuts;
