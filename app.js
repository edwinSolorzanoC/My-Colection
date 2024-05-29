

//importar lib
const express = require("express");

//crear objeto para llamar metodos de expreess:::::::::::::
const app = express();


//configuraciones para saber que se va a uarsa ejs
app.set("view engine", "ejs");

app.use(express.static("public")); //aca van todos los archivos HTML ESTATICOS

//dice que pagina se va a abrir
app.get("/", function(req,res){ //req es requerimiento, res es respuesta
    res.render("index"); //aca se pone lo que debe de renderizar
});

app.get("/registrarse", function(req,res){ //req es requerimiento, res es respuesta
    res.render("registrarse"); //aca se pone lo que debe de renderizar
});


//conf puerto para serrver local::::::::::::::::::::::::::::
app.listen(3000,function(){ //8000, 5000...
    console.log("El servido es http://localhost:3000");
}); 



//::::::::::::::::::::::::::::::::.
let mysql = require("mysql");



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

            let mensaje;
            if(row.length>0){ //si en la linea hay algo repetido avise
                mensaje = "Usuario Existente"
                console.log(mensaje);
            
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
