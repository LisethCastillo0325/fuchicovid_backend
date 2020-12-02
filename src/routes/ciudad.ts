import { Router } from "express";
import CiudadController from "../controllers/CiudadController";


const router = Router();

// Rutas para tipo identificación
router.get('/', CiudadController.getAll);
router.get('/:id', CiudadController.getById);
router.post('/', CiudadController.create);
router.put('/:id', CiudadController.update);

export default router;
