import { Router } from 'express';
import eps from "./eps";
import funcionario from "./funcionario";
import laboratorio from "./laboratorio";
import medicamento from "./medicamento";
import persona from "./persona";
import telefonoLaboratorio from "./telefonoLaboratorio";
import personaTelefonos from "./telefonoPersona";
import tipoContacto from "./tipoContacto";
import tipoIdentificacion from "./tipoIdentificacion";
import tipoTelefono from "./tipoTelefono";
import universidad from "./universidad";
import direccionPersona from "./direccionPersona"
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
routes.use('/funcionario',funcionario);
routes.use('/tel-persona',personaTelefonos);
routes.use('/dir-persona',direccionPersona);
export default routes;