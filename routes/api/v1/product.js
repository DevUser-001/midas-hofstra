const csv = require("csv-parser");
const fs = require('fs');
var express = require("express");

const xlsx = require("xlsx");
var router = express.Router();
const converter = require('json-2-csv');

const typeproduct = ['EDT','EDP', 'EDC', 'Deostick', 'BL'];


router.get("/", (request, response, next) => {
    response.redirect("/index")
})  

router.get("/index", (request, response, next) => {
    response.render("index")
})  

router.get("/producten", (request, response, next) => {
    response.render("producten")
}) 

router.get("/export", (request, response, next) => {
    response.render("export")
}) 

router.get("/import", (request, response, next) => {
    response.render("import")
})  

router.get("/data", (request, response, next) =>{
    response.render("data")
})

router.post("/data", (request, response, next) => {
    
    var csvData = [];
    fs.createReadStream('./data/csv/Voorbeeld.csv').pipe(csv({ delimiter: ',' })).on('data',
    function(row){

            var product = {
                ean: row[0],
                product_: row[1],
                //merk: row[2],
                //product: row[3],
                type: row[4],
                //volume: row[6],
                giftset_inhoud: row[7],
                aantal: row[8],
                inkoop_prijs: row[9],
                //groothandel_prijs: row[10],
                //inkoop_min: row[11],
                //inkoop_max: row[12],
                //verkoop_berekend: row[13],
                //store_prijs: row[14],
                //winst_min: row[15],
                //winst_max: row[16],
                //winst: row[17],
                //sku: row[18],
                eu_clean: row[19],
                //notities: row[20],
                //images: [row[0] + '.jpg' ]
            }; 

            /*
            const item = new Product({
                ean: row[0],
                product_: row[1],
                merk: row[2],
                product: row[3],
                type: row[4],
                volume: row[6],
                giftset_inhoud: row[7],
                aantal: row[8],
                inkoop_prijs: row[9],
                groothandel_prijs: row[10],
                inkoop_min: row[11],
                inkoop_max: row[12],
                verkoop_berekend: row[13],
                store_prijs: row[14],
                winst_min: row[15],
                winst_max: row[16],
                winst: row[17],
                sku: row[18],
                eu_clean: row[19],
                notities: row[20],
                images: [row[0] + '.jpg' ]
            }) */
    
            //item.save().then((value)=>{console.log(value)}).catch(err=> console.log(err));
    
            csvData.push(product);
    
        }).on('end', function() {
            converter.json2csv(csvData, (err, csv) => {
                if (err) {
                    throw err;
                }
    
                fs.writeFileSync('./export/export.csv', csv);

                var files  = []
                for (each in csvData){
                    files.push(csvData[each])
                    }  
                var obj = files.map((e) =>{
                        return e
                    })

                var newWB = xlsx.utils.book_new()

                var newWS = xlsx.utils.json_to_sheet(obj)

                xlsx.utils.book_append_sheet(newWB,newWS,"name");

                xlsx.writeFile(newWB,"Data.xlsx");

            });
    
            console.log("done")

        });

    response.send("data");
});

module.exports = router;