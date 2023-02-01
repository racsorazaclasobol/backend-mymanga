import { Router } from 'express';
import { check } from 'express-validator';
import { crearUsuario, eliminarUsuario, modificarUsuario, obtenerUsuarioId, obtenerUsuarios } from '../controllers/usuarios.js';

const router = Router();

router.get( '/', obtenerUsuarios);
router.get( '/:id', obtenerUsuarioId);
router.post( '/', crearUsuario);
router.put( '/:id', modificarUsuario);
router.delete( '/:id', eliminarUsuario);

export default router;