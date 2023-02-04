import { Router } from 'express';
import { authLogin } from '../controllers/auth.js';

const router = Router();

//TODO: Validaciones
router.get( '/login', authLogin);






export default router;