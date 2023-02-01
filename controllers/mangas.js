import { request, response } from "express";
import Manga from "../models/Manga.js";


const obtenerMangas = async( req = request, res = response ) => {

    try {

        const mangas = await Manga.find( { estado: true } );

        if( !mangas ) return res.status(400).json({ msg: 'No se han encontrado mangas en la Base de Datos' });

        res.json( mangas );
        
    } catch (error) {
        console.log( error );
        res.status(500).json({ msg: 'Ha ocurrido un error, inténtelo más tarde.' });
    }

}

const obtenerMangaId = async( req = request, res = response ) => {

    try {
        
        const { id } = req.params;

        const manga = await Manga.findById( id );

        if( !manga ) return res.status(400).json({ msg: 'No se ha encontrado el manga en la Base de Datos' });
    
        res.json( manga );
        
    } catch (error) {
        console.log( error );
        res.status(500).json({ msg: 'Ha ocurrido un error, inténtelo más tarde.' });
    }


}

const crearManga = async( req = request, res = response ) => {

    try {
        
        const mangaData = req.body;
        
        const manga = new Manga( mangaData );

        await manga.save();

        console.log(manga)

        res.json( manga );

    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Ha ocurrido un error, inténtelo más tarde.' });
    }

}

const modificarManga = async( req = request, res = response ) => {

    try {

        const { id } = req.params;
        const { _id, estado, ...dataManga} = req.body;

        const mangaUpdated = await Manga.findByIdAndUpdate( id, dataManga, { new: true } );

        if( !mangaUpdated ) return res.status(400).json({ msg: 'No se ha encontrado el manga en la Base de Datos' });

        res.json( mangaUpdated )
        
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Ha ocurrido un error, inténtelo más tarde.' });
    }

}

const eliminarManga = async( req = request, res = response ) => {

    try {

        const { id } = req.params;
        const estado = false;

        const mangaUpdated = await Manga.findByIdAndUpdate( id, { estado }, { new: true } );

        if( !mangaUpdated ) return res.status(400).json({ msg: 'No se ha encontrado el manga en la Base de Datos' });

        res.json( mangaUpdated )
        
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Ha ocurrido un error, inténtelo más tarde.' });
    }

}

const activarManga = async( req = request, res = response ) => {

    try {

        const { id } = req.params;
        const estado = true;

        const mangaUpdated = await Manga.findByIdAndUpdate( id, { estado }, { new: true } );

        if( !mangaUpdated ) return res.status(400).json({ msg: 'No se ha encontrado el manga en la Base de Datos' });

        res.json( mangaUpdated )
        
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Ha ocurrido un error, inténtelo más tarde.' });
    }

}

export {
    crearManga,
    eliminarManga,
    modificarManga,
    obtenerMangaId,
    obtenerMangas,
    activarManga
}