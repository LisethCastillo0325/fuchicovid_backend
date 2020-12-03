import { Router } from "express";
import PacienteController from "../controllers/PacienteController";


const router = Router();

// Rutas para tipo identificación
router.get('/', PacienteController.getAll);
router.post('/pagination-filters/', PacienteController.getAllPaginated);
router.get('/:id', PacienteController.getById);
router.post('/', PacienteController.create);
router.put('/:id', PacienteController.update);

export default router;