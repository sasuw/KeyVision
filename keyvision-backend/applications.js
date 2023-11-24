const fs = require('fs');
const path = require('path');
const { Shortcut, getShortcuts } = require('./shortcuts');


const appConfigsDir = __dirname + '/appconfigs';
console.log('appConfigsDir: ' + appConfigsDir);
const appConfigs = [];

/**
 * Represents the configuration for an application.
 */
class AppConfig {
    /**
     * Constructs a new instance of the AppConfig class.
     *
     * @param {string} applicationName - The internal name of the application.
     * @param {string} applicationDisplayName - The display name of the application.
     */
    constructor(applicationName, applicationDisplayName) {
        /**
         * @property {string} applicationName - The internal name of the application.
         */
        this.applicationName = applicationName;

        /**
         * @property {string} applicationDisplayName - The display name of the application.
         */
        this.applicationDisplayName = applicationDisplayName;

        /**
         * @property {Array} shortcuts - A list of shortcuts associated with the application.
         */
        this.shortcuts = [];

        /**
         * @property {Object} keymappings - Maps applications keymappings to JS keymappings (first value: application, second value: JS)
         */
        this.keymappings = [];
    }

    /**
     * Adds a new shortcut to the application.
     *
     * @param {Object} shortcut - The shortcut object to add.
     */
    addShortcut(shortcut) {
        this.shortcuts.push(shortcut);
    }

    /**
     * Retrieves all the shortcuts for the application.
     *
     * @returns {Array} An array of shortcut objects.
     */
    getShortcuts(){
        return this.shortcuts;
    }
}


fs.readdirSync(appConfigsDir).forEach(appDir => {
    console.log(`appDir: ${appDir}`);
    const appConfigPath = path.join(appConfigsDir, appDir, `${appDir}.json`);
    if (fs.existsSync(appConfigPath)) {
        const appConfigsFromJson = JSON.parse(fs.readFileSync(appConfigPath, 'utf8'));
        const appConfig = new AppConfig(appConfigsFromJson.applicationName, appConfigsFromJson.applicationDisplayName);
        if (appConfigsFromJson.configFilePath == null){
            return;
        }
        const configFilePath = appConfigsFromJson.configFilePath.replace('~', process.env.HOME);
        if (fs.existsSync(configFilePath)) {
            if (fs.existsSync(configFilePath)) {
                appConfig.keymappings = appConfigsFromJson.keymappings;

                const configFileContent = fs.readFileSync(configFilePath, 'utf8');
                configFileContent.split('\n').forEach(line => {
                    const match = line.match(/bind "(.*)" "(.*)"/);
                    if (match) {
                        const key = match[1];
                        const command = match[2];
                        appConfig.addShortcut(new Shortcut(command, command, 'default', key));
                    }
                });
            }

            appConfigs.push(appConfig);
        }else{
            console.warn(`Path ${appConfigsFromJson.configFilePath} cannot be found`)
        }
    }
});

function getApplications() {
    return [
        { name: "exampleapp", displayName: "ExampleApp" },
        { name: "cs16",displayName: "Counter-Strike 1.6" },
        { name: "idea",displayName: "IntelliJ IDEA" },
        { name: "vscode",displayName: "Visual Studio Code" }
    ];
}

module.exports = {
    AppConfig,
    getApplications,
    appConfigs
};
