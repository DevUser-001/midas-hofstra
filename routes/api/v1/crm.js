const csv = require("csv-parser");
const fs = require('fs');
var express = require("express");
const xlsx = require("xlsx");
var router = express.Router();

const typeproduct = ['EDT','EDP', 'EDC', 'Deostick', 'BL'];

router.get("/index", (request, response, next) => {
    response.render("index" )
})

router.get("/klanten", (request, response, next) => {
    response.render("klanten" )
})

router.get("/leads", (request, response, next) => {
    response.render("leads")
})  

router.get("/acquisitie", (request, response, next) => {
    response.render("kansen")
})  

router.post("/addCustomer", (request, response, next) => {
    
    const post = request.body;
    console.log(post);

    
    var html = `
    <div class="card-box mb-2">
        <div class="row align-items-center">
            <div class="col-sm-4">
                <div class="media">
                    <img class="d-flex align-self-center mr-3 rounded-circle" src="/images/companies/google.png" alt="Generic placeholder image" height="64">
                    <div class="media-body">
                        <h4 class="mt-0 mb-2 font-16">${post.form_company}</h4>
                        <p class="mb-1"><b>Locatie:</b> ${post.form_country}</p>
                        <p class="mb-0"><b>Adres:</b> ${post.form_address} ${post.form_postcode}</p>
                    </div>
                </div>
            </div>
            <div class="col-sm-4">
                <p class="mb-1 mt-3 mt-sm-0"><i class="mdi mdi-email mr-1"></i> ${post.form_name} ${post.form_lastName}</p>
                <p class="mb-1 mt-3 mt-sm-0"><i class="mdi mdi-email mr-1"></i> ${post.form_email}</p>
                <p class="mb-0"><i class="mdi mdi-phone-classic mr-1"></i> ${post.form_tel}</p>
            </div>
            <div class="col-sm-2">
                <div class="text-center mt-3 mt-sm-0">
                    <div class="badge font-14 bg-soft-info text-info p-1">Lauw</div>
                </div>
            </div>
            <div class="col-sm-2">
                <div class="text-sm-right">
                    <a href="javascript:void(0);" class="action-icon"> <i class="mdi mdi-square-edit-outline"></i></a>
                    <a href="javascript:void(0);" class="action-icon"> <i class="mdi mdi-delete"></i></a>
                </div>
            </div> <!-- end col-->
        </div> <!-- end row -->
        </div>
    `;

    response.status(200).send({data: html});
})  

router.get("/acquisitie2", (request, response, next) => {
    response.render("kansendetails")
})  

module.exports = router;