import { Request, Response } from "express";
import { getRepository } from "typeorm";
import ApiResponse from '../classes/apiResponse';
import DataNotFoundError from '../classes/errors/DataNotFoundError';
import { PersonaTelefonos } from '../entities/PersonaTelefonos';
import { TipoTelefono } from '../entities/TipoTelefono';
import { HTTP_STATUS_CODE_BAD_REQUEST, HTTP_STATUS_CODE_CREATED, HTTP_STATUS_CODE_NOT_FOUND, HTTP_STATUS_CODE_OK } from '../global/statuscode';

class PersonaTelefonosController {

    static getAll = async (req: Request, res: Response) => {
        // Se obtiene instancia de la base de datos
        const repositoryPersonaTelefonos = getRepository(PersonaTelefonos);
        try {
            
            const data = await repositoryPersonaTelefonos.find();
            // Se envia datos solicitados 
            PersonaTelefonosController.sendResponse(res, data);
        } catch (error) {
            // Se envia información sobre el error
            PersonaTelefonosController.sendResponse(res, null, HTTP_STATUS_CODE_BAD_REQUEST, false, error.message);
        }
    }

    static getById = async (req: Request, res: Response) => {
        // Se obtiene el id que llega por parametro en la url
        const id: string = req.params.id;

        // Se obtiene instancia de la base de datos
        const repositoryPersonaTelefonos = getRepository(PersonaTelefonos);
        try {
            
            const personaTelefonos = await repositoryPersonaTelefonos.findOne(id);
            // Si no ecunetra el registro se lanza un error
            if(personaTelefonos === undefined){
                let error = new DataNotFoundError();
                error.message = `Telefono de persona con id ${id} no encontrado`;
                error.statusCode = HTTP_STATUS_CODE_NOT_FOUND;
                throw error;
            }
            // Se envia datos solicitados 
            PersonaTelefonosController.sendResponse(res, personaTelefonos);

        } catch (error) {
            // Se envia información sobre el error
            if(error instanceof DataNotFoundError){
                PersonaTelefonosController.sendResponse(res, null, error.statusCode, false, error.message);
            }else{
                PersonaTelefonosController.sendResponse(res, null, HTTP_STATUS_CODE_BAD_REQUEST, false, error.message);
            }
        }
    }

    static create = async (req: Request, res: Response) => {

        try {
            console.log(req.body);
            // se obtiene los datos enviados por parametro
            let { telefono,idPersona } : PersonaTelefonos = req.body;
            let {tipoTel}=req.body;
            
            const repositoryTipoTel = getRepository(TipoTelefono);
            const idTipoTel= await repositoryTipoTel.createQueryBuilder("tipoTel")
            .where(`tipoTel.nombre ilike '${tipoTel}'`).getRawOne();
           
            // Se construye objeto
           
            let personaTelefonos = new PersonaTelefonos();
            personaTelefonos.telefono = telefono;
            personaTelefonos.idPersona=idPersona;
            personaTelefonos.idTipoTelefono=idTipoTel["tipoTel_id"];

            // Se obtiene instancia de la base de datos
            const repositoryPersonaTelefonos = getRepository(PersonaTelefonos);
            // Se guarda el objeto
            const results = repositoryPersonaTelefonos.save(personaTelefonos);
            // Se envia resultado 
            PersonaTelefonosController.sendResponse(res, results, HTTP_STATUS_CODE_CREATED, true, "telefono de persona creado correctamente");

        } catch (error) {
             // Se envia información sobre el error
            PersonaTelefonosController.sendResponse(res, null, HTTP_STATUS_CODE_BAD_REQUEST, false, error.message);
        }

    }

    static update = async (req: Request, res: Response) => {
        try {
             
            // Se obtiene el id que llega por parametro en la url
            const id: string = req.params.id;

            // se obtiene los datos enviados por parametro
            let { telefono,idPersona } : PersonaTelefonos = req.body;
            let {tipoTel}=req.body;
            
            // Se obtiene instancia de la base de datos
            const repositoryPersonaTelefonos = getRepository(PersonaTelefonos);

            
            const personaTelefonos = await repositoryPersonaTelefonos.findOne(id);

            // Si no ecunetra el registro se lanza un error
            if(personaTelefonos === undefined){
                let error = new DataNotFoundError();
                error.message = `Telefono de persona con id ${id} no encontrado`;
                error.statusCode = HTTP_STATUS_CODE_NOT_FOUND;
                throw error;
            }

            
            const repositoryTipoTel = getRepository(TipoTelefono);
            const idTipoTel= await repositoryTipoTel.createQueryBuilder("tipoTel")
            .where(`tipoTel.nombre ilike '${tipoTel}'`).getRawOne();
           
            // Se construye objeto
           
            personaTelefonos.telefono = telefono;
            personaTelefonos.idPersona=idPersona;
            personaTelefonos.idTipoTelefono=idTipoTel["tipoTel_id"];

            // Se actualiza el objeto
            const results = repositoryPersonaTelefonos.save(personaTelefonos);

            // Se envia resultado 
            PersonaTelefonosController.sendResponse(res, results, HTTP_STATUS_CODE_CREATED, true, "telefono actualizada correctamente");

        } catch (error) {
             // Se envia información sobre el error
            if(error instanceof DataNotFoundError){
                PersonaTelefonosController.sendResponse(res, null, error.statusCode, false, error.message);
            }else{
                PersonaTelefonosController.sendResponse(res, null, HTTP_STATUS_CODE_BAD_REQUEST, false, error.message);
            }
        }
    }

    static sendResponse(response : Response, data: any = null, code : number = HTTP_STATUS_CODE_OK, ok : boolean = true, message : string = "OK") {
        const apiResponse = new ApiResponse(response, code, ok, message, data);
        apiResponse.sendResponse();
    }
}

export default PersonaTelefonosController;