import express from 'express'; //Framework para crear el servidor y rutas HTTP
import { loadMongoConfig } from './config/mongoConfig.js'; //Importa una funcion para conectar el backend al MongoDB
import User from './model/User.js'; //Importa el modelo User (los datos).
import cors from 'cors'; //Importa CORS, que permite que Angular haga las peticioens al backend

/*
    app -> crea nuestro servidor.
    PORT -> indica el puerto por que va a recibir peticiones.
*/
const app = express();
const PORT = 3000;

//Funcion para arrancar el servidor.
app.listen(PORT, () =>{
    console.log("Escuchando por el puerto " + PORT)
})


loadMongoConfig();//Conexion a MongoDB

app.use(cors()); //Permite a Angular acceder al backend (Middleware)
app.use(express.json()); //Indicamos qu elas peticiones va a ser siempre en formato .json

// Esta funcion nos permite crear usuarios
app.post("/api/users",async (req,res) =>{
    //Controlamos si ocurren errores con un try-catch
    try{
        const userData = req.body; //Obtiene datos enviados por Angular
        const newUser = new User(userData); //Crea un objeto usando el modelo de User
        await newUser.save(); //Guarda los datos en MongoDB
        res.status(201).json({message:"Usuario creado"}); //Devuelebe un mensaje JSON.
    }catch(err){
        console.log(err);
        res.status(500).json({menssage:"Error al crear el usuario"})
    }
})

//Esta funcion permite que los usuarios se registren
app.post("/api/login", async(req, res) =>{
    
    try{
        //Obtiene usuario y contraseña de la peticion de Angular.
        const {username, password} = req.body;
        
        // Variable con datos de usuario y contraseña
        const user = await User.findOne({username,password});
        if(!user){
            return res.status(401).json({message:"Error autenficación"});
        }
        res.status(200).json({message:"Sesion iniciada", user})
    }catch(err){
        console.log(err);
        res.status(500).json(({message:"Error al iniciar sesion"}));
    }
})

