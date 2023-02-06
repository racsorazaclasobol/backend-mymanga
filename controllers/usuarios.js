import { request, response } from "express";
import bcryptjs from 'bcryptjs'
import Usuario from "../models/usuario.js";


const obtenerUsuarios = async( req = request, res = response ) => {

    try {

        const usuarios = await Usuario.find( { estado: true } );

        if( !usuarios ) return res.status(400).json({ msg: 'No se han encontrado usuarios en la Base de Datos' });

        res.json({ usuarios });
        
    } catch (error) {
        console.log( error );
        res.status(500).json({ msg: 'Ha ocurrido un error, inténtelo más tarde.' });
    }

}

const obtenerUsuarioId = async( req = request, res = response ) => {

    try {
        
        const { id } = req.params;

        const usuario = await Usuario.findById( id );

        if( !usuario ) return res.status(400).json({ msg: 'No se han encontrado el usuario en la Base de Datos' });
    
        res.json( usuario );
        
    } catch (error) {
        console.log( error );
        res.status(500).json({ msg: 'Ha ocurrido un error, inténtelo más tarde.' });
    }


}

const crearUsuario = async( req = request, res = response ) => {

    try {
        
        const { nombre, correo, password, rol } = req.body;

        const usuario = new Usuario({ nombre, correo, password, rol });

         //* Encriptar Contraseña
        const salt = bcryptjs.genSaltSync(); 
        usuario.password = bcryptjs.hashSync( password, salt );
    
        await usuario.save();
    
        res.json({ usuario });

    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Ha ocurrido un error, inténtelo más tarde.' });
    }

}

const modificarUsuario = async( req = request, res = response ) => {

    try {

        const { id } = req.params;
        const { _id, estado, ...dataUsuario} = req.body;

        const usuarioUpdated = await Usuario.findByIdAndUpdate( id, dataUsuario, { new: true } );

        if( !usuarioUpdated ) return res.status(400).json({ msg: 'No se han encontrado el usuario en la Base de Datos' });

        res.json( usuarioUpdated )
        
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Ha ocurrido un error, inténtelo más tarde.' });
    }

}

const eliminarUsuario = async( req = request, res = response ) => {

    try {

        const { id } = req.params;
        const estado = false;

        const usuarioUpdated = await Usuario.findByIdAndUpdate( id, { estado }, { new: true } );

        if( !usuarioUpdated ) return res.status(400).json({ msg: 'No se han encontrado el usuario en la Base de Datos' });

        res.json( usuarioUpdated )
        
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Ha ocurrido un error, inténtelo más tarde.' });
    }

}

export {
    crearUsuario,
    eliminarUsuario,
    modificarUsuario,
    obtenerUsuarioId,
    obtenerUsuarios,
}