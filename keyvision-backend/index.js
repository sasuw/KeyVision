const express = require("express"),
    bodyParser = require("body-parser"),
    swaggerJsdoc = require("swagger-jsdoc"),
    swaggerUi = require("swagger-ui-express");
const app = express();
const port = 3000;

const getApplications = require('./applications');
const getShortcuts = require('./shortcuts');

/**
 * @openapi
 * /alive:
 *   get:
 *     description: Health check route to confirm the server is running.
 *     responses:
 *       200:
 *         description: Confirmation that the server is running.
 */
app.get('/alive', (req, res) => {
    res.send('Server is up and running!');
});

/**
 * @openapi
 * /version:
 *   get:
 *     description: Provides the current version of the API.
 *     responses:
 *       200:
 *         description: Returns the current API version.
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 */
app.get('/version', (req, res) => {
    res.send('API Version: 0.1.0');
});

/**
 * @openapi
 * /applications:
 *   get:
 *     description: Retrieves a list of applications.
 *     responses:
 *       200:
 *         description: Returns an array of application objects.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 */
app.get('/applications', (req, res) => {
    res.json(getApplications());
});


/**
 * @openapi
 * /applications/shortcuts/{appName}:
 *   get:
 *     description: Retrieves shortcuts for a specified application.
 *     parameters:
 *       - in: path
 *         name: appName
 *         required: true
 *         description: The name of the application.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Returns an array of shortcut objects for the given application.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
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
    apis: ['./index.js']
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
