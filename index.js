import express from 'express';
import { loadMongoConfig } from './config/mongoConfig.js';
import User from './model/User.js';
const app = express();
const PORT = 3000;

app.listen(PORT, () =>{
    console.log("Escuchando por el puerto " + PORT)
})

loadMongoConfig();


app.use(express.json()); //Indicamos qu elas peticiones va a ser siempre en formato .json

app.post("/api/users",async (req,res) =>{
    try{
        const userData = req.body;
        const newUser = new User(userData);
        await newUser.save();
        res.status(201).json({message:"Usuario creado"});
    }catch(err){
        console.log(err);
        res.status(500).json({menssage:"Error al crear el usuario"})
    }
})

app.post("/api/login", async(req, res) =>{
    try{
        const {username, password} = req.body;

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

