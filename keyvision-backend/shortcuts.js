const KeyCode = require('keycode-js');
// /import * as KeyCode from 'keycode-js';
const {all} = require("express/lib/application");

class ModifierKey {
    constructor(name, ...keys){
        this.name = name;
        this.keys = keys;
    }
}

const ModifierKeys = {
    'shift': new ModifierKey('shift', KeyCode.KEY_SHIFT ),
    'ctrl': new ModifierKey('ctrl', KeyCode.KEY_CONTROL ),
    'alt': new ModifierKey('alt', KeyCode.KEY_ALT ),
    'capslock': new ModifierKey('capslock', KeyCode.KEY_CAPS_LOCK ),
    'meta': new ModifierKey('meta', KeyCode.KEY_FIREFOX_META ),
    'esc': new ModifierKey('esc', KeyCode.KEY_ESCAPE ),
    'tab': new ModifierKey('tab', KeyCode.KEY_TAB )
};

Object.freeze(ModifierKeys); // This makes the object immutable, more enum-like

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
            new Shortcut("newfile", "New File", [KeyCode.KEY_N, [ModifierKeys.ctrl]])
        ];
    }
    return [];
}

module.exports = getShortcuts;
