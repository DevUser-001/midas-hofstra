const express = require('express');
const router = express.Router();

const b2b = require("./b2b");
const b2c = require("./b2c");
const crm = require("./crm");

router.get("/index", (request, response, next) => {
    response.render("index" )
})


router.use("/b2b", b2b );
router.use("/b2c", b2c );
router.use("/crm", crm );

module.exports = router;