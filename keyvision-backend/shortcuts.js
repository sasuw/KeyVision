const KeyCode = require('keycode-js');
const { all } = require("express/lib/application");

/**
 * Represents a keyboard shortcut.
 * @class
 * @param {string} name - The internal name of the shortcut.
 * @param {string} displayName - The display name of the shortcut.
 * @param {string} shortcutType - The type of the shortcut (e.g., 'default', 'user').
 * @param {...number} keyCodes - Key codes that make up the shortcut.
 */
class Shortcut {
    constructor(name, displayName, shortcutType, ...keyCodes) {
        this.name = name;
        this.displayName = displayName;
        this.shortcutType = shortcutType;
        this.keyCodes = keyCodes;
    }

    toString() {
        return `Shortcut { Name: ${this.name}, DisplayName: ${this.displayName}, Type: ${this.shortcutType}, KeyCodes: [${this.keyCodes.join(', ')}] }`;
    }
}

/**
 * Retrieves shortcuts for a given application.
 * @function getShortcuts
 * @param {string} application - The name of the application.
 * @returns {Shortcut[]} An array of Shortcut objects for the specified application.
 */
function getShortcuts(application) {
    if (application.toLowerCase() === 'exampleapp'.toLowerCase()) {
        return [
            new Shortcut("newfile", "New File", "default", [KeyCode.KEY_N, KeyCode.KEY_CONTROL]),
            new Shortcut("save", "Save file", "user", [KeyCode.KEY_S, KeyCode.KEY_CONTROL])
        ];
    }
    return [];
}

module.exports = {
    Shortcut,
    getShortcuts
};