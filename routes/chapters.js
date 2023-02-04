import { Router } from 'express';
import { check } from 'express-validator';
import { crearChapter, eliminarChapter, modificarChapter, obtenerChapterId, obtenerChapters, obtenerChaptersManga, obtenerLastChaptersManga, obtenerListaCapitulos, obtenerTitleLastChaptersManga } from '../controllers/chapters.js';

const router = Router();

//TODO: Validaciones
router.get( '/', obtenerChapters);
router.get( '/:manga', obtenerChaptersManga);
router.get( '/last/:manga', obtenerLastChaptersManga);
router.get( '/titleLast/:manga', obtenerTitleLastChaptersManga);
router.get( '/list/:manga', obtenerListaCapitulos);
router.get( '/byid/:id', obtenerChapterId);
router.post( '/', crearChapter);
router.put( '/:id', modificarChapter);
router.delete( '/:id', eliminarChapter);

export default router;