let mysql = require("mysql");


let conexion = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "patodonal26",
    database: "dbmycolection"
})
 
/*
 conexion.query("SELECT * FROM tb_usuario", function(error, result, fields){
     if(error) throw error
     console.log(result)
    
     })
*/

conexion.connect(function(err){
     if(err){
        console.log(err)
    }else{
          console.log("conexion exitosa");
      }
  });
