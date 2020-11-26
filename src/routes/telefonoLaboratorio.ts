import { Router } from "express";
import TelefonoLaboratorioController from "../controllers/TelefonoLaboratorioController";


const router = Router();

// Rutas para tipo identificación
router.get('/', TelefonoLaboratorioController.getAll);
router.get('/:id', TelefonoLaboratorioController.getById);
router.post('/', TelefonoLaboratorioController.create);
router.put('/:id', TelefonoLaboratorioController.update);

export default router;