import { Request, Response } from "express";
import { getRepository } from "typeorm";
import ApiResponse from '../classes/apiResponse';
import DataNotFoundError from '../classes/errors/DataNotFoundError';
import { CorreoIntegranteHogar } from '../entities/CorreoIntegranteHogar';
import { HTTP_STATUS_CODE_BAD_REQUEST, HTTP_STATUS_CODE_CREATED, HTTP_STATUS_CODE_NOT_FOUND, HTTP_STATUS_CODE_OK } from '../global/statuscode';

class CorreoIntegranteHogarController {

    static getAll = async (req: Request, res: Response) => {
        // Se obtiene instancia de la base de datos
        const repositoryCorreoIntegranteHogar = getRepository(CorreoIntegranteHogar);
        try {
            
            const data = await repositoryCorreoIntegranteHogar.find();
            // Se envia datos solicitados 
            CorreoIntegranteHogarController.sendResponse(res, data);
        } catch (error) {
            // Se envia información sobre el error
            CorreoIntegranteHogarController.sendResponse(res, null, HTTP_STATUS_CODE_BAD_REQUEST, false, error.message);
        }
    }

    static getById = async (req: Request, res: Response) => {
        // Se obtiene el id que llega por parametro en la url
        const id: string = req.params.id;

        // Se obtiene instancia de la base de datos
        const repositoryCorreoIntegranteHogar = getRepository(CorreoIntegranteHogar);
        try {
            
            const correoIntegranteHogar = await repositoryCorreoIntegranteHogar.findOne(id);
            // Si no ecunetra el registro se lanza un error
            if(correoIntegranteHogar === undefined){
                let error = new DataNotFoundError();
                error.message = `Direccion de correo con id ${id} no encontrado`;
                error.statusCode = HTTP_STATUS_CODE_NOT_FOUND;
                throw error;
            }
            // Se envia datos solicitados 
            CorreoIntegranteHogarController.sendResponse(res, correoIntegranteHogar);

        } catch (error) {
            // Se envia información sobre el error
            if(error instanceof DataNotFoundError){
                CorreoIntegranteHogarController.sendResponse(res, null, error.statusCode, false, error.message);
            }else{
                CorreoIntegranteHogarController.sendResponse(res, null, HTTP_STATUS_CODE_BAD_REQUEST, false, error.message);
            }
        }
    }
    static getByPersonaId = async (req: Request, res: Response) => {
        // Se obtiene el id que llega por parametro en la url
        const id: string = req.params.id;

        // Se obtiene instancia de la base de datos
        const repositoryCorreoIntegranteHogar = getRepository(CorreoIntegranteHogar);
        try {
            
            const correoIntegranteHogar = await repositoryCorreoIntegranteHogar.find(
                {
                    
                    where: [{idIntegranteHogar:id}]
                });
            // Si no ecunetra el registro se lanza un error
            if(correoIntegranteHogar === undefined){
                let error = new DataNotFoundError();
                error.message = `Direccion de correo con id ${id} no encontrado`;
                error.statusCode = HTTP_STATUS_CODE_NOT_FOUND;
                throw error;
            }
            // Se envia datos solicitados 
            CorreoIntegranteHogarController.sendResponse(res, correoIntegranteHogar);

        } catch (error) {
            // Se envia información sobre el error
            if(error instanceof DataNotFoundError){
                CorreoIntegranteHogarController.sendResponse(res, null, error.statusCode, false, error.message);
            }else{
                CorreoIntegranteHogarController.sendResponse(res, null, HTTP_STATUS_CODE_BAD_REQUEST, false, error.message);
            }
        }
    }

    static create = async (req: Request, res: Response) => {

        try {
            console.log(req.body);
            // se obtiene los datos enviados por parametro
            let { correo,idIntegranteHogar } : CorreoIntegranteHogar = req.body;
           
            // Se construye objeto
           
            let correoIntegranteHogar = new CorreoIntegranteHogar();
            correoIntegranteHogar.correo = correo;
            correoIntegranteHogar.idIntegranteHogar=idIntegranteHogar;

            // Se obtiene instancia de la base de datos
            const repositoryCorreoIntegranteHogar = getRepository(CorreoIntegranteHogar);
            // Se guarda el objeto
            const results = repositoryCorreoIntegranteHogar.save(correoIntegranteHogar);
            // Se envia resultado 
            CorreoIntegranteHogarController.sendResponse(res, results, HTTP_STATUS_CODE_CREATED, true, "direccion de correo creada correctamente");

        } catch (error) {
             // Se envia información sobre el error
            CorreoIntegranteHogarController.sendResponse(res, null, HTTP_STATUS_CODE_BAD_REQUEST, false, error.message);
        }

    }

    static update = async (req: Request, res: Response) => {
        try {
             
            // Se obtiene el id que llega por parametro en la url
            const id: string = req.params.id;

            // se obtiene los datos enviados por parametro
            let { correo,idIntegranteHogar } : CorreoIntegranteHogar = req.body;
           
            
            // Se obtiene instancia de la base de datos
            const repositoryCorreoIntegranteHogar = getRepository(CorreoIntegranteHogar);

            
            const correoIntegranteHogar = await repositoryCorreoIntegranteHogar.findOne(id);

            // Si no ecunetra el registro se lanza un error
            if(correoIntegranteHogar === undefined){
                let error = new DataNotFoundError();
                error.message = `direccion con id ${id} no encontrado`;
                error.statusCode = HTTP_STATUS_CODE_NOT_FOUND;
                throw error;
            }
            correoIntegranteHogar.correo = correo;
            correoIntegranteHogar.idIntegranteHogar=idIntegranteHogar;
           

            // Se actualiza el objeto
            const results = repositoryCorreoIntegranteHogar.save(correoIntegranteHogar);

            // Se envia resultado 
            CorreoIntegranteHogarController.sendResponse(res, results, HTTP_STATUS_CODE_CREATED, true, "direccion de correo actualizada correctamente");

        } catch (error) {
             // Se envia información sobre el error
            if(error instanceof DataNotFoundError){
                CorreoIntegranteHogarController.sendResponse(res, null, error.statusCode, false, error.message);
            }else{
                CorreoIntegranteHogarController.sendResponse(res, null, HTTP_STATUS_CODE_BAD_REQUEST, false, error.message);
            }
        }
    }

    static sendResponse(response : Response, data: any = null, code : number = HTTP_STATUS_CODE_OK, ok : boolean = true, message : string = "OK") {
        const apiResponse = new ApiResponse(response, code, ok, message, data);
        apiResponse.sendResponse();
    }
}

export default CorreoIntegranteHogarController;