import { Router } from 'express';
import eps from "./eps";
import medicamento from "./medicamento";
import tipoIdentificacion from "./tipoIdentificacion";
import tipoTelefono from "./tipoTelefono";
import universidad from "./universidad";
import tipoContacto from "./tipoContacto";
const routes = Router();

//Rutas
routes.use('/tipo-identificacion', tipoIdentificacion);
routes.use('/universidad', universidad);
routes.use('/tipo-telefono', tipoTelefono);
routes.use('/EPS', eps);
routes.use('/medicamento', medicamento);
routes.use('/tipo-contacto', tipoContacto);

export default routes;