import { Router } from 'express';
import { check } from 'express-validator';
import { authLogin, revalidarToken } from '../controllers/auth.js';
import validarCampos from '../middlewares/validar-campos.js';
import { validarJWT } from '../middlewares/validar-jwt.js'


const router = Router();

router.post( '/login',[
    check( 'correo', 'El correo es obligatorio' ).isEmail(),
    check( 'password', 'La contraseña debe ser de al menos 6 caracteres' ).isLength({ min: 6 }),
    
    validarCampos
], authLogin);

router.get( '/renew', validarJWT, revalidarToken );



export default router;