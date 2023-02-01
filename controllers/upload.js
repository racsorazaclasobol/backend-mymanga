import { request, response } from "express";
import { v2 as cloudinary } from 'cloudinary'
import { v4 as uuidv4 } from 'uuid'

import Chapter from "../models/Chapter.js";
import Manga from "../models/Manga.js";

cloudinary.config( { 
    cloud_name: 'dmuswnvaf', 
    api_key: '485988593188787', 
    api_secret: '9mk0sDkGNfIu_aXKhFxvntL3T0w',
    secure: true
} );

const subirImagenesCloudinary = async ( req = request, res = response ) => {

    try { 
        
        const { id }            = req.params;
        const paginasToUpload   = req.files.archivo;
        
        const chapter = await Chapter.findById( id ).populate( 'manga', 'nombre' );

        console.log( chapter );
        
        if ( !chapter ) return res.status(400).json({ msg: `No existe un chapter con la id: ${ id }` });
        
        const chapterFolder = chapter.capitulo;
        const mangaFolder   = chapter.manga.nombre.replaceAll( ' ', '' ).toLowerCase();
        
        let paginas = [];
        
        for ( const pagina of paginasToUpload ) {
            const paginaToSave = {};
            const { tempFilePath, name } = pagina;
            const { secure_url: url } = await cloudinary.uploader.upload( tempFilePath, { public_id: `MyManga/${ mangaFolder }/capitulos/${ chapterFolder }/${ uuidv4() }` } );
            
            const paginaSinExtencion = name.replace('.webp', '');
            
            paginaToSave.url = url;
            paginaToSave.tipo = name.charAt(0);
            paginaToSave.pagina = paginaSinExtencion.replace(paginaToSave.tipo, '');
            
            paginas.push( paginaToSave )
        }
        
        const chapterUpdated = await Chapter.findByIdAndUpdate( id, { paginas }, { new: true } );

        res.json({ msg: "El chapter fue subido exitosamente." })

        
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Ha ocurrido un error, inténtelo más tarde.' });
    }
        
}

const subirPortadaMangaCloudinary = async ( req = request, res = response ) => {

    try { 
        
        const { id }            = req.params;
        const portadaToUpload   = req.files.archivo;
        
        const manga = await Manga.findById( id );
        
        if ( !manga ) return res.status(400).json({ msg: `No existe un manga con la id: ${ id }` });
        
        const mangaFolder = manga.nombre.replaceAll( ' ', '' ).toLowerCase();
                
        const { tempFilePath } = portadaToUpload;
        const { secure_url } = await cloudinary.uploader.upload( tempFilePath, { public_id: `MyManga/${ mangaFolder }/portada/${ uuidv4() }` } );
        
        const mangaUpdated = await Manga.findByIdAndUpdate( id, { portada: secure_url }, { new: true } );

        console.log( mangaUpdated )
        res.json({ msg: "El chapter fue subido exitosamente." })

        
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Ha ocurrido un error, inténtelo más tarde.' });
    }
        
}

export {
    subirImagenesCloudinary,
    subirPortadaMangaCloudinary
}