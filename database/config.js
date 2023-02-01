import mongoose from 'mongoose';

const dbConnection = async() => {

    try {

        await mongoose.connect( process.env.MONGODB_CNN );

        console.log('La Base de Datos se ha conectado correctamente.')
        
    } catch (error) {
        console.log(error);
        throw new Error( 'Ocurrió un error al conectarse a la Base de Datos.' )
    }

}

export default dbConnection;