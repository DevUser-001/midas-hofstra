
var express = require("express");
var router = express.Router();

var v1 = require("./v1/index");

router.get("/", (req, response, next) => {
    response.send( {msg: "Keuze API v1.0: + /v1/"} );
});

router.use("/v1", v1 );
module.exports = router;