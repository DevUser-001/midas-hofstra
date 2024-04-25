const csv = require("csv-parser");
const Papa = require("papaparse");
const fs = require('fs');
var express = require("express");
var router = express.Router();

var api = require("./api/api");

router.get("/", (req, response, next) => {
    response.send( {msg: "Navigeer naar /api "} );
});

router.use("/api", api );

module.exports = router;