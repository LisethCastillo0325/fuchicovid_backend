import { Router } from "express";
import CorreoIntegranteController from "../controllers/CorreoIntegranteController";


const router = Router();

// Rutas para tipo identificación
router.get('/', CorreoIntegranteController.getAll);
router.get('/:id', CorreoIntegranteController.getById);
router.get('/persona/:id', CorreoIntegranteController.getByPersonaId);
router.post('/', CorreoIntegranteController.create);
router.put('/:id', CorreoIntegranteController.update);

export default router;