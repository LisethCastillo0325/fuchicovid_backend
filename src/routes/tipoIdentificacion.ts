import { Router } from "express";

import TipoIdentificacionController from "../controllers/TipoDocumentoController";

const router = Router();

// Rutas para tipo identificación
router.get('/', TipoIdentificacionController.getAll);
router.get('/:id', TipoIdentificacionController.getById);
router.post('/', TipoIdentificacionController.create);
router.put('/:id', TipoIdentificacionController.update);

export default router;