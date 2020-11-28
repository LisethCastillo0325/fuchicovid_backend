import { Router } from "express";
import TelefonoPersonaController from "../controllers/TelefonoPersonaController";


const router = Router();

// Rutas para tipo identificación
router.get('/', TelefonoPersonaController.getAll);
router.get('/:id', TelefonoPersonaController.getById);
router.post('/', TelefonoPersonaController.create);
router.put('/:id', TelefonoPersonaController.update);

export default router;