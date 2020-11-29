import { Router } from "express";
import MedicamentoLaboratorioController from "../controllers/MedicamentoLaboratorioController";


const router = Router();

// Rutas para tipo identificación
router.get('/', MedicamentoLaboratorioController.getAll);
router.get('/lab/:id', MedicamentoLaboratorioController.getByLabId);
router.get('/med/:id', MedicamentoLaboratorioController.getByMedId);


export default router;