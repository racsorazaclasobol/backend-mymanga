import express      from 'express';
import fileUpload   from 'express-fileupload'; 
import cors         from 'cors';

import UsuariosRouter   from '../routes/usuarios.js';
import MangasRouter     from '../routes/mangas.js';
import ChaptersRouter   from '../routes/chapters.js';
import UploadsRouter    from '../routes/upload.js';
import AuthRouter       from '../routes/auth.js'
import dbConnection     from '../database/config.js';

class Server {

    constructor(){
        this.app = express();
        this.port = process.env.PORT || 8081;

        this.conectarDB();

        this.rutasPath = {
            //Usuarios y Authentication
            authPath: '/api/auth',
            usuariosPath: '/api/usuarios',

            //Manga y Chapters
            chaptersPath: '/api/chapters',
            mangasPath: '/api/mangas',
            uploadPath: '/api/uploads',
        }

        this.middlewares();

        this.routes();
        
    }

    middlewares(){
        //Inicialización CORS
        this.app.use( cors() );

        //Lectura y parseo del body
        this.app.use( express.json() );

        //Directorío público
        this.app.use( express.static('public') );

        //Manejo en la carga de archivos
        this.app.use( fileUpload({ useTempFiles: true, tempFileDir: '/tmp/', createParentPath: true }) );
        
    }

    routes(){

        const { usuariosPath, authPath, mangasPath, chaptersPath, uploadPath } = this.rutasPath;

        //Usuarios y Authentication
        this.app.use( usuariosPath, UsuariosRouter );
        this.app.use( authPath,     AuthRouter );

        //Mangas y Chapters
        this.app.use( mangasPath,   MangasRouter );
        this.app.use( chaptersPath, ChaptersRouter );
        this.app.use( uploadPath,   UploadsRouter );

    }

    listen(){
        this.app.listen( this.port, () => {
            console.log(`Servidor conectado al puerto ${ this.port } correctamente.`)
        } );

    }

    async conectarDB(){
        
        await dbConnection();

    }

    

}

export default Server;