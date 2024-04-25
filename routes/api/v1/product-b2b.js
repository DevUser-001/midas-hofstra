const csv = require("csv-parser");
const fs = require('fs');
var express = require("express");

const xlsx = require("xlsx");
const excel = require("exceljs");
var router = express.Router();
const converter = require('json-2-csv');

let Product = require("../../../models/product");
let Volume = require("../../../models/volume");
const upload = require("./middlewares/upload");
const dataController = require("./middlewares/dataController");


router.get("/", (request, response, next) => {
    response.redirect("/index")
})  

router.get("/index", (request, response, next) => {
    response.render("index", {user: request.user})
})  

router.get("/producten", (request, response, next) => {
    response.render("producten", {user: request.user})
}) 

router.get("/export", (request, response, next) => {
    response.render("export", {user: request.user})
}) 

router.get("/import", (request, response, next) => {
    response.render("import", {user: request.user})
})  

router.get("/data", (request, response, next) =>{
    response.render("data", {user: request.user})
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

                xlsx.utils.book_append_sheet(newWB,newWS,"name")//workbook name as param

                xlsx.writeFile(newWB,"Sample-Data.xlsx")//file name as param

            });

        });

    response.send("data");
});

router.post("/import", upload.single("file"), dataController.upload);

router.post("/export", async (request, response, next) => {

    const post = request.body;
    console.log(post);

    const attr = {};
    let columns = [];

    for (let prop in post) {
        if (prop.startsWith('attr')) {
            let key = prop.replace('attr', '').replace(/_/, '');
            attr[key] = post[prop];
        }
    }

    if (attr.ean == 'on') columns.push({ header: 'EAN', key: 'ean', width: 20 });
    if (attr.sku == 'on') columns.push({ header: 'sku', key: 'sku', width: 10 });
    if (attr.product_ == 'on' && attr.product == 'on') {
        columns.push({ header: 'Merk', key: 'merk', width: 10 });
        columns.push({ header: 'Productnaam', key: 'product', width: 25 });
        columns.push({ header: 'Type', key: 'type', width: 10 });
        columns.push({ header: 'Volume', key: 'volume', width: 15 });
    } else if ( attr.product_ && !attr.product ){
        columns.push({ header: 'Product', key: 'product_', width: 50 });
    }
    if (attr.giftset_inhoud == 'on') columns.push({ header: 'Giftset Inhoud', key: 'giftset_inhoud', width: 15 });
    if (attr.aantal == 'on') columns.push({ header: 'Voorraad', key: 'aantal', width: 10 });
    columns.push({ header: 'Prijs', key: 'store_prijs', width: 10 });

    console.log(columns);

    let search = {};
    if (attr.euclean == 'false'){
        search = { 'eu_clean': '' };
    } else {
        
        search = { 'eu_clean': '1' }
    };
    
    try{
        const producten = await Product.find(search)
        .populate({ path: 'volumes', select: 'ean volume stock storePrice' });
        if(!producten) throw Error('Geen producten');
          
          console.log(producten[0]);
          let workbook = new excel.Workbook(); //creating workbook
          let worksheet = workbook.addWorksheet(`${attr.listname}`); //creating worksheet
          
          //  WorkSheet Header
          worksheet.columns = columns;
          
          // Add Array Rows
          worksheet.addRows(producten);
          
          let date = new Date();
          var str =  date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear();

          let filename = `${attr.listname}.Prijslijst.${str}.xlsx`;

          // Write to File
          workbook.xlsx.writeFile(`${filename}`)
            .then(function() {
              console.log("file saved!");
            });
          
        //response.render('export', { fire: true});
        response.download(`./${filename}`, `./${filename}`, (err) => {
            if (err) {
              //handle error
              return
            } else {
              //do something
            }
          })

    } catch(err){
        response.status(400).json({msg: err.message });
    }

    
});

module.exports = router;