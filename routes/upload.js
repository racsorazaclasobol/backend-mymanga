import { Router } from 'express';
import { check } from 'express-validator';
import { subirImagenesCloudinary, subirPortadaMangaCloudinary } from '../controllers/upload.js';

const router = Router();

//TODO: Realizar validaciones
router.put( '/:id', subirImagenesCloudinary );
router.put( '/portada-manga/:id', subirPortadaMangaCloudinary );

export default router;