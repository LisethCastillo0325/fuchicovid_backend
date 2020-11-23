import { Router } from "express";
import EPSController from "../controllers/EPSController";


const router = Router();

// Rutas para tipo identificación
router.get('/', EPSController.getAll);
router.get('/:id', EPSController.getById);
router.post('/', EPSController.create);
router.put('/:id', EPSController.update);

export default router;