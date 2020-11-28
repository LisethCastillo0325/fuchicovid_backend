import { Router } from "express";
import PersonaDireccionController from "../controllers/DireccionPersonaController";


const router = Router();

// Rutas para tipo identificación
router.get('/', PersonaDireccionController.getAll);
router.get('/:id', PersonaDireccionController.getById);
router.post('/', PersonaDireccionController.create);
router.put('/:id', PersonaDireccionController.update);

export default router;