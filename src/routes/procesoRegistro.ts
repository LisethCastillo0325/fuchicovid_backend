import { Router } from "express";
import ProcesoRegistroController from "../controllers/ProcesoRegistroController";


const router = Router();

// Rutas para tipo identificación
router.get('/', ProcesoRegistroController.getAll);
router.get('/:id', ProcesoRegistroController.getById);
router.get('/persona/:id', ProcesoRegistroController.getByPersonaId);
router.post('/', ProcesoRegistroController.create);
router.put('/:id', ProcesoRegistroController.update);

export default router;