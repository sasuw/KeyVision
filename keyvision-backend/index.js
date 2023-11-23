const express = require('express');
const app = express();
const port = 3000;
const getApplications = require('./applications');
const getShortcuts = require('./shortcuts');

app.get('/alive', (req, res) => {
    res.send('Server is up and running!');
});

app.get('/version', (req, res) => {
    res.send('API Version: 0.1.0');
});

app.get('/applications', (req, res) => {
    res.json(getApplications());
});

app.get('/applications/shortcuts/:appName', (req, res) => {
    const appName = req.params.appName;
    res.json(getShortcuts(appName));
});

// Start the server
app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
