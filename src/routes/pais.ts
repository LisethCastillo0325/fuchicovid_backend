import { Router } from "express";
import PaisController from "../controllers/PaisController";


const router = Router();

// Rutas para tipo identificación
router.get('/', PaisController.getAll);
router.get('/:id', PaisController.getById);
router.post('/', PaisController.create);
router.put('/:id', PaisController.update);

export default router;