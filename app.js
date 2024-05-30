
const express = require("express");
//crear objeto para llamar metodos de expreess:::::::::::::
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));

//conf puerto para serrver local::::::::::::::::::::::::::::
app.listen(3000,function(){ //8000, 5000...
    console.log("El servido es http://localhost:3000");
}); 


const conexion = require("./public/js/conexion"); //clase conexion.js


//::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::


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





//::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::



//INGRESAR DATOS DESDE REGISTRARSE.EJS:::::::::::::::::::::::::::::::::::::::::::::::::
app.post("/ingresar",function(req,res){ //lectura post desde registrar form

  const datosUs = req.body; //trae los datos en paquete desde el formulario
  //aca se sepran los datos y se guardan en variables separadas para luego usarse en la insercion y consulta hacia la basde de datos
  let name = datosUs.username;
  let pass = datosUs.password;


  let buscar = "SELECT * FROM tb_usuario WHERE tb_usuario_nombre = '"+name+"' "; //hace un select al nombre de la tabla usuarios para que no se repita el usuario

  conexion.query(buscar,function(error,row){ //este es un query para hacer que no se repitan usuarios

      if(error){

          throw error; //si hay error tirelo

      }else{

          if(row.length>0){ //si en la linea hay algo repetido avise

              console.log("Usuario Existente");

          }else{ //en caso de que no existan usuarios repetidos, vamos a hacer el query de insercion a la base de datos

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


  //CONSULTAR DATOS DESDE INDEX..EJS:::::::::::::::::::::::::::::::::::::::::::::::::
  app.post("/consultar",function(req,row){
    const datosUs = req.body; //trae los datos en paquete desde el formulario
    //aca se sepran los datos y se guardan en variables separadas para luego usarse en la insercion y consulta hacia la basde de datos
    let name = datosUs.username;
    let pass = datosUs.password;

    //este buscar hace revicion a la base de datos con los datos que el usuario digita
    let buscar = " SELECT tb_usuario_nombre,tb_usuario_contrasenna FROM tb_usuario WHERE tb_usuario_nombre = '"+name+"' AND tb_usuario_contrasenna = '"+pass+"' ";

    conexion.query(buscar,function(error,row){ //este es un query para hacer que no se repitan usuarios

        if(error){
  
            throw error; //si hay error tirelo
  
        }else{
  
            if(row.length > 0){ //si en la linea hay algo repetido avise
  
                console.log("Usuario Existente");
  
            }else{ //en caso de que no existan usuarios repetidos, vamos a hacer el query de insercion a la base de datos
                console.log("Datos incorrectos");
            }
  
        }
     });

  })

