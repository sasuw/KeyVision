const fs = require('fs');
const path = require('path');
const { Shortcut, getShortcuts } = require('./shortcuts');


const appConfigsDir = __dirname + '/appconfigs';
console.log('appConfigsDir: ' + appConfigsDir);
const appConfigs = [];

class AppConfig {
    constructor(applicationName, applicationDisplayName) {
        this.applicationName = applicationName;
        this.applicationDisplayName = applicationDisplayName;
        this.shortcuts = [];
    }

    addShortcut(shortcut) {
        this.shortcuts.push(shortcut);
    }

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

console.log(appConfigs);

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
