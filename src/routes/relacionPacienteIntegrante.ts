import { Router } from "express";
import RelacionPacienteIntegranteController from "../controllers/RelacionPacienteIntegranteController";


const router = Router();

// Rutas para tipo identificación
router.get('/', RelacionPacienteIntegranteController.getAll);
router.get('/:id', RelacionPacienteIntegranteController.getById);
router.get('/persona/:id', RelacionPacienteIntegranteController.getByPersonaId);
router.post('/', RelacionPacienteIntegranteController.create);
router.put('/:id', RelacionPacienteIntegranteController.update);

export default router;