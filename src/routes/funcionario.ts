import { Router } from "express";
import FuncionarioController from "../controllers/FuncionarioController";


const router = Router();

// Rutas para tipo identificación
router.get('/', FuncionarioController.getAll);
router.get('/:id', FuncionarioController.getById);
router.post('/', FuncionarioController.create);
router.put('/:id', FuncionarioController.update);

export default router;