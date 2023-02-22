import { request, response } from "express";
import { v2 as cloudinary } from 'cloudinary'
import { v4 as uuidv4 } from 'uuid'

import { convertAndCompressImage } from '../helpers/tiny-config.js'
import Chapter from "../models/Chapter.js";
import Manga from "../models/Manga.js";
import { eliminarArchivo } from "../helpers/manage-files.js";

cloudinary.config( { 
    cloud_name: 'dmuswnvaf', 
    api_key: '485988593188787', 
    api_secret: '9mk0sDkGNfIu_aXKhFxvntL3T0w',
    secure: true
} );

const subirImagenesCloudinary = async ( req = request, res = response ) => {

    try { 

        console.log("Inicio subirImagenesCloudinary ")

        
        const { id }            = req.params;
        const paginasToUpload   = req.files.archivo;
        
        const chapter = await Chapter.findById( id ).populate( 'manga', 'nombre' );
        
        if ( !chapter ) return res.status(400).json({ msg: `No existe un chapter con la id: ${ id }` });
        
        const chapterFolder = chapter.capitulo;
        const mangaFolder   = chapter.manga.nombre.replaceAll( ' ', '' ).toLowerCase();
        
        let paginas = [];
        
        for ( const pagina of paginasToUpload ) {
            const paginaToSave = {};
            const { tempFilePath, name } = pagina;

            const newTempFilePath = await convertAndCompressImage( pagina );

            const { secure_url: url } = await cloudinary.uploader.upload( newTempFilePath, { public_id: `MyManga/${ mangaFolder }/capitulos/${ chapterFolder }/${ uuidv4() }` } );
            
            const fileExtension = name.slice( ( name.lastIndexOf('.') - 1 >>> 0 ) + 2 );
            const paginaSinExtencion = name.replace(`.${ fileExtension }`, '');
            
            paginaToSave.url = url;
            paginaToSave.tipo = name.charAt(0);
            paginaToSave.pagina = paginaSinExtencion.replace(paginaToSave.tipo, '');
            
            paginas.push( paginaToSave )

            eliminarArchivo( newTempFilePath );        
        }
        
        const chapterUpdated = await Chapter.findByIdAndUpdate( id, { paginas }, { new: true } );

        res.json({ msg: "El chapter fue subido exitosamente." });

        console.log("Fin subirImagenesCloudinary ")
        
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Ha ocurrido un error, inténtelo más tarde.' });
    }
        
}

const subirPortadaMangaCloudinary = async ( req = request, res = response ) => {

    try { 

        console.log("Inicio subirPortadaMangaCloudinary ")
        
        const { id }            = req.params;
        const portadaToUpload   = req.files.archivo;
        
        const manga = await Manga.findById( id );
        
        if ( !manga ) return res.status(400).json({ msg: `No existe un manga con la id: ${ id }` });
        
        const mangaFolder = manga.nombre.replaceAll( ' ', '' ).toLowerCase();

        if( manga.portada ){ //Borrar imagen previa de Cloudinary

            const nombreArr = manga.portada.split( '/' );
            const nombre = nombreArr[ nombreArr.length - 1 ];
            const [ name_id ] = nombre.split('.');

            const public_id = `MyManga/${ mangaFolder }/portada/${ name_id }`

            await cloudinary.uploader.destroy( public_id );

        }
                
        const { tempFilePath } = portadaToUpload;

        const newTempFilePath = await convertAndCompressImage( portadaToUpload );

        const { secure_url } = await cloudinary.uploader.upload( newTempFilePath, { public_id: `MyManga/${ mangaFolder }/portada/${ uuidv4() }` } );
        
        const mangaUpdated = await Manga.findByIdAndUpdate( id, { portada: secure_url }, { new: true } );

        eliminarArchivo( newTempFilePath );        

        res.json({ msg: "El chapter fue subido exitosamente." })

    console.log("Fin subirPortadaMangaCloudinary ")
        
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Ha ocurrido un error, inténtelo más tarde.' });
    }
        
}

export {
    subirImagenesCloudinary,
    subirPortadaMangaCloudinary
}