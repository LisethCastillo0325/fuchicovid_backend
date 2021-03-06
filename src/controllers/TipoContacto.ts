import { Request, Response } from "express";
import { getRepository, FindManyOptions } from "typeorm";
import { HTTP_STATUS_CODE_OK, HTTP_STATUS_CODE_BAD_REQUEST, HTTP_STATUS_CODE_NOT_FOUND, HTTP_STATUS_CODE_CREATED } from '../global/statuscode';
import { TipoContacto } from '../entities/TipoContacto';
import ApiResponse from '../classes/apiResponse';
import DataNotFoundError from '../classes/errors/DataNotFoundError';

class TipoContactoController {

    static getAll = async (req: Request, res: Response) => {
        // Se obtiene instancia de la base de datos
        const repositoryTipoContacto = getRepository(TipoContacto);
        try {
            
            const data = await repositoryTipoContacto.find();
            // Se envia datos solicitados 
            TipoContactoController.sendResponse(res, data);
        } catch (error) {
            // Se envia información sobre el error
            TipoContactoController.sendResponse(res, null, HTTP_STATUS_CODE_BAD_REQUEST, false, error.message);
        }
    }

    static getById = async (req: Request, res: Response) => {
        // Se obtiene el id que llega por parametro en la url
        const id: string = req.params.id;

        // Se obtiene instancia de la base de datos
        const repositoryTipoContacto = getRepository(TipoContacto);
        try {
            
            const tipoContacto = await repositoryTipoContacto.findOne(id);
            // Si no ecunetra el registro se lanza un error
            if(tipoContacto === undefined){
                let error = new DataNotFoundError();
                error.message = `TipoContacto con id ${id} no encontrado`;
                error.statusCode = HTTP_STATUS_CODE_NOT_FOUND;
                throw error;
            }
            // Se envia datos solicitados 
            TipoContactoController.sendResponse(res, tipoContacto);

        } catch (error) {
            // Se envia información sobre el error
            if(error instanceof DataNotFoundError){
                TipoContactoController.sendResponse(res, null, error.statusCode, false, error.message);
            }else{
                TipoContactoController.sendResponse(res, null, HTTP_STATUS_CODE_BAD_REQUEST, false, error.message);
            }
        }
    }

    static create = async (req: Request, res: Response) => {

        try {
            console.log(req.body);
            // se obtiene los datos enviados por parametro
            let { tipoContacto } : TipoContacto = req.body;

            // Se construye objeto
            let tContacto = new TipoContacto();
            tContacto.tipoContacto = tipoContacto.toUpperCase();

            // Se obtiene instancia de la base de datos
            const repositoryTipoContacto = getRepository(TipoContacto);
            // Se guarda el objeto
            const results = repositoryTipoContacto.save(tContacto);
            // Se envia resultado 
            TipoContactoController.sendResponse(res, results, HTTP_STATUS_CODE_CREATED, true, "TipoContacto creado correctamente");

        } catch (error) {
             // Se envia información sobre el error
            TipoContactoController.sendResponse(res, null, HTTP_STATUS_CODE_BAD_REQUEST, false, error.message);
        }

    }

    static update = async (req: Request, res: Response) => {
        try {
             
            // Se obtiene el id que llega por parametro en la url
            const id: string = req.params.id;

            // se obtiene los datos enviados por parametro
            let { tipoContacto } : TipoContacto = req.body;

            // Se obtiene instancia de la base de datos
            const repositoryTipoContacto = getRepository(TipoContacto);

            
            const tContacto = await repositoryTipoContacto.findOne(id);

            // Si no ecunetra el registro se lanza un error
            if(tipoContacto === undefined){
                let error = new DataNotFoundError();
                error.message = `TipoContacto con id ${id} no encontrado`;
                error.statusCode = HTTP_STATUS_CODE_NOT_FOUND;
                throw error;
            }

            
            tContacto.tipoContacto = tipoContacto.toUpperCase();

            // Se actualiza el objeto
            const results = repositoryTipoContacto.save(tContacto);

            // Se envia resultado 
            TipoContactoController.sendResponse(res, results, HTTP_STATUS_CODE_CREATED, true, "TipoContacto actualizada correctamente");

        } catch (error) {
             // Se envia información sobre el error
            if(error instanceof DataNotFoundError){
                TipoContactoController.sendResponse(res, null, error.statusCode, false, error.message);
            }else{
                TipoContactoController.sendResponse(res, null, HTTP_STATUS_CODE_BAD_REQUEST, false, error.message);
            }
        }
    }

    static sendResponse(response : Response, data: any = null, code : number = HTTP_STATUS_CODE_OK, ok : boolean = true, message : string = "OK") {
        const apiResponse = new ApiResponse(response, code, ok, message, data);
        apiResponse.sendResponse();
    }
}

export default TipoContactoController;