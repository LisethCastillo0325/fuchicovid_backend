import { Request, Response } from "express";
import { getRepository } from "typeorm";
import ApiResponse from '../classes/apiResponse';
import DataNotFoundError from '../classes/errors/DataNotFoundError';
import { PersonaDireccion } from '../entities/PersonaDireccion';
import { HTTP_STATUS_CODE_BAD_REQUEST, HTTP_STATUS_CODE_CREATED, HTTP_STATUS_CODE_NOT_FOUND, HTTP_STATUS_CODE_OK } from '../global/statuscode';

class PersonaDireccionController {

    static getAll = async (req: Request, res: Response) => {
        // Se obtiene instancia de la base de datos
        const repositoryPersonaDireccion = getRepository(PersonaDireccion);
        try {
            
            const data = await repositoryPersonaDireccion.find();
            // Se envia datos solicitados 
            PersonaDireccionController.sendResponse(res, data);
        } catch (error) {
            // Se envia información sobre el error
            PersonaDireccionController.sendResponse(res, null, HTTP_STATUS_CODE_BAD_REQUEST, false, error.message);
        }
    }

    static getById = async (req: Request, res: Response) => {
        // Se obtiene el id que llega por parametro en la url
        const id: string = req.params.id;

        // Se obtiene instancia de la base de datos
        const repositoryPersonaDireccion = getRepository(PersonaDireccion);
        try {
            
            const personaDireccion = await repositoryPersonaDireccion.findOne(id);
            // Si no ecunetra el registro se lanza un error
            if(personaDireccion === undefined){
                let error = new DataNotFoundError();
                error.message = `Direccion de persona con id ${id} no encontrado`;
                error.statusCode = HTTP_STATUS_CODE_NOT_FOUND;
                throw error;
            }
            // Se envia datos solicitados 
            PersonaDireccionController.sendResponse(res, personaDireccion);

        } catch (error) {
            // Se envia información sobre el error
            if(error instanceof DataNotFoundError){
                PersonaDireccionController.sendResponse(res, null, error.statusCode, false, error.message);
            }else{
                PersonaDireccionController.sendResponse(res, null, HTTP_STATUS_CODE_BAD_REQUEST, false, error.message);
            }
        }
    }

    static create = async (req: Request, res: Response) => {

        try {
            console.log(req.body);
            // se obtiene los datos enviados por parametro
            let { direccion,barrio,idPersona } : PersonaDireccion = req.body;
           
            // Se construye objeto
           
            let personaDireccion = new PersonaDireccion();
            personaDireccion.barrio = barrio;
            personaDireccion.idPersona=idPersona;
            personaDireccion.direccion=direccion;

            // Se obtiene instancia de la base de datos
            const repositoryPersonaDireccion = getRepository(PersonaDireccion);
            // Se guarda el objeto
            const results = repositoryPersonaDireccion.save(personaDireccion);
            // Se envia resultado 
            PersonaDireccionController.sendResponse(res, results, HTTP_STATUS_CODE_CREATED, true, "direccion creada correctamente");

        } catch (error) {
             // Se envia información sobre el error
            PersonaDireccionController.sendResponse(res, null, HTTP_STATUS_CODE_BAD_REQUEST, false, error.message);
        }

    }

    static update = async (req: Request, res: Response) => {
        try {
             
            // Se obtiene el id que llega por parametro en la url
            const id: string = req.params.id;

            // se obtiene los datos enviados por parametro
            let { direccion,barrio,idPersona } : PersonaDireccion = req.body;
           
            
            // Se obtiene instancia de la base de datos
            const repositoryPersonaDireccion = getRepository(PersonaDireccion);

            
            const personaDireccion = await repositoryPersonaDireccion.findOne(id);

            // Si no ecunetra el registro se lanza un error
            if(personaDireccion === undefined){
                let error = new DataNotFoundError();
                error.message = `direccion con id ${id} no encontrado`;
                error.statusCode = HTTP_STATUS_CODE_NOT_FOUND;
                throw error;
            }

            personaDireccion.barrio = barrio;
            personaDireccion.idPersona=idPersona;
            personaDireccion.direccion=direccion;
           

            // Se actualiza el objeto
            const results = repositoryPersonaDireccion.save(personaDireccion);

            // Se envia resultado 
            PersonaDireccionController.sendResponse(res, results, HTTP_STATUS_CODE_CREATED, true, "direccion actualizada correctamente");

        } catch (error) {
             // Se envia información sobre el error
            if(error instanceof DataNotFoundError){
                PersonaDireccionController.sendResponse(res, null, error.statusCode, false, error.message);
            }else{
                PersonaDireccionController.sendResponse(res, null, HTTP_STATUS_CODE_BAD_REQUEST, false, error.message);
            }
        }
    }

    static sendResponse(response : Response, data: any = null, code : number = HTTP_STATUS_CODE_OK, ok : boolean = true, message : string = "OK") {
        const apiResponse = new ApiResponse(response, code, ok, message, data);
        apiResponse.sendResponse();
    }
}

export default PersonaDireccionController;