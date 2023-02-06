import { Router } from 'express';
import { authLogin, revalidarToken } from '../controllers/auth.js';
import { validarJWT } from '../middlewares/validar-jwt.js'


const router = Router();

//TODO: Validaciones
router.post( '/login', authLogin);

router.get( '/renew', validarJWT, revalidarToken );



export default router;