import { Request, Response } from "express";
import { getRepository } from "typeorm";
import ApiResponse from '../classes/apiResponse';
import DataNotFoundError from '../classes/errors/DataNotFoundError';
import { RegistroDosis } from '../entities/RegistroDosis';
import { HTTP_STATUS_CODE_OK, HTTP_STATUS_CODE_BAD_REQUEST, HTTP_STATUS_CODE_NOT_FOUND, HTTP_STATUS_CODE_CREATED } from '../global/statuscode';

class RegistroDosisController {

    static getAll = async (req: Request, res: Response) => {
        // Se obtiene instancia de la base de datos
        
        const repositoryRegistroDosis = getRepository(RegistroDosis);
        try {
            
            const data = await repositoryRegistroDosis.find(
                {
                    relations:["idMedicamentoLaboratorio"]
                });
            // Se envia datos solicitados 
            RegistroDosisController.sendResponse(res, data);
        } catch (error) {
            // Se envia información sobre el error
            RegistroDosisController.sendResponse(res, null, HTTP_STATUS_CODE_BAD_REQUEST, false, error.message);
        }
    }

    static getById = async (req: Request, res: Response) => {
        // Se obtiene el id que llega por parametro en la url

        const id: string = req.params.id;

        // Se obtiene instancia de la base de datos
        const repositoryRegistroDosis = getRepository(RegistroDosis);
        try {
            
            const registroDosis = await repositoryRegistroDosis.find(
            {
                relations:["idMedicamentoLaboratorio"],
                where: [{id:id}]
            });
            // Si no ecunetra el registro se lanza un error
            if(registroDosis === undefined){
                let error = new DataNotFoundError();
                error.message = `Dosis con id ${id} no encontrado`;
                error.statusCode = HTTP_STATUS_CODE_NOT_FOUND;
                throw error;
            }
            // Se envia datos solicitados 
            RegistroDosisController.sendResponse(res, registroDosis);

        } catch (error) {
            // Se envia información sobre el error
            if(error instanceof DataNotFoundError){
                RegistroDosisController.sendResponse(res, null, error.statusCode, false, error.message);
            }else{
                RegistroDosisController.sendResponse(res, null, HTTP_STATUS_CODE_BAD_REQUEST, false, error.message);
            }
        }
    }
    
   
    static create = async (req: Request, res: Response) => {

        try {
            console.log(req.body);
            // se obtiene los datos enviados por parametro
            let {dosis,idMedicamentoLaboratorio} : RegistroDosis = req.body;
           
           
            // Se construye objeto
           
            let registroDosis = new RegistroDosis();
            registroDosis.dosis=dosis
            registroDosis.idMedicamentoLaboratorio=idMedicamentoLaboratorio;
           
            const repositoryRegistroDosis = getRepository(RegistroDosis);
            
            const results=await repositoryRegistroDosis.save(registroDosis)           
            RegistroDosisController.sendResponse(res, results, HTTP_STATUS_CODE_CREATED, true, "RegistroDosis actualizado correctamente");

        } catch (error) {
             // Se envia información sobre el error
            RegistroDosisController.sendResponse(res, null, HTTP_STATUS_CODE_BAD_REQUEST, false, error.message);
        }

    }

    static update = async (req: Request, res: Response) => {
        try {
             
            // Se obtiene el id que llega por parametro en la url
            const id: string = req.params.id;
    
            // Se obtiene instancia de la base de datos
            const repositoryRegistroDosis = getRepository(RegistroDosis);

            
            const registroDosis = await repositoryRegistroDosis.findOne(id);

            // Si no ecunetra el registro se lanza un error
            if(registroDosis === undefined){
                let error = new DataNotFoundError();
                error.message = `Control con id ${id} no encontrado`;
                error.statusCode = HTTP_STATUS_CODE_NOT_FOUND;
                throw error;
            }
            let {dosis,idMedicamentoLaboratorio} : RegistroDosis = req.body;
            
            registroDosis.dosis=dosis
            registroDosis.idMedicamentoLaboratorio=idMedicamentoLaboratorio;
    
            const results=await repositoryRegistroDosis.save(registroDosis)        

        

            // Se envia resultado 
            RegistroDosisController.sendResponse(res, results, HTTP_STATUS_CODE_CREATED, true, "RegistroDosis actualizado correctamente");

        } catch (error) {
             // Se envia información sobre el error
            if(error instanceof DataNotFoundError){
                RegistroDosisController.sendResponse(res, null, error.statusCode, false, error.message);
            }else{
               RegistroDosisController.sendResponse(res, null, HTTP_STATUS_CODE_BAD_REQUEST, false, error.message);
            }
        }
    }

    static sendResponse(response : Response, data: any = null, code : number = HTTP_STATUS_CODE_OK, ok : boolean = true, message : string = "OK") {
        const apiResponse = new ApiResponse(response, code, ok, message, data);
        apiResponse.sendResponse();
    }
}

export default RegistroDosisController;