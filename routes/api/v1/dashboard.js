const express = require('express');
const router = express.Router();

const b2b = require("./b2b");
const b2c = require("./b2c");
const crm = require("./crm");

router.get("/index", (request, response, next) => {
    response.render("index")
})

router.use("/b2b", b2b );
router.use("/b2c", b2c );
router.use("/crm", crm );

router.get("/companies", (request, response, next) => {
    response.render("companies" )
});

router.get("/ecommerce-dashboard", (request, response, next) => {
    response.render("ecommerce-dashboard")
});
router.get("/ecommerce-products", (request, response, next) => {
    response.render("ecommerce-products")
});
router.get("/ecommerce-product-detail", (request, response, next) => {
    response.render("ecommerce-product-detail")
});
router.get("/ecommerce-add-product", (request, response, next) => {
    response.render("ecommerce-add-product")
});
router.get("/ecommerce-customers", (request, response, next) => {
    response.render("ecommerce-customers")
});
router.get("/ecommerce-orders", (request, response, next) => {
    response.render("ecommerce-orders")
});
router.get("/ecommerce-order-detail", (request, response, next) => {
    response.render("ecommerce-order-detail")
});
router.get("/ecommerce-sellers", (request, response, next) => {
    response.render("ecommerce-sellers")
});
router.get("/tickets-list", (request, response, next) => {
    response.render("tickets-list")
});
router.get("/tickets-detail", (request, response, next) => {
    response.render("tickets-detail")
});



module.exports = router;