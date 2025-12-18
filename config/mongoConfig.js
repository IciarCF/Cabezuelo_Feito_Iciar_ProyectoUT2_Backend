import mongoose from "mongoose";

/*
Usamos "export" para poder exportar la funcion a otras zonas de nuestro proyecto.
Esta funcion sirve para cargar la configuracion de MongoDB
*/
export function loadMongoConfig(){
    const mongoURI = "mongodb+srv://iciarcabezuelo:Admin1234@clusterproyectoligadepo.3fahpbg.mongodb.net/LigaDeportiva?appName=ClusterProyectoLigaDeportiva"
    mongoose.connect(mongoURI)
  .then(() => console.log("¡¡¡Conectado a MongoDB!!!"))
  .catch(err => console.log("Error al conectarse a MongoDB :(", err));
}