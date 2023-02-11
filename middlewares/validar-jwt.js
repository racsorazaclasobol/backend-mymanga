import { request, response } from 'express';
import jwt from 'jsonwebtoken';
import Usuario from '../models/usuario.js';

const validarJWT = async( req = request, res = response, next ) => {

    const token = req.header('x-token');

    if ( !token ) return res.status(401).json({ msg: 'Token no existe.' });

    try {

        const { uid } = jwt.verify( token, process.env.SECRETPRIVATEKEY );

        if( !uid ) return res.status(401).json({ msg: 'Token no existe.' }); 

        const usuario = await Usuario.findById( uid );

        if( !usuario ) return res.status(401).json({ msg: 'Token no válido - Usuario no existe.' });
        if( !usuario.estado ) return res.status(401).json({ msg: 'Token no válido - Usuario deshabilitado.' });

        req.usuario = usuario;
        
        next();
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({ msg: 'Token no válido.' })            
    }
}

export {
    validarJWT,
}