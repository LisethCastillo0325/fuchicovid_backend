import { Request, Response } from "express";
import { getRepository, FindManyOptions } from "typeorm";
import { HTTP_STATUS_CODE_OK, HTTP_STATUS_CODE_BAD_REQUEST, HTTP_STATUS_CODE_NOT_FOUND, HTTP_STATUS_CODE_CREATED } from '../global/statuscode';
import { EntidadPromotoraSalud } from '../entities/EntidadPromotoraSalud';
import ApiResponse from '../classes/apiResponse';
import DataNotFoundError from '../classes/errors/DataNotFoundError';

class EntidadPromotoraSaludController {

    static getAll = async (req: Request, res: Response) => {
        // Se obtiene instancia de la base de datos
        const repositoryEntidadPromotoraSalud = getRepository(EntidadPromotoraSalud);
        try {
            
            const data = await repositoryEntidadPromotoraSalud.find();
            // Se envia datos solicitados 
            EntidadPromotoraSaludController.sendResponse(res, data);
        } catch (error) {
            // Se envia información sobre el error
            EntidadPromotoraSaludController.sendResponse(res, null, HTTP_STATUS_CODE_BAD_REQUEST, false, error.message);
        }
    }

    static getById = async (req: Request, res: Response) => {
        // Se obtiene el id que llega por parametro en la url
        const id: string = req.params.id;

        // Se obtiene instancia de la base de datos
        const repositoryEntidadPromotoraSalud = getRepository(EntidadPromotoraSalud);
        try {
            
            const entidadPromotoraSalud = await repositoryEntidadPromotoraSalud.findOne(id);
            // Si no ecunetra el registro se lanza un error
            if(entidadPromotoraSalud === undefined){
                let error = new DataNotFoundError();
                error.message = `Entidad Promotora de Salud con id ${id} no encontrado`;
                error.statusCode = HTTP_STATUS_CODE_NOT_FOUND;
                throw error;
            }
            // Se envia datos solicitados 
            EntidadPromotoraSaludController.sendResponse(res, entidadPromotoraSalud);

        } catch (error) {
            // Se envia información sobre el error
            if(error instanceof DataNotFoundError){
                EntidadPromotoraSaludController.sendResponse(res, null, error.statusCode, false, error.message);
            }else{
                EntidadPromotoraSaludController.sendResponse(res, null, HTTP_STATUS_CODE_BAD_REQUEST, false, error.message);
            }
        }
    }

    static create = async (req: Request, res: Response) => {

        try {
            console.log(req.body);
            // se obtiene los datos enviados por parametro
            let { nombre } : EntidadPromotoraSalud = req.body;

            // Se construye objeto
            let entidadPromotoraSalud = new EntidadPromotoraSalud();
            entidadPromotoraSalud.nombre = nombre.toUpperCase();

            // Se obtiene instancia de la base de datos
            const repositoryEntidadPromotoraSalud = getRepository(EntidadPromotoraSalud);
            // Se guarda el objeto
            const results = repositoryEntidadPromotoraSalud.save(entidadPromotoraSalud);
            // Se envia resultado 
            EntidadPromotoraSaludController.sendResponse(res, results, HTTP_STATUS_CODE_CREATED, true, "Entidad Promotora de Salud creado correctamente");

        } catch (error) {
             // Se envia información sobre el error
            EntidadPromotoraSaludController.sendResponse(res, null, HTTP_STATUS_CODE_BAD_REQUEST, false, error.message);
        }

    }

    static update = async (req: Request, res: Response) => {
        try {
             
            // Se obtiene el id que llega por parametro en la url
            const id: string = req.params.id;

            // se obtiene los datos enviados por parametro
            let { nombre } : EntidadPromotoraSalud = req.body;

            // Se obtiene instancia de la base de datos
            const repositoryEntidadPromotoraSalud = getRepository(EntidadPromotoraSalud);

            
            const entidadPromotoraSalud = await repositoryEntidadPromotoraSalud.findOne(id);

            // Si no ecunetra el registro se lanza un error
            if(entidadPromotoraSalud === undefined){
                let error = new DataNotFoundError();
                error.message = `Entidad Promotora Salud con id ${id} no encontrado`;
                error.statusCode = HTTP_STATUS_CODE_NOT_FOUND;
                throw error;
            }

            
            entidadPromotoraSalud.nombre = nombre.toUpperCase();

            // Se actualiza el objeto
            const results = repositoryEntidadPromotoraSalud.save(entidadPromotoraSalud);

            // Se envia resultado 
            EntidadPromotoraSaludController.sendResponse(res, results, HTTP_STATUS_CODE_CREATED, true, "Entidad Promotora de Salud actualizada correctamente");

        } catch (error) {
             // Se envia información sobre el error
            if(error instanceof DataNotFoundError){
                EntidadPromotoraSaludController.sendResponse(res, null, error.statusCode, false, error.message);
            }else{
                EntidadPromotoraSaludController.sendResponse(res, null, HTTP_STATUS_CODE_BAD_REQUEST, false, error.message);
            }
        }
    }

    static sendResponse(response : Response, data: any = null, code : number = HTTP_STATUS_CODE_OK, ok : boolean = true, message : string = "OK") {
        const apiResponse = new ApiResponse(response, code, ok, message, data);
        apiResponse.sendResponse();
    }
}

export default EntidadPromotoraSaludController;