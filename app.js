
const express = require("express");
const session = require('express-session');
//crear objeto para llamar metodos de expreess:::::::::::::
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));



app.use(session({
    secret: 'estaseralaclavesecretaparaelexpress', // Debes cambiar esto por una clave secreta segura y única para tu aplicación
    resave: false,
    saveUninitialized: true
}));

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
app.get("/principal", function(req,res){ //req es requerimiento, res es respuesta
    res.render("principal"); //aca se pone lo que debe de renderizar
});
app.get("/agregar", function(req,res){ //req es requerimiento, res es respuesta
    res.render("agregar"); //aca se pone lo que debe de renderizar
});
app.get("/perfil", function(req,res){ //req es requerimiento, res es respuesta
    res.render("perfil"); //aca se pone lo que debe de renderizar
});









//::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::



//INGRESAR USUARIO DESDE REGISTRARSE.EJS:::::::::::::::::::::::::::::::::::::::::::::::::
app.post("/ingresar",function(req,res){ //lectura post desde registrar form

  const datosUs = req.body; //trae los datos en paquete desde el formulario
  //aca se sepran los datos y se guardan en variables separadas para luego usarse en la insercion y consulta hacia la basde de datos
  let name = datosUs.username;
  let pass = datosUs.password;


  let buscar = "SELECT * FROM tb_usuarios WHERE tb_usuarios_nombre = '"+name+"' "; //hace un select al nombre de la tabla usuarios para que no se repita el usuario

  

  conexion.query(buscar,function(error,row){ //este es un query para hacer que no se repitan usuarios

      if(error){

          throw error; //si hay error tirelo

      }else{

          if(row.length>0){ //si en la linea hay algo repetido avise

              console.log("Usuario Existente");

          }else{ //en caso de que no existan usuarios repetidos, vamos a hacer el query de insercion a la base de datos

              let registrar = "INSERT INTO tb_usuarios(tb_usuarios_nombre, tb_usuarios_contrasenna) VALUES ('"+name+"','"+pass+"')"; //linea de codigo para registrar en caso de toodo nice
              
              conexion.query(registrar,function(error){ //haga registrar y una funcion en caso de que lago salga mal
                  if(error){
                      throw error;
                  }else{
                      console.log("Datos almacenados en la bd"); //si todo sale good almacene

                      res.render('index', { username: name });
                  }
              });
          }

      }
   });

  });


  //CONSULTAR DATOS DESDE INDEX..EJS PARA INICIAR SESION:::::::::::::::::::::::::::::::::::::::::::::::::
  app.post("/consultar", function(req, res) {
    const datosUs = req.body; // trae los datos en paquete desde el formulario
    let name = datosUs.username;
    let pass = datosUs.password;

    // Consulta para verificar la existencia del usuario con las credenciales proporcionadas
    let buscar = "SELECT idtb_usuarios, tb_usuarios_nombre, tb_usuarios_contrasenna FROM tb_usuarios WHERE tb_usuarios_nombre = ? AND tb_usuarios_contrasenna = ?";

    conexion.query(buscar, [name, pass], function(error, results) { // Usamos parámetros para evitar inyección SQL
        if (error) {
            throw error; // Si hay error, lo lanza
        } else {
            if (results.length > 0) {
                console.log("Usuario Existente");
                req.session.userId = results[0].idtb_usuarios; // Guarda el ID del usuario en la sesión
                res.render('principal', { username: name }); // Renderiza la página principal con el nombre de usuario
            } else {
                console.log("Datos incorrectos");
                res.render('index', { username: name }); // Renderiza la página de inicio con el nombre de usuario
            }
        }
    });
});


//INGRESAR AUTOS A LA COLECCION DESDE AGREGAR.EJS:::::::::::::::::::::::::::::::::::::::::::::::::
app.post("/nuevoAuto", function(req, res) {
    const datosUs = req.body;
    let nameAuto = datosUs.nameAuto;
    let set = datosUs.set;
    let edicion = datosUs.edicion;
    let imagen = datosUs.imagen;
    let opciones = datosUs.opciones;

    // Asegúrate de que `req.session.userId` esté presente
    if (!req.session.userId) {
        return res.redirect('/login'); // Redirige al login si el usuario no está autenticado
    }

    let registrar = "INSERT INTO tb_autos (tb_autos_nombre, tb_autos_set, tb_autos_edicion, tb_autos_imagen, tb_usuarios_idtb_usuarios) VALUES (?, ?, ?, ?, ?)";
    
    // Aquí estamos utilizando los parámetros de consulta para evitar inyecciones SQL y asegurar la correspondencia
    conexion.query(registrar, [nameAuto, set, edicion, imagen, req.session.userId], function(error) {
        if (error) {
            throw error;
        } else {
            console.log("Datos almacenados en la bd");
            res.render('principal', { username: nameAuto });
        }
    });
});
  
