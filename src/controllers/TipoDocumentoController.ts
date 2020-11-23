import { Request, Response } from "express";
import { getRepository } from "typeorm";
import ApiResponse from '../classes/apiResponse';
import DataNotFoundError from '../classes/errors/DataNotFoundError';
import { TipoIdentificacion } from '../entities/TipoIdentificacion';
import { HTTP_STATUS_CODE_BAD_REQUEST, HTTP_STATUS_CODE_CREATED, HTTP_STATUS_CODE_NOT_FOUND, HTTP_STATUS_CODE_OK } from '../global/statuscode';

class TipoIdentificacionController {

    static getAll = async (req: Request, res: Response) => {
        // Se obtiene instancia de la base de datos
        const repositoryTipoIdentificacion = getRepository(TipoIdentificacion);
        try {
            // Se obtienen todos los tipos de Idenficación
            const data = await repositoryTipoIdentificacion.find();
            // Se envia datos solicitados 
            TipoIdentificacionController.sendResponse(res, data);
        } catch (error) {
            // Se envia información sobre el error
            TipoIdentificacionController.sendResponse(res, null, HTTP_STATUS_CODE_BAD_REQUEST, false, error.message);
        }
    }

    static getById = async (req: Request, res: Response) => {
        // Se obtiene el id que llega por parametro en la url
        const id: string = req.params.id;

        // Se obtiene instancia de la base de datos
        const repositoryTipoIdentificacion = getRepository(TipoIdentificacion);
        try {
            // se obtiene el tipo de identificación por el id
            const tipoIdentificacion = await repositoryTipoIdentificacion.findOne(id);
            // Si no ecunetra el registro se lanza un error
            if(tipoIdentificacion === undefined){
                let error = new DataNotFoundError();
                error.message = `Tipo de Identificaión con id ${id} no encontrado`;
                error.statusCode = HTTP_STATUS_CODE_NOT_FOUND;
                throw error;
            }
            // Se envia datos solicitados 
            TipoIdentificacionController.sendResponse(res, tipoIdentificacion);

        } catch (error) {
            // Se envia información sobre el error
            if(error instanceof DataNotFoundError){
                TipoIdentificacionController.sendResponse(res, null, error.statusCode, false, error.message);
            }else{
                TipoIdentificacionController.sendResponse(res, null, HTTP_STATUS_CODE_BAD_REQUEST, false, error.message);
            }
        }
    }

    static create = async (req: Request, res: Response) => {

        try {
            console.log(req.body);
            // se obtiene los datos enviados por parametro
            let { nombre } : TipoIdentificacion = req.body;

            // Se construye objeto
            let tipoIdentificacion = new TipoIdentificacion();
            tipoIdentificacion.nombre = nombre.toUpperCase();

            // Se obtiene instancia de la base de datos
            const repositoryTipoIdentificacion = getRepository(TipoIdentificacion);
            // Se guarda el objeto
            const results = repositoryTipoIdentificacion.save(tipoIdentificacion);
            // Se envia resultado 
            TipoIdentificacionController.sendResponse(res, results, HTTP_STATUS_CODE_CREATED, true, "Tipo de Identificación creado correctamente");

        } catch (error) {
             // Se envia información sobre el error
            TipoIdentificacionController.sendResponse(res, null, HTTP_STATUS_CODE_BAD_REQUEST, false, error.message);
        }

    }

    static update = async (req: Request, res: Response) => {
        try {
             
            // Se obtiene el id que llega por parametro en la url
            const id: string = req.params.id;

            // se obtiene los datos enviados por parametro
            let { nombre } : TipoIdentificacion = req.body;

            // Se obtiene instancia de la base de datos
            const repositoryTipoIdentificacion = getRepository(TipoIdentificacion);

            // se obtiene el tipo de identificación por el id
            const tipoIdentificacion = await repositoryTipoIdentificacion.findOne(id);

            // Si no ecunetra el registro se lanza un error
            if(tipoIdentificacion === undefined){
                let error = new DataNotFoundError();
                error.message = `Tipo de Identificaión con id ${id} no encontrado`;
                error.statusCode = HTTP_STATUS_CODE_NOT_FOUND;
                throw error;
            }

            // se actualiza los datos del tipo de identificación
            tipoIdentificacion.nombre = nombre.toUpperCase();

            // Se actualiza el objeto
            const results = repositoryTipoIdentificacion.save(tipoIdentificacion);

            // Se envia resultado 
            TipoIdentificacionController.sendResponse(res, results, HTTP_STATUS_CODE_CREATED, true, "Tipo de Identificación actualizado correctamente");

        } catch (error) {
             // Se envia información sobre el error
            if(error instanceof DataNotFoundError){
                TipoIdentificacionController.sendResponse(res, null, error.statusCode, false, error.message);
            }else{
                TipoIdentificacionController.sendResponse(res, null, HTTP_STATUS_CODE_BAD_REQUEST, false, error.message);
            }
        }
    }

    static sendResponse(response : Response, data: any = null, code : number = HTTP_STATUS_CODE_OK, ok : boolean = true, message : string = "OK") {
        const apiResponse = new ApiResponse(response, code, ok, message, data);
        apiResponse.sendResponse();
    }
}

export default TipoIdentificacionController;