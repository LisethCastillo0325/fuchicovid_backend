import { Request, Response } from "express";
import { getRepository } from "typeorm";
import ApiResponse from '../classes/apiResponse';
import DataNotFoundError from '../classes/errors/DataNotFoundError';
import { TipoTelefono } from '../entities/TipoTelefono';
import { HTTP_STATUS_CODE_BAD_REQUEST, HTTP_STATUS_CODE_CREATED, HTTP_STATUS_CODE_NOT_FOUND, HTTP_STATUS_CODE_OK } from '../global/statuscode';

class TipoTelefonoController {

    static getAll = async (req: Request, res: Response) => {
        // Se obtiene instancia de la base de datos
        const repositoryTipoTelefono = getRepository(TipoTelefono);
        try {
            
            const data = await repositoryTipoTelefono.find();
            // Se envia datos solicitados 
            TipoTelefonoController.sendResponse(res, data);
        } catch (error) {
            // Se envia información sobre el error
            TipoTelefonoController.sendResponse(res, null, HTTP_STATUS_CODE_BAD_REQUEST, false, error.message);
        }
    }

    static getById = async (req: Request, res: Response) => {
        // Se obtiene el id que llega por parametro en la url
        const id: string = req.params.id;

        // Se obtiene instancia de la base de datos
        const repositoryTipoTelefono = getRepository(TipoTelefono);
        try {
            
            const tipoTelefono = await repositoryTipoTelefono.findOne(id);
            // Si no ecunetra el registro se lanza un error
            if(tipoTelefono === undefined){
                let error = new DataNotFoundError();
                error.message = `Tipo de Telefono con id ${id} no encontrado`;
                error.statusCode = HTTP_STATUS_CODE_NOT_FOUND;
                throw error;
            }
            // Se envia datos solicitados 
            TipoTelefonoController.sendResponse(res, tipoTelefono);

        } catch (error) {
            // Se envia información sobre el error
            if(error instanceof DataNotFoundError){
                TipoTelefonoController.sendResponse(res, null, error.statusCode, false, error.message);
            }else{
                TipoTelefonoController.sendResponse(res, null, HTTP_STATUS_CODE_BAD_REQUEST, false, error.message);
            }
        }
    }

    static create = async (req: Request, res: Response) => {

        try {
            console.log(req.body);
            // se obtiene los datos enviados por parametro
            let { nombre } : TipoTelefono = req.body;

            // Se construye objeto
            let tipoTelefono = new TipoTelefono();
            tipoTelefono.nombre = nombre.toUpperCase();

            // Se obtiene instancia de la base de datos
            const repositoryTipoTelefono = getRepository(TipoTelefono);
            // Se guarda el objeto
            const results = repositoryTipoTelefono.save(tipoTelefono);
            // Se envia resultado 
            TipoTelefonoController.sendResponse(res, results, HTTP_STATUS_CODE_CREATED, true, "Tipo de Telefono creado correctamente");

        } catch (error) {
             // Se envia información sobre el error
            TipoTelefonoController.sendResponse(res, null, HTTP_STATUS_CODE_BAD_REQUEST, false, error.message);
        }

    }

    static update = async (req: Request, res: Response) => {
        try {
             
            // Se obtiene el id que llega por parametro en la url
            const id: string = req.params.id;

            // se obtiene los datos enviados por parametro
            let { nombre } : TipoTelefono = req.body;

            // Se obtiene instancia de la base de datos
            const repositoryTipoTelefono = getRepository(TipoTelefono);

            
            const tipoTelefono = await repositoryTipoTelefono.findOne(id);

            // Si no ecunetra el registro se lanza un error
            if(tipoTelefono === undefined){
                let error = new DataNotFoundError();
                error.message = `Tipo de Telefono con id ${id} no encontrado`;
                error.statusCode = HTTP_STATUS_CODE_NOT_FOUND;
                throw error;
            }

            
            tipoTelefono.nombre = nombre.toUpperCase();

            // Se actualiza el objeto
            const results = repositoryTipoTelefono.save(tipoTelefono);

            // Se envia resultado 
            TipoTelefonoController.sendResponse(res, results, HTTP_STATUS_CODE_CREATED, true, "Tipo de telefono actualizado correctamente");

        } catch (error) {
             // Se envia información sobre el error
            if(error instanceof DataNotFoundError){
                TipoTelefonoController.sendResponse(res, null, error.statusCode, false, error.message);
            }else{
                TipoTelefonoController.sendResponse(res, null, HTTP_STATUS_CODE_BAD_REQUEST, false, error.message);
            }
        }
    }

    static sendResponse(response : Response, data: any = null, code : number = HTTP_STATUS_CODE_OK, ok : boolean = true, message : string = "OK") {
        const apiResponse = new ApiResponse(response, code, ok, message, data);
        apiResponse.sendResponse();
    }
}

export default TipoTelefonoController;