import { Request, Response } from "express";
import { getRepository, QueryRunner } from "typeorm";
import ApiResponse from '../classes/apiResponse';
import DataNotFoundError from '../classes/errors/DataNotFoundError';
import { Persona } from '../entities/Persona';
import { HTTP_STATUS_CODE_BAD_REQUEST, HTTP_STATUS_CODE_CREATED, HTTP_STATUS_CODE_NOT_FOUND, HTTP_STATUS_CODE_OK } from '../global/statuscode';

class PersonaController {

    static getAll = async (req: Request, res: Response) => {
        // Se obtiene instancia de la base de datos
        const repositoryPersona = getRepository(Persona);
        try {
            
            const data = await repositoryPersona.find();
            // Se envia datos solicitados 
            return data;
            //PersonaController.sendResponse(res, data);
        } catch (error) {
            // Se envia información sobre el error
            PersonaController.sendResponse(res, null, HTTP_STATUS_CODE_BAD_REQUEST, false, error.message);
        }
    }

    static getById = async (req: Request, res: Response) => {
        // Se obtiene el id que llega por parametro en la url
        const id: string = req.params.id;

        // Se obtiene instancia de la base de datos
        const repositoryPersona = getRepository(Persona);
        try {
            
            const persona = await repositoryPersona.findOne(id);
            // Si no ecunetra el registro se lanza un error
            if(persona === undefined){
                let error = new DataNotFoundError();
                error.message = `Persona con id ${id} no encontrado`;
                error.statusCode = HTTP_STATUS_CODE_NOT_FOUND;
                throw error;
            }
            // Se envia datos solicitados 
            return persona;
            //PersonaController.sendResponse(res, persona);

        } catch (error) {
            // Se envia información sobre el error
            if(error instanceof DataNotFoundError){
                PersonaController.sendResponse(res, null, error.statusCode, false, error.message);
            }else{
                PersonaController.sendResponse(res, null, HTTP_STATUS_CODE_BAD_REQUEST, false, error.message);
            }
        }
    }

    static create = async (req: Request, res: Response, queryRunner: QueryRunner) => {

        // se obtiene los datos enviados por parametro
        let { 
            nombre,
            numeroIdentificacion,
            idTipoIdentificacion,
            fechaNacimiento
        } : Persona = req.body;

        // Se construye objeto
        let persona = new Persona();
        persona.nombre = nombre;
        persona.numeroIdentificacion=numeroIdentificacion;
        persona.idTipoIdentificacion=idTipoIdentificacion;
        persona.fechaNacimiento = fechaNacimiento;
        
        // Se guarda el objeto
        return await queryRunner.manager.save(persona);

    }

    static update = async (req: Request, res: Response, queryRunner: QueryRunner) => {
       
        // Se obtiene el id que llega por parametro en la url
        const id: string = req.params.id;

        // se obtiene los datos enviados por parametro
        let { 
            nombre,
            numeroIdentificacion,
            idTipoIdentificacion,
            fechaNacimiento
        } : Persona = req.body;
        // Se obtiene instancia de la base de datos
        const persona : Persona = await queryRunner.manager.findOne(id);

        // Si no ecunetra el registro se lanza un error
        if(persona === undefined){
            let error = new DataNotFoundError();
            error.message = `Persona con id ${id} no encontrado`;
            error.statusCode = HTTP_STATUS_CODE_NOT_FOUND;
            throw error;
        }

        // Se construye objeto
        persona.nombre = nombre;
        persona.numeroIdentificacion=numeroIdentificacion;
        persona.idTipoIdentificacion=idTipoIdentificacion;
        persona.fechaNacimiento=fechaNacimiento;
        // Se actualiza el objeto
        return await queryRunner.manager.save(persona);
    }

    static sendResponse(response : Response, data: any = null, code : number = HTTP_STATUS_CODE_OK, ok : boolean = true, message : string = "OK") {
        const apiResponse = new ApiResponse(response, code, ok, message, data);
        apiResponse.sendResponse();
    }
}

export default PersonaController;