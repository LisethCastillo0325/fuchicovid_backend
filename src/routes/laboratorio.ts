import { Router } from "express";
import LaboratorioController from "../controllers/LaboratorioController";


const router = Router();

// Rutas para tipo identificación
router.get('/', LaboratorioController.getAll);
router.get('/:id', LaboratorioController.getById);
router.post('/', LaboratorioController.create);
router.put('/:id', LaboratorioController.update);

export default router;