import { Router } from "express";
import IntegranteHogarController from "../controllers/IntegranteHogarController";


const router = Router();

// Rutas para tipo identificación
router.get('/', IntegranteHogarController.getAll);
router.get('/:id', IntegranteHogarController.getById);
router.post('/', IntegranteHogarController.create);
router.put('/:id', IntegranteHogarController.update);

export default router;