import { Router } from "express";

const router = Router();

// Rutas para el paciente
router.get('/', () => { console.log('total pacientes') });


export default router;