import { Request, Response } from "express";
import { getRepository } from "typeorm";
import ApiResponse from '../classes/apiResponse';
import DataNotFoundError from '../classes/errors/DataNotFoundError';
import { RelacionPacienteIntegrante } from '../entities/RelacionPacienteIntegrante';
import { HTTP_STATUS_CODE_BAD_REQUEST, HTTP_STATUS_CODE_NOT_FOUND, HTTP_STATUS_CODE_OK } from '../global/statuscode';

class RelacionPacienteIntegranteController {

    static getAll = async (req: Request, res: Response) => {
        // Se obtiene instancia de la base de datos
        
        const repositoryRelacionPacienteIntegrante = getRepository(RelacionPacienteIntegrante);
        try {
            
            const data = await repositoryRelacionPacienteIntegrante.find(
                {
                    relations:["idPaciente","idIntegrante"]
                });
            // Se envia datos solicitados 
            RelacionPacienteIntegranteController.sendResponse(res, data);
        } catch (error) {
            // Se envia información sobre el error
            RelacionPacienteIntegranteController.sendResponse(res, null, HTTP_STATUS_CODE_BAD_REQUEST, false, error.message);
        }
    }

    static getById = async (req: Request, res: Response) => {
        // Se obtiene el id que llega por parametro en la url

        const id: string = req.params.id;

        // Se obtiene instancia de la base de datos
        const repositoryRelacionPacienteIntegrante = getRepository(RelacionPacienteIntegrante);
        try {
            
            const relacionPacienteIntegrante = await repositoryRelacionPacienteIntegrante.find(
            {
                relations:["idPaciente","idIntegrante"],
                where: [{id:id}]
            });
            // Si no ecunetra el registro se lanza un error
            if(relacionPacienteIntegrante === undefined){
                let error = new DataNotFoundError();
                error.message = `Relacion Paciente-Integrante con id ${id} no encontrado`;
                error.statusCode = HTTP_STATUS_CODE_NOT_FOUND;
                throw error;
            }
            // Se envia datos solicitados 
            RelacionPacienteIntegranteController.sendResponse(res, relacionPacienteIntegrante);

        } catch (error) {
            // Se envia información sobre el error
            if(error instanceof DataNotFoundError){
                RelacionPacienteIntegranteController.sendResponse(res, null, error.statusCode, false, error.message);
            }else{
                RelacionPacienteIntegranteController.sendResponse(res, null, HTTP_STATUS_CODE_BAD_REQUEST, false, error.message);
            }
        }
    }
    
    static getByPersonaId = async (req: Request, res: Response) => {
        // Se obtiene el id que llega por parametro en la url
        const id = req.params.id;

        // Se obtiene instancia de la base de datos
        const repositoryRelacionPacienteIntegrante = getRepository(RelacionPacienteIntegrante);
        try {
            
            const relacion=await repositoryRelacionPacienteIntegrante.find(
            {
                relations:["idPaciente","idIntegrante"],
                where: [{idPaciente:id},{idIntegrante:id}]
            });
            //.then(function(value){console.log(value)});
            // Si no ecunetra el registro se lanza un error
            if(relacion === undefined){
                let error = new DataNotFoundError();
                error.message = `Relacion Paciente-Integrante con id de paciente ${id} no encontrado`;
                error.statusCode = HTTP_STATUS_CODE_NOT_FOUND;
                throw error;
            }
            // Se envia datos solicitados 
            RelacionPacienteIntegranteController.sendResponse(res, relacion);

        } catch (error) {
            // Se envia información sobre el error
            if(error instanceof DataNotFoundError){
                RelacionPacienteIntegranteController.sendResponse(res, null, error.statusCode, false, error.message);
            }else{
                RelacionPacienteIntegranteController.sendResponse(res, null, HTTP_STATUS_CODE_BAD_REQUEST, false, error.message);
            }
        }
    }
   
    static create = async (req: Request, res: Response) => {

        try {
            console.log(req.body);
            // se obtiene los datos enviados por parametro
            let { idPaciente,idIntegrante,parentesco } : RelacionPacienteIntegrante = req.body;
           
           
            // Se construye objeto
           
            let relacionPacienteIntegrante = new RelacionPacienteIntegrante();
            relacionPacienteIntegrante.idPaciente=idPaciente;
            relacionPacienteIntegrante.idIntegrante=idIntegrante;
            relacionPacienteIntegrante.parentesco=parentesco
            const repositoryRelacionPacienteIntegrante = getRepository(RelacionPacienteIntegrante);
            
            await repositoryRelacionPacienteIntegrante.save(relacionPacienteIntegrante)           

        } catch (error) {
             // Se envia información sobre el error
            RelacionPacienteIntegranteController.sendResponse(res, null, HTTP_STATUS_CODE_BAD_REQUEST, false, error.message);
        }

    }

    static update = async (req: Request, res: Response) => {
        try {
             
            // Se obtiene el id que llega por parametro en la url
            const id: string = req.params.id;
    
            // Se obtiene instancia de la base de datos
            const repositoryRelacionPacienteIntegrante = getRepository(RelacionPacienteIntegrante);

            
            const relacionPacienteIntegrante = await repositoryRelacionPacienteIntegrante.findOne(id);

            // Si no ecunetra el registro se lanza un error
            if(relacionPacienteIntegrante === undefined){
                let error = new DataNotFoundError();
                error.message = `Relacion con id ${id} no encontrado`;
                error.statusCode = HTTP_STATUS_CODE_NOT_FOUND;
                throw error;
            }
            let { idPaciente,idIntegrante,parentesco } : RelacionPacienteIntegrante = req.body;
            relacionPacienteIntegrante.idPaciente=idPaciente;
            relacionPacienteIntegrante.idIntegrante=idIntegrante;
            relacionPacienteIntegrante.parentesco=parentesco

            await repositoryRelacionPacienteIntegrante.save(relacionPacienteIntegrante)        

            // Se actualiza el objeto
            //const results = repositoryRelacionPacienteIntegrante.save(relacionPacienteIntegrante);

            // Se envia resultado 
            //RelacionPacienteIntegranteController.sendResponse(res, results, HTTP_STATUS_CODE_CREATED, true, "RelacionPacienteIntegrante actualizado correctamente");

        } catch (error) {
             // Se envia información sobre el error
            if(error instanceof DataNotFoundError){
                //RelacionPacienteIntegranteController.sendResponse(res, null, error.statusCode, false, error.message);
            }else{
               // RelacionPacienteIntegranteController.sendResponse(res, null, HTTP_STATUS_CODE_BAD_REQUEST, false, error.message);
            }
        }
    }

    static sendResponse(response : Response, data: any = null, code : number = HTTP_STATUS_CODE_OK, ok : boolean = true, message : string = "OK") {
        const apiResponse = new ApiResponse(response, code, ok, message, data);
        apiResponse.sendResponse();
    }
}

export default RelacionPacienteIntegranteController;