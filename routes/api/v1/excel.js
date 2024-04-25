const xlsx = require("xlsx");
const fs = require("fs");
var rawFile = fs.readFileSync("./datas.json");
var raw = JSON.parse(rawFile)

var files  = []
for (each in raw){
    files.push(raw[each])
    }  
   var obj = files.map((e) =>{
        return e
       })

   var newWB = xlsx.book_new()

   var newWS = xlsx.utils.json_to_sheet(obj)

   xlsx.utils.book_append_sheet(newWB,newWS,"name");

   xlsx.writeFile(newWB,"Sales-Data.xlsx");