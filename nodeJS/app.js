const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require("body-parser");
const commonsRouter = require("./api/commonsRouter")
app.use(cors());

// app.use(bodyParser.json({ type: 'application/*+json' }))
// app.use(bodyParser.raw({ type: 'application/vnd.custom-type' }))

// // parse an HTML body into a string
// app.use(bodyParser.text({ type: 'text/html' }))

// // parse an HTML body into a string
// app.use(bodyParser.text({ type: 'text/html' }))

app.use(bodyParser.urlencoded({
    extended: true,
    limit: '50mb'
}));

app.use(bodyParser.json());

app.use("/commons",commonsRouter);

module.exports = app;