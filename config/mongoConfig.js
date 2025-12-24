import mongoose from "mongoose";

/**
Usamos "export" para poder exportar la funcion a otras zonas de nuestro proyecto.
Esta funcion sirve para cargar la configuracion de MongoDB
*/
export function loadMongoConfig(){
    //Esta Url nos permite conectarnos a la BD
    const mongoURI = "mongodb+srv://iciarcabezuelo:Admin1234@clusterproyectoligadepo.3fahpbg.mongodb.net/LigaDeportiva?appName=ClusterProyectoLigaDeportiva"
    //Conectamos a la BBDD
    mongoose.connect(mongoURI)
    // Aparecerá un mensaje en consola para saber si se ha conectado bien o no.
    .then(() => console.log("¡¡¡Conectado a MongoDB!!!"))
    .catch(err => console.log("Error al conectarse a MongoDB :(", err));
}