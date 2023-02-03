import { request, response } from "express";
import Chapter from "../models/Chapter.js";


const obtenerChapters = async( req, res = response ) => {

    try {

        const chapters = await Chapter.find( { estado: true } ).populate( 'manga', 'nombre' );

        if( !chapters ) return res.status(400).json({ msg: 'No se han encontrado capítulos en la Base de Datos' });

        res.json( chapters );
        
    } catch (error) {
        console.log( error );
        res.status(500).json({ msg: 'Ha ocurrido un error, inténtelo más tarde.' });
    }

}

const obtenerChaptersManga = async( req = request, res = response ) => {

    try {

        const { manga } = req.params;

        const chapters = await Chapter.find( { manga } );

        if( !chapters ) return res.status(400).json({ msg: 'No se han encontrado capítulos en la Base de Datos' });

        res.json( chapters );
        
    } catch (error) {
        console.log( error );
        res.status(500).json({ msg: 'Ha ocurrido un error, inténtelo más tarde.' });
    }

}

const obtenerLastChaptersManga = async( req = request, res = response ) => {

    try {

        const { manga } = req.params;

        const chapters = await Chapter.find({ manga }).sort({ capitulo: 1 }).populate( 'manga', 'nombre' );
        
        if( !chapters ) return res.status(400).json({ msg: 'No se han encontrado capítulos en la Base de Datos' });
        
        const lastChapter = chapters[ chapters.length -1 ];
        
        res.json( lastChapter );
        
    } catch (error) {
        console.log( error );
        res.status(500).json({ msg: 'Ha ocurrido un error, inténtelo más tarde.' });
    }

}

const obtenerListaCapitulos = async( req = request, res = response ) => {

    try {

        const { manga } = req.params;

        const chapters = await Chapter.find({ manga }).select('capitulo').select('titulo').sort({ capitulo: -1 });
        
        if( !chapters ) return res.status(400).json({ msg: 'No se han encontrado capítulos en la Base de Datos' });
        
        res.json( chapters );
        
    } catch (error) {
        console.log( error );
        res.status(500).json({ msg: 'Ha ocurrido un error, inténtelo más tarde.' });
    }

}

const obtenerChapterId = async( req = request, res = response ) => {

    try {
        
        const { id } = req.params;

        const chapter = await Chapter.findById( id ).populate( 'manga', 'nombre' );

        if( !chapter ) return res.status(400).json({ msg: 'No se ha encontrado el capítulo en la Base de Datos' });
    
        res.json( chapter );
        
    } catch (error) {
        console.log( error );
        res.status(500).json({ msg: 'Ha ocurrido un error, inténtelo más tarde.' });
    }


}

const crearChapter = async( req = request, res = response ) => {

    try {
        
        const chapterData = req.body;
        
        const chapter = new Chapter( chapterData );

        await chapter.save();

        res.json( chapter );

    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Ha ocurrido un error, inténtelo más tarde.' });
    }

}

const modificarChapter = async( req = request, res = response ) => {

    try {

        const { id } = req.params;
        const { _id, estado, ...dataChapter} = req.body;

        const chapterUpdated = await Chapter.findByIdAndUpdate( id, dataChapter, { new: true } );

        if( !chapterUpdated ) return res.status(400).json({ msg: 'No se ha encontrado el capítulo en la Base de Datos' });

        res.json( chapterUpdated )
        
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Ha ocurrido un error, inténtelo más tarde.' });
    }

}

const eliminarChapter = async( req = request, res = response ) => {

    try {

        const { id } = req.params;
        const estado = false;

        const chapterUpdated = await Chapter.findByIdAndUpdate( id, { estado }, { new: true } );

        if( !chapterUpdated ) return res.status(400).json({ msg: 'No se ha encontrado el capítulo en la Base de Datos' });

        res.json( chapterUpdated )
        
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Ha ocurrido un error, inténtelo más tarde.' });
    }

}

const activarChapter = async( req = request, res = response ) => {

    try {

        const { id } = req.params;
        const estado = true;

        const chapterUpdated = await Chapter.findByIdAndUpdate( id, { estado }, { new: true } );

        if( !chapterUpdated ) return res.status(400).json({ msg: 'No se ha encontrado el capítulo en la Base de Datos' });

        res.json( chapterUpdated )
        
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Ha ocurrido un error, inténtelo más tarde.' });
    }

}

export {
    activarChapter,
    crearChapter,
    eliminarChapter,
    modificarChapter,
    obtenerChapterId,
    obtenerChapters,
    obtenerChaptersManga,
    obtenerLastChaptersManga,
    obtenerListaCapitulos,
}