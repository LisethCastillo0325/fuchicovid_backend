import { Router } from "express";
import TipoTelefonoController from "../controllers/TipoTelefonoController";


const router = Router();

// Rutas para tipo identificación
router.get('/', TipoTelefonoController.getAll);
router.get('/:id', TipoTelefonoController.getById);
router.post('/', TipoTelefonoController.create);
router.put('/:id', TipoTelefonoController.update);

export default router;