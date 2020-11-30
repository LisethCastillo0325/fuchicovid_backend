import { Router } from "express";
import ProfesionalSaludController from "../controllers/ProfesionalSaludController";


const router = Router();

// Rutas para tipo identificación
router.get('/', ProfesionalSaludController.getAll);
router.get('/:id', ProfesionalSaludController.getById);
router.post('/', ProfesionalSaludController.create);
router.put('/:id', ProfesionalSaludController.update);

export default router;