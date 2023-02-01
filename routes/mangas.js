import { Router } from 'express';
import { check } from 'express-validator';
import { crearManga, eliminarManga, modificarManga, obtenerMangaId, obtenerMangas } from '../controllers/mangas.js';

const router = Router();

//TODO: Validaciones
router.get( '/', obtenerMangas);
router.get( '/:id', obtenerMangaId);
router.post( '/', crearManga);
router.put( '/:id', modificarManga);
router.delete( '/:id', eliminarManga);

export default router;