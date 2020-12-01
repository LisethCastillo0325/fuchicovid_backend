import { Router } from "express";
import RegistroDosisController from "../controllers/RegistroDosisController";


const router = Router();

// Rutas para tipo identificación
router.get('/', RegistroDosisController.getAll);
router.get('/:id', RegistroDosisController.getById);
router.post('/', RegistroDosisController.create);
router.put('/:id', RegistroDosisController.update);

export default router;