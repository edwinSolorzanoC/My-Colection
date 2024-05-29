let mysql = require("mysql");
const express = require("express");

//crear objeto para llamar metodos de expreess:::::::::::::
const app = express();

//CONEXION A LA BASE DE DATOS:::::::::::::::::::::::::::::::::::
let conexion = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "patodonal26",
    database: "dbmycolection"
});

//leer errores de conexion
conexion.connect(function(err){
     if(err){
        console.log(err)
    }else{
          console.log("conexion exitosa");
      }
  });
  
  //no recuerdo para que era pero se que tebia que ver con eso jejejej
  app.use(express.json());
  app.use(express.urlencoded({extended:false}));

  app.post("/ingresar",function(req,res){ //lectura post desde registrar form

    const datosUs = req.body; //trae los datos
    //aca se sepran los datos
    let name = datosUs.username;
    let pass = datosUs.password;


    let buscar = "SELECT * FROM tb_usuario WHERE tb_usuario_nombre = '"+name+"' "; //hace un select al nombre de la tabla usuarios

    conexion.query(buscar,function(error,row){

        if(error){

            throw error; //si hay error tirelo

        }else{

            if(row.length>0){ //si en la linea hay algo repetido avise

                console.log("Usuario Existente");
            
            }else{
                let registrar = "INSERT INTO tb_usuario (tb_usuario_nombre, tb_usuario_contrasenna) VALUES ('"+name+"','"+pass+"')"; //linea de codigo para registrar en caso de toodo nice
                
                conexion.query(registrar,function(error){ //haga registrar y una funcion en caso de que lago salga mal
                    if(error){
                        throw error;
                    }else{
                        console.log("Datos almacenados en la bd"); //si todo sale good almacene
                    }
                });
            }
        }
     });

    });

    // conexion.end(); //termine la conexion
    
/*
  //insertar en la tabla usuarios CONSOLA
  const nuevoUsuario = "INSERT INTO tb_usuario (tb_usuario_nombre, tb_usuario_contrasenna) VALUES ('edwinSolorzano', '654321');";
  conexion.query(nuevoUsuario, function(error,rows){
    if(error){
        throw error;
    }else{
        console.log("nuevo usuario registrado")
    }
  });
*/
/*
  //consulta los usuarios de la tabla usuarios de la bdmycolection. Muestra resultado en consola CONSOLA
  const usuarios = "SELECT * FROM tb_usuario";
  conexion.query(usuarios,function(error,lista){
    if(error){
        throw error;
    }else{
        console.log(lista);
    }
  });
  
  */
  

    

