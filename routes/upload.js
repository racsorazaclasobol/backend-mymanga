import { Router } from 'express';
import { check } from 'express-validator';
import { subirImagenesCloudinary, subirPortadaMangaCloudinary } from '../controllers/upload.js';
import { isChapterValid, isMangaValid } from '../helpers/validators/validar-db.js';
import validarCampos from '../middlewares/validar-campos.js';
import { validarJWT } from '../middlewares/validar-jwt.js';
import { isAdminRole } from '../middlewares/validar-roles.js';

const router = Router();

router.put( '/:id',[
    validarJWT, isAdminRole,
    check( 'id', 'El ID no es válido' ).isMongoId(),
    check( 'id' ).custom( isChapterValid ),

    validarCampos
], subirImagenesCloudinary );

router.put( '/portada-manga/:id',[
    validarJWT, isAdminRole,
    check( 'id', 'El ID no es válido' ).isMongoId(),
    check( 'id' ).custom( isMangaValid ),

    validarCampos
], subirPortadaMangaCloudinary );

export default router;