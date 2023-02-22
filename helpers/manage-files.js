import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const eliminarArchivo = ( filePath = '' ) => {
    
    console.log(" -- Inicio eliminación archivo ")
    
    if( filePath === '' ) return "filePath not valid."
    
    try {
        
        fs.unlinkSync( filePath );
        
    } catch (error) {
        console.log(error)
    }
    
    console.log(" -- Fin eliminación archivo ")
}

export { eliminarArchivo }
