import mongoose from "mongoose";

// Esto es el esquema de los datos  en MongoDB.
const userSchema = new mongoose.Schema({
  username: { type: String, required: true},
  password: { type: String, required: true },
  name: { type: String, required: true },
  rol: { type: String, enum: ['admin', 'jugador', 'arbitro'], default: 'jugador' },
});

/*
Esta linea genera una representación de lo que queremos guardar en la coleccion
Parametros:
    - Nombre del modelo con el que referenciamos en nuestro codigo js
    - Tipo de esquema
    - Coleccion a la que se hace referencia
*/
export default mongoose.model('User', userSchema, 'users');