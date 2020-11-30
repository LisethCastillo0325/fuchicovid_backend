import { Router } from "express";
import PacienteController from "../controllers/PacienteController";


const router = Router();

// Rutas para tipo identificación
router.get('/', PacienteController.getAll);
router.get('/:id', PacienteController.getById);
router.post('/', PacienteController.create);
router.put('/:id', PacienteController.update);

export default router;