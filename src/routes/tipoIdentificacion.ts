import { Router } from "express";

import TipoIdentificacionController from "../controllers/TipoDocumentoController";

const router = Router();

// Rutas para tipo identificación
router.get('/', TipoIdentificacionController.getAll);
router.post('/pagination-filters/', TipoIdentificacionController.getAllPaginated);
router.get('/:id', TipoIdentificacionController.getById);
router.post('/', TipoIdentificacionController.create);
router.put('/:id', TipoIdentificacionController.update);
router.put('/activar-inactivar/:id', TipoIdentificacionController.inactivateAndActivate);

export default router;