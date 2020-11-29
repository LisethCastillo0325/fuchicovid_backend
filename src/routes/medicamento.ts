import { Router } from "express";
import MedicamentoController from "../controllers/MedicamentoController";


const router = Router();

// Rutas para tipo identificación
router.get('/', MedicamentoController.getAll);
router.get('/:id', MedicamentoController.getById);
router.post('/', MedicamentoController.create);
router.put('/:id', MedicamentoController.update);

export default router;