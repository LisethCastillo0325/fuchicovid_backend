import { Request, Response } from "express";
import { getRepository, FindManyOptions } from "typeorm";
import { HTTP_STATUS_CODE_OK, HTTP_STATUS_CODE_BAD_REQUEST, HTTP_STATUS_CODE_NOT_FOUND, HTTP_STATUS_CODE_CREATED } from '../global/statuscode';
import { Departamento } from '../entities/Departamento';
import ApiResponse from '../classes/apiResponse';
import DataNotFoundError from '../classes/errors/DataNotFoundError';
import { Pais } from "../entities/Pais";

class PaisController {

    static getAll = async (req: Request, res: Response) => {
        // Se obtiene instancia de la base de datos
        const repositoryPais = getRepository(Pais);
        try {
            
            const data = await repositoryPais.find();
            // Se envia datos solicitados 
            PaisController.sendResponse(res, data);
        } catch (error) {
            // Se envia información sobre el error
            PaisController.sendResponse(res, null, HTTP_STATUS_CODE_BAD_REQUEST, false, error.message);
        }
    }

    static getById = async (req: Request, res: Response) => {
        // Se obtiene el id que llega por parametro en la url
        const id: string = req.params.id;

        // Se obtiene instancia de la base de datos
        const repositoryPais = getRepository(Pais);
        try {
            
            const Pais = await repositoryPais.findOne(id);
            // Si no ecunetra el registro se lanza un error
            if(Pais === undefined){
                let error = new DataNotFoundError();
                error.message = `Pais con id ${id} no encontrado`;
                error.statusCode = HTTP_STATUS_CODE_NOT_FOUND;
                throw error;
            }
            // Se envia datos solicitados 
            PaisController.sendResponse(res, Pais);

        } catch (error) {
            // Se envia información sobre el error
            if(error instanceof DataNotFoundError){
                PaisController.sendResponse(res, null, error.statusCode, false, error.message);
            }else{
                PaisController.sendResponse(res, null, HTTP_STATUS_CODE_BAD_REQUEST, false, error.message);
            }
        }
    }

    static create = async (req: Request, res: Response) => {

        try {
            console.log(req.body);
            // se obtiene los datos enviados por parametro
            let { nombre } : Pais = req.body;

            // Se construye objeto
            let pais = new Pais();
            pais.nombre = nombre.toUpperCase();
            
            // Se obtiene instancia de la base de datos
            const repositoryPais = getRepository(Pais);
            // Se guarda el objeto
            const results = repositoryPais.save(pais);
            // Se envia resultado 
            PaisController.sendResponse(res, results, HTTP_STATUS_CODE_CREATED, true, "Pais creado correctamente");

        } catch (error) {
             // Se envia información sobre el error
             PaisController.sendResponse(res, null, HTTP_STATUS_CODE_BAD_REQUEST, false, error.message);
        }

    }

    static update = async (req: Request, res: Response) => {
        try {
             
            // Se obtiene el id que llega por parametro en la url
            const id: string = req.params.id;

            // se obtiene los datos enviados por parametro
            let { nombre } : Pais = req.body;

            // Se obtiene instancia de la base de datos
            const repositoryPais = getRepository(Pais);

            
            const pais= await repositoryPais.findOne(id);

            // Si no ecunetra el registro se lanza un error
            if(pais === undefined){
                let error = new DataNotFoundError();
                error.message = `Pais con id ${id} no encontrada`;
                error.statusCode = HTTP_STATUS_CODE_NOT_FOUND;
                throw error;
            }

            
            pais.nombre = nombre.toUpperCase();
           

            // Se actualiza el objeto
            const results = repositoryPais.save(pais);

            // Se envia resultado 
            PaisController.sendResponse(res, results, HTTP_STATUS_CODE_CREATED, true, "Pais actualizada correctamente");

        } catch (error) {
             // Se envia información sobre el error
            if(error instanceof DataNotFoundError){
                PaisController.sendResponse(res, null, error.statusCode, false, error.message);
            }else{
                PaisController.sendResponse(res, null, HTTP_STATUS_CODE_BAD_REQUEST, false, error.message);
            }
        }
    }

    static sendResponse(response : Response, data: any = null, code : number = HTTP_STATUS_CODE_OK, ok : boolean = true, message : string = "OK") {
        const apiResponse = new ApiResponse(response, code, ok, message, data);
        apiResponse.sendResponse();
    }
}

export default PaisController;