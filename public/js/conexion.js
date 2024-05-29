let mysql = require("mysql");


//CONEXION A LA BASE DE DATOS:::::::::::::::::::::::::::::::::::
let conexion = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "patodonal26",
    database: "dbmycolection"
});


conexion.connect(function(err){ //erorres en la conexion o no
     if(err){
        console.log(err)
    }else{
          console.log("conexion exitosa");
      }
  });
  

  module.exports = conexion;