const express = require("express"),
    bodyParser = require("body-parser"),
    swaggerJsdoc = require("swagger-jsdoc"),
    swaggerUi = require("swagger-ui-express");
const app = express();
const port = 3000;

const getApplications = require('./applications');
const getShortcuts = require('./shortcuts');

/**
 * Route serving a health check.
 * @name get/alive
 * @function
 * @memberof module:Express
 * @inner
 * @returns {string} - Confirmation that the server is running.
 */
app.get('/alive', (req, res) => {
    res.send('Server is up and running!');
});

/**
 * Route serving the API version.
 * @name get/version
 * @function
 * @memberof module:Express
 * @inner
 * @returns {string} - The current version of the API.
 */
app.get('/version', (req, res) => {
    res.send('API Version: 0.1.0');
});

/**
 * Route serving a list of applications.
 * @name get/applications
 * @function
 * @memberof module:Express
 * @inner
 * @returns {Object[]} - An array of application objects.
 */
app.get('/applications', (req, res) => {
    res.json(getApplications());
});

/**
 * Route serving shortcuts for a specific application.
 * @name get/applications/shortcuts/:appName
 * @function
 * @memberof module:Express
 * @inner
 * @param {string} appName - The name of the application.
 * @returns {Object[]} - An array of shortcut objects for the given application.
 */
app.get('/applications/shortcuts/:appName', (req, res) => {
    const appName = req.params.appName;
    res.json(getShortcuts(appName));
});

const options = {
    definition: {
        openapi: "3.1.0",
        info: {
            title: "KeyVision Backend",
            version: "0.1.0",
            description:
                "",
            license: {
                name: "MIT",
                url: "https://spdx.org/licenses/MIT.html",
            },
            contact: {
                name: "7P FFM",
                url: "https://7p-mobility.com",
                email: "info@7p-mobility.com",
            },
        },
        servers: [
            {
                url: "http://localhost:3000",
            },
        ],
    },
    apis: ["./routes/*.js"],
};

const specs = swaggerJsdoc(options);
app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(specs)
);

// Start the server
/**
 * Starts the Express server.
 * @function
 * @memberof module:Express
 */
app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
