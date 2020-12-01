import { Router } from "express";
import ItemPacienteControlesMedicamentosController from "../controllers/ItemPacienteControlesMedicamentosController";


const router = Router();

// Rutas para tipo identificación
router.get('/', ItemPacienteControlesMedicamentosController.getAll);
router.get('/:id', ItemPacienteControlesMedicamentosController.getById);
router.get('/control/:id', ItemPacienteControlesMedicamentosController.getByControlId);
router.post('/', ItemPacienteControlesMedicamentosController.create);
router.put('/:id', ItemPacienteControlesMedicamentosController.update);

export default router;