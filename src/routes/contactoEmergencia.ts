import { Router } from "express";
import ContactoEmergenciaController from "../controllers/ContactoEmergenciaController";


const router = Router();

// Rutas para tipo identificación
router.get('/', ContactoEmergenciaController.getAll);
router.get('/:id', ContactoEmergenciaController.getById);
router.post('/', ContactoEmergenciaController.create);
router.put('/:id', ContactoEmergenciaController.update);

export default router;