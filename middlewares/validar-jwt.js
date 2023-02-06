import { request, response } from 'express';
import jwt from 'jsonwebtoken';

const validarJWT = ( req = request, res = response, next ) => {

    const token = req.header('x-token');

    if ( !token ) return res.status(401).json({ msg: 'Token no válido.' });

    try {

        const { uid, nombre } = jwt.verify(
            token,
            process.env.SECRETPRIVATEKEY,
        );

        req.uid = uid;
        req.nombre = nombre;
        
    } catch (error) {
        console.log(error)
        return res.status(401).json({
            ok: false,
            msg: 'Token no válido.'
        })            
    }

    next();

}

export {
    validarJWT,
}