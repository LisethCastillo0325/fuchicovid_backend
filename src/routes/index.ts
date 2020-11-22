import { Router } from 'express';
import tipoIdentificacion from "./tipoIdentificacion";

const routes = Router();

//Rutas
routes.use('/tipo-identificacion', tipoIdentificacion);


export default routes;