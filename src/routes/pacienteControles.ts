import { Router } from "express";
import PacienteControlesController from "../controllers/PacienteControlesController";


const router = Router();

// Rutas para tipo identificación
router.get('/', PacienteControlesController.getAll);
router.get('/:id', PacienteControlesController.getById);
router.get('/persona/:id', PacienteControlesController.getByPersonaId);
router.post('/', PacienteControlesController.create);
router.put('/:id', PacienteControlesController.update);

export default router;