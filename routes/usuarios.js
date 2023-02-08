import { Router } from 'express';
import { check } from 'express-validator';
import { crearUsuario, eliminarUsuario, modificarUsuario, obtenerUsuarioId, obtenerUsuarios } from '../controllers/usuarios.js';
import { IsRoleValid, IsUsuarioValid } from '../helpers/validators/validar-db.js';
import validarCampos from '../middlewares/validar-campos.js';
import { validarJWT } from '../middlewares/validar-jwt.js';
import { isAdminRole } from '../middlewares/validar-roles.js';

const router = Router();

router.get( '/', obtenerUsuarios);

router.get( '/:id',[
    check( 'id', 'Usuario inválido' ).isMongoId(),
    check( 'id' ).custom( IsUsuarioValid ),

    validarCampos
], obtenerUsuarioId);

router.post( '/',[
    validarJWT, isAdminRole,
    check( 'nombre', 'El nombre es obligatorio' ).notEmpty(),
    check( 'correo', 'El correo es obligatorio' ).notEmpty(),
    check( 'correo', 'El correo es inválido' ).isEmail(),
    check( 'password', 'El password debe de tener al menos 6 carácteres' ).isLength({ min: 6 }),
    check( 'rol', 'El rol es obligatorio' ).notEmpty(),
    check( 'rol' ).custom( IsRoleValid ),

    validarCampos
], crearUsuario);

router.put( '/:id',[
    validarJWT, isAdminRole,
    check( 'id', 'Usuario inválido' ).isMongoId(),
    check( 'id' ).custom( IsUsuarioValid ),

    validarCampos
], modificarUsuario);

router.delete( '/:id',[
    validarJWT, isAdminRole,
    check( 'id', 'Usuario inválido' ).isMongoId(),
    check( 'id' ).custom( IsUsuarioValid ),

    validarCampos
], eliminarUsuario);

export default router;