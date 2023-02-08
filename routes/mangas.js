import { Router } from 'express';
import { check } from 'express-validator';
import { crearManga, eliminarManga, modificarManga, obtenerMangaId, obtenerMangas } from '../controllers/mangas.js';
import { isMangaValid } from '../helpers/validators/validar-db.js';
import validarCampos from '../middlewares/validar-campos.js';
import { validarJWT } from '../middlewares/validar-jwt.js';
import { isAdminRole } from '../middlewares/validar-roles.js';

const router = Router();

router.get( '/', obtenerMangas);
router.get( '/:id',[
    check( 'id', 'Manga inválido' ).isMongoId(),
    check( 'id' ).custom( isMangaValid ),

    validarCampos
], obtenerMangaId);

router.post( '/',[ 
    validarJWT, isAdminRole,
    check( 'autor', 'El autor es obligatorio' ).notEmpty(),
    check( 'nombre', 'El nombre es obligatorio' ).notEmpty(),

    validarCampos
], crearManga);
router.put( '/:id',[
    validarJWT, isAdminRole,
    check( 'id', 'Manga inválido' ).isMongoId(),
    check( 'id' ).custom( isMangaValid ),

    validarCampos
], modificarManga);
router.delete( '/:id',[
    validarJWT, isAdminRole,
    check( 'id', 'Manga inválido' ).isMongoId(),
    check( 'id' ).custom( isMangaValid ),

    validarCampos
], eliminarManga);

export default router;