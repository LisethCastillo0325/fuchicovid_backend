import { Router } from "express";
import UniversidadController from "../controllers/UniversidadController";


const router = Router();

// Rutas para tipo identificación
router.get('/', UniversidadController.getAll);
router.get('/:id', UniversidadController.getById);
router.post('/', UniversidadController.create);
router.put('/:id', UniversidadController.update);

export default router;