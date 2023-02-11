import bcryptjs from 'bcryptjs'
import { request, response } from "express";
import { generarJWT } from '../helpers/manager-jwt.js'

import Usuario from "../models/usuario.js";

const authLogin = async( req = request, res = response ) => {

    try {

        const { correo, password } = req.body;
        
        const usuario = await Usuario.findOne({ correo });

        if( !usuario ) return res.status(400).json({ msg: 'Usuario no existe.' })
        
        const validPassword = bcryptjs.compareSync( password, usuario.password );
        
        if( !validPassword ) return res.status(400).json({ msg: 'Usuario y/o password son incorrectos.' })
        
        const token = await generarJWT( usuario._id );

        res.json({
            usuario,
            token
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).json({ msg: 'Error, intentelo más tarde' });
    }
}

const revalidarToken = async( req = request, res = response ) => {

    const { usuario } = req;
    const { _id } = usuario;

    const token = await generarJWT( _id );

    res.json({ usuario, token })

}


export {
    authLogin,
    revalidarToken
}