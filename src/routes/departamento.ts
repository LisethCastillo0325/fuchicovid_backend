import { Router } from "express";
import DepartamentoController from "../controllers/DepartamentoController";


const router = Router();

// Rutas para tipo identificación
router.get('/', DepartamentoController.getAll);
router.get('/:id', DepartamentoController.getById);
router.post('/', DepartamentoController.create);
router.put('/:id', DepartamentoController.update);

export default router;