import tinify from 'tinify';
import dot from 'dotenv'
import { fileURLToPath } from "url";
import { v4 as uuidv4 } from 'uuid'
import path, { resolve } from 'path'
const __dirname = path.dirname(fileURLToPath(import.meta.url));



dot.config();

tinify.key = process.env.TINIFY_KEY;

const convertAndCompressImage = async( file ) => {
    
    try {
        console.log(" -- Inicio convertAndCompressImage ")
        
        const { tempFilePath } = file;
        
        const source    = tinify.fromFile( tempFilePath );
        const converted = source.convert({ type: "image/webp" });
        const extension = await converted.result().extension();
        
        const nombreTemp = `${ uuidv4() }.${ extension }`;
        
        const newTempFilePath = path.join( __dirname, '../uploads/images/', nombreTemp );
        
        await converted.toFile( newTempFilePath );
        
        console.log(" -- Fin convertAndCompressImage ")
        
        return newTempFilePath;
        
    } catch (error) {
        console.log(error)     
    }
}


export {
    tinify,

    convertAndCompressImage,
};