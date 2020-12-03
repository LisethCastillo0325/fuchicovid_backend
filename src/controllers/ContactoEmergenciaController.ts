import { Request, Response } from "express";
import { getRepository } from "typeorm";
import ApiResponse from '../classes/apiResponse';
import DataNotFoundError from '../classes/errors/DataNotFoundError';
import { ContactoEmergencia } from '../entities/ContactoEmergencia';
import { HTTP_STATUS_CODE_OK, HTTP_STATUS_CODE_BAD_REQUEST, HTTP_STATUS_CODE_NOT_FOUND, HTTP_STATUS_CODE_CREATED } from '../global/statuscode';

class ContactoEmergenciaController {

    static getAll = async (req: Request, res: Response) => {
        // Se obtiene instancia de la base de datos
        
        const repositoryContactoEmergencia = getRepository(ContactoEmergencia);
        try {
            
            const data = await repositoryContactoEmergencia.find(
                {
                    relations:["relacionPacienteIntegrante"]
                });
            // Se envia datos solicitados 
            ContactoEmergenciaController.sendResponse(res, data);
        } catch (error) {
            // Se envia información sobre el error
            ContactoEmergenciaController.sendResponse(res, null, HTTP_STATUS_CODE_BAD_REQUEST, false, error.message);
        }
    }

    static getById = async (req: Request, res: Response) => {
        // Se obtiene el id que llega por parametro en la url

        const id: string = req.params.id;

        // Se obtiene instancia de la base de datos
        const repositoryContactoEmergencia = getRepository(ContactoEmergencia);
        try {
            
            const contactoEmergencia = await repositoryContactoEmergencia.find(
            {
                relations:["relacionPacienteIntegrante"],
                where: [{id:id}]
            });
            // Si no ecunetra el registro se lanza un error
            if(contactoEmergencia === undefined){
                let error = new DataNotFoundError();
                error.message = `Contacto de emergencia con id ${id} no encontrado`;
                error.statusCode = HTTP_STATUS_CODE_NOT_FOUND;
                throw error;
            }
            // Se envia datos solicitados 
            ContactoEmergenciaController.sendResponse(res, contactoEmergencia);

        } catch (error) {
            // Se envia información sobre el error
            if(error instanceof DataNotFoundError){
                ContactoEmergenciaController.sendResponse(res, null, error.statusCode, false, error.message);
            }else{
                ContactoEmergenciaController.sendResponse(res, null, HTTP_STATUS_CODE_BAD_REQUEST, false, error.message);
            }
        }
    }
    
   
    static create = async (req: Request, res: Response) => {

        try {
            // console.log(req.body);
            // // se obtiene los datos enviados por parametro
            // let {  relacionPacienteIntegrante } : ContactoEmergencia = req.body;
           
           
            // // Se construye objeto
           
            // let contactoEmergencia = new ContactoEmergencia();
            // contactoEmergencia.relacionPacienteIntegrante=relacionPacienteIntegrante;
            // const repositoryContactoEmergencia = getRepository(ContactoEmergencia);
            
            // await repositoryContactoEmergencia.save(contactoEmergencia)           

        } catch (error) {
             // Se envia información sobre el error
            ContactoEmergenciaController.sendResponse(res, null, HTTP_STATUS_CODE_BAD_REQUEST, false, error.message);
        }

    }

    static update = async (req: Request, res: Response) => {
        try {
             
            // Se obtiene el id que llega por parametro en la url
            const id: string = req.params.id;
    
            // Se obtiene instancia de la base de datos
            const repositoryContactoEmergencia = getRepository(ContactoEmergencia);

            
            const contactoEmergencia = await repositoryContactoEmergencia.findOne(id);

            // Si no ecunetra el registro se lanza un error
            if(contactoEmergencia === undefined){
                let error = new DataNotFoundError();
                error.message = `Relacion con id ${id} no encontrado`;
                error.statusCode = HTTP_STATUS_CODE_NOT_FOUND;
                throw error;
            }
            // let {  relacionPacienteIntegrante } : ContactoEmergencia = req.body;
            // contactoEmergencia.relacionPacienteIntegrante=relacionPacienteIntegrante;
            // const results=await repositoryContactoEmergencia.save(contactoEmergencia)        

            

            // Se envia resultado 
            //ContactoEmergenciaController.sendResponse(res, results, HTTP_STATUS_CODE_CREATED, true, "ContactoEmergencia actualizado correctamente");

        } catch (error) {
             // Se envia información sobre el error
            if(error instanceof DataNotFoundError){
                ContactoEmergenciaController.sendResponse(res, null, error.statusCode, false, error.message);
            }else{
               ContactoEmergenciaController.sendResponse(res, null, HTTP_STATUS_CODE_BAD_REQUEST, false, error.message);
            }
        }
    }

    static sendResponse(response : Response, data: any = null, code : number = HTTP_STATUS_CODE_OK, ok : boolean = true, message : string = "OK") {
        const apiResponse = new ApiResponse(response, code, ok, message, data);
        apiResponse.sendResponse();
    }
}

export default ContactoEmergenciaController;