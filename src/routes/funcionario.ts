import { Router } from "express";
import FuncionarioController from "../controllers/FuncionarioController";


const router = Router();

// Rutas para tipo identificación
router.get('/', FuncionarioController.getAll);
router.get('/:id', FuncionarioController.getById);
router.post('/', FuncionarioController.create);
router.put('/:id', FuncionarioController.update);
//router.put('/activar-inactivar/:id', FuncionarioController.inactivateAndActivate);
router.post('/pagination-filters/', FuncionarioController.getAllPaginated);
export default router;