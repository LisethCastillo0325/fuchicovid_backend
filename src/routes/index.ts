import { Router } from 'express';
import eps from "./eps";
import laboratorio from "./laboratorio";
import medicamento from "./medicamento";
import tipoContacto from "./tipoContacto";
import tipoIdentificacion from "./tipoIdentificacion";
import tipoTelefono from "./tipoTelefono";
import universidad from "./universidad";
import telefonoLaboratorio from "./telefonoLaboratorio";
import persona from "./persona";
const routes = Router();

//Rutas
routes.use('/tipo-identificacion', tipoIdentificacion);
routes.use('/universidad', universidad);
routes.use('/tipo-telefono', tipoTelefono);
routes.use('/EPS', eps);
routes.use('/medicamento', medicamento);
routes.use('/tipo-contacto', tipoContacto);
routes.use('/laboratorio', laboratorio);
routes.use('/tel-laboratorio', telefonoLaboratorio);
routes.use('/persona', persona);

export default routes;