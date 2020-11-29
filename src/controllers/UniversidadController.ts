import { Request, Response } from "express";
import { getRepository, FindManyOptions } from "typeorm";
import { HTTP_STATUS_CODE_OK, HTTP_STATUS_CODE_BAD_REQUEST, HTTP_STATUS_CODE_NOT_FOUND, HTTP_STATUS_CODE_CREATED } from '../global/statuscode';
import { Universidad } from '../entities/Universidad';
import ApiResponse from '../classes/apiResponse';
import DataNotFoundError from '../classes/errors/DataNotFoundError';

class UniversidadController {

    static getAll = async (req: Request, res: Response) => {
        // Se obtiene instancia de la base de datos
        const repositoryUniversidad = getRepository(Universidad);
        try {
            
            const data = await repositoryUniversidad.find();
            // Se envia datos solicitados 
            UniversidadController.sendResponse(res, data);
        } catch (error) {
            // Se envia información sobre el error
            UniversidadController.sendResponse(res, null, HTTP_STATUS_CODE_BAD_REQUEST, false, error.message);
        }
    }

    static getById = async (req: Request, res: Response) => {
        // Se obtiene el id que llega por parametro en la url
        const id: string = req.params.id;

        // Se obtiene instancia de la base de datos
        const repositoryUniversidad = getRepository(Universidad);
        try {
            
            const universidad = await repositoryUniversidad.findOne(id);
            // Si no ecunetra el registro se lanza un error
            if(universidad === undefined){
                let error = new DataNotFoundError();
                error.message = `Universidad con id ${id} no encontrado`;
                error.statusCode = HTTP_STATUS_CODE_NOT_FOUND;
                throw error;
            }
            // Se envia datos solicitados 
            UniversidadController.sendResponse(res, universidad);

        } catch (error) {
            // Se envia información sobre el error
            if(error instanceof DataNotFoundError){
                UniversidadController.sendResponse(res, null, error.statusCode, false, error.message);
            }else{
                UniversidadController.sendResponse(res, null, HTTP_STATUS_CODE_BAD_REQUEST, false, error.message);
            }
        }
    }

    static create = async (req: Request, res: Response) => {

        try {
            console.log(req.body);
            // se obtiene los datos enviados por parametro
            let { nombre } : Universidad = req.body;

            // Se construye objeto
            let universidad = new Universidad();
            universidad.nombre = nombre.toUpperCase();

            // Se obtiene instancia de la base de datos
            const repositoryUniversidad = getRepository(Universidad);
            // Se guarda el objeto
            const results = repositoryUniversidad.save(universidad);
            // Se envia resultado 
            UniversidadController.sendResponse(res, results, HTTP_STATUS_CODE_CREATED, true, "Universidad creado correctamente");

        } catch (error) {
             // Se envia información sobre el error
            UniversidadController.sendResponse(res, null, HTTP_STATUS_CODE_BAD_REQUEST, false, error.message);
        }

    }

    static update = async (req: Request, res: Response) => {
        try {
             
            // Se obtiene el id que llega por parametro en la url
            const id: string = req.params.id;

            // se obtiene los datos enviados por parametro
            let { nombre } : Universidad = req.body;

            // Se obtiene instancia de la base de datos
            const repositoryUniversidad = getRepository(Universidad);

            
            const universidad = await repositoryUniversidad.findOne(id);

            // Si no ecunetra el registro se lanza un error
            if(universidad === undefined){
                let error = new DataNotFoundError();
                error.message = `Universidad con id ${id} no encontrado`;
                error.statusCode = HTTP_STATUS_CODE_NOT_FOUND;
                throw error;
            }

            
            universidad.nombre = nombre.toUpperCase();

            // Se actualiza el objeto
            const results = repositoryUniversidad.save(universidad);

            // Se envia resultado 
            UniversidadController.sendResponse(res, results, HTTP_STATUS_CODE_CREATED, true, "Universidad actualizada correctamente");

        } catch (error) {
             // Se envia información sobre el error
            if(error instanceof DataNotFoundError){
                UniversidadController.sendResponse(res, null, error.statusCode, false, error.message);
            }else{
                UniversidadController.sendResponse(res, null, HTTP_STATUS_CODE_BAD_REQUEST, false, error.message);
            }
        }
    }

    static sendResponse(response : Response, data: any = null, code : number = HTTP_STATUS_CODE_OK, ok : boolean = true, message : string = "OK") {
        const apiResponse = new ApiResponse(response, code, ok, message, data);
        apiResponse.sendResponse();
    }
}

export default UniversidadController;