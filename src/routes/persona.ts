import { Router } from "express";
import PersonaController from "../controllers/PersonaController";


const router = Router();

// Rutas para tipo identificación
router.get('/', PersonaController.getAll);
router.get('/:id', PersonaController.getById);
router.post('/', PersonaController.create);
router.put('/:id', PersonaController.update);

export default router;