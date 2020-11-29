import { Router } from "express";
import TipoContacto from "../controllers/TipoContacto";


const router = Router();

// Rutas para tipo identificación
router.get('/', TipoContacto.getAll);
router.get('/:id', TipoContacto.getById);
router.post('/', TipoContacto.create);
router.put('/:id', TipoContacto.update);

export default router;