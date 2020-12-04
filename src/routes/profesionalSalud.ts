import { Router } from "express";
import ProfesionalSaludController from "../controllers/ProfesionalSaludController";


const router = Router();

// Rutas para tipo identificación
router.get('/', ProfesionalSaludController.getAll);
router.get('/:id', ProfesionalSaludController.getById);
router.post('/', ProfesionalSaludController.create);
router.put('/:id', ProfesionalSaludController.update);
router.put('/activar-inactivar/:id', ProfesionalSaludController.inactivateAndActivate);
router.post('/pagination-filters/', ProfesionalSaludController.getAllPaginated);

export default router;