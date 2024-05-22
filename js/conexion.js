let mysql = require("mysql");


let conexion = mysql.createConnection({
    host: "localhost",
    database: "dbmycolection",
    user: "root",
    password: "patodonal26"
});
 
// conexion.query("SELECT * FROM tb_usuario", function(error, result, fields){
//     if(error) throw error
//     console.log(result)
    
//     })

  conexion.connect(function(err){
     if(err){
        throw err;
    }else{
          console.log("conexion exitosa");
      }
  });

//la conexion esta mal, da error. Probar en terminal de vs con, node javascript/conexion.js
//creo que el error es de la linea 4 a las 11, pero mejjor ver video o buscar en chat....

