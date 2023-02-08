import { Router } from 'express';
import { check } from 'express-validator';
import { crearChapter, eliminarChapter, modificarChapter, obtenerChapterId, obtenerChapters, obtenerChaptersManga, obtenerLastChaptersManga, obtenerListaCapitulos, obtenerTitleLastChaptersManga } from '../controllers/chapters.js';
import { isChapterValid, isMangaValid } from '../helpers/validators/validar-db.js';
import validarCampos from '../middlewares/validar-campos.js';
import { validarJWT } from '../middlewares/validar-jwt.js';
import { isAdminRole } from '../middlewares/validar-roles.js';

const router = Router();

//TODO: Validaciones
router.get( '/', obtenerChapters);
router.get( '/:manga', obtenerChaptersManga);
router.get( '/last/:manga', obtenerLastChaptersManga);
router.get( '/titleLast/:manga', obtenerTitleLastChaptersManga);
router.get( '/list/:manga', obtenerListaCapitulos);
router.get( '/byid/:id', obtenerChapterId);

router.post( '/', [
    validarJWT, isAdminRole,
    check( 'manga', 'El manga no es válido' ).isMongoId(),
    check( 'manga' ).custom( isMangaValid ),
    check( 'titulo', 'El título es obligatorio' ).notEmpty(),
    check( 'capitulo', 'El capítulo es obligatorio' ).notEmpty(),
    check( 'capitulo', 'El capítulo debe ser numerico' ).isNumeric(),

    validarCampos
], crearChapter);

router.put( '/:id',[ 
    validarJWT, isAdminRole, 
    check( 'id', 'El chapter no es válido' ).isMongoId(),
    check( 'id' ).custom( isChapterValid ),
    
    validarCampos 
], modificarChapter);

router.delete( '/:id', [
    validarJWT, isAdminRole,
    check( 'id', 'El chapter no es válido' ).isMongoId(),
    check( 'id' ).custom( isChapterValid ),

    validarCampos
], eliminarChapter);

export default router;