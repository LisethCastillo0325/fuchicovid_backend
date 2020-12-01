import { Request, Response } from "express";
import { getRepository } from "typeorm";
import ApiResponse from '../classes/apiResponse';
import DataNotFoundError from '../classes/errors/DataNotFoundError';
import { PacienteControles } from '../entities/PacienteControles';
import { HTTP_STATUS_CODE_BAD_REQUEST, HTTP_STATUS_CODE_CREATED, HTTP_STATUS_CODE_NOT_FOUND, HTTP_STATUS_CODE_OK } from '../global/statuscode';

class PacienteControlesController {

    static getAll = async (req: Request, res: Response) => {
        // Se obtiene instancia de la base de datos
        
        const repositoryPacienteControles = getRepository(PacienteControles);
        try {
            
            const data = await repositoryPacienteControles.find(
                {
                    relations:["idPaciente","idProfesionalSalud"]
                });
            // Se envia datos solicitados 
            PacienteControlesController.sendResponse(res, data);
        } catch (error) {
            // Se envia información sobre el error
            PacienteControlesController.sendResponse(res, null, HTTP_STATUS_CODE_BAD_REQUEST, false, error.message);
        }
    }

    static getById = async (req: Request, res: Response) => {
        // Se obtiene el id que llega por parametro en la url

        const id: string = req.params.id;

        // Se obtiene instancia de la base de datos
        const repositoryPacienteControles = getRepository(PacienteControles);
        try {
            
            const pacienteControles = await repositoryPacienteControles.find(
            {
                relations:["idPaciente","idProfesionalSalud"],
                where: [{id:id}]
            });
            // Si no ecunetra el registro se lanza un error
            if(pacienteControles === undefined){
                let error = new DataNotFoundError();
                error.message = `Control con id ${id} no encontrado`;
                error.statusCode = HTTP_STATUS_CODE_NOT_FOUND;
                throw error;
            }
            // Se envia datos solicitados 
            PacienteControlesController.sendResponse(res, pacienteControles);

        } catch (error) {
            // Se envia información sobre el error
            if(error instanceof DataNotFoundError){
                PacienteControlesController.sendResponse(res, null, error.statusCode, false, error.message);
            }else{
                PacienteControlesController.sendResponse(res, null, HTTP_STATUS_CODE_BAD_REQUEST, false, error.message);
            }
        }
    }
    
    static getByPersonaId = async (req: Request, res: Response) => {
        // Se obtiene el id que llega por parametro en la url
        const id = req.params.id;

        // Se obtiene instancia de la base de datos
        const repositoryPacienteControles = getRepository(PacienteControles);
        try {
            
            const relacion=await repositoryPacienteControles.find(
            {
                relations:["idPaciente","idProfesionalSalud"],
                where: [{idPaciente:id},{idProfesionalSalud:id}]
            });
            //.then(function(value){console.log(value)});
            // Si no ecunetra el registro se lanza un error
            if(relacion === undefined){
                let error = new DataNotFoundError();
                error.message = `Control con id de persona ${id} no encontrado`;
                error.statusCode = HTTP_STATUS_CODE_NOT_FOUND;
                throw error;
            }
            // Se envia datos solicitados 
            PacienteControlesController.sendResponse(res, relacion);

        } catch (error) {
            // Se envia información sobre el error
            if(error instanceof DataNotFoundError){
                PacienteControlesController.sendResponse(res, null, error.statusCode, false, error.message);
            }else{
                PacienteControlesController.sendResponse(res, null, HTTP_STATUS_CODE_BAD_REQUEST, false, error.message);
            }
        }
    }
   
    static create = async (req: Request, res: Response) => {

        try {
            console.log(req.body);
            // se obtiene los datos enviados por parametro
            let { idPaciente,idProfesionalSalud,
                fecha,hora,temperatura,peso,presionDiastolica,
                presionSistolica,observaciones} : PacienteControles = req.body;
           
           
            // Se construye objeto
           
            let pacienteControles = new PacienteControles();
            pacienteControles.idPaciente=idPaciente;
            pacienteControles.idProfesionalSalud=idProfesionalSalud;
            pacienteControles.fecha=fecha;
            pacienteControles.hora=hora;
            pacienteControles.temperatura=temperatura;
            pacienteControles.peso=peso;
            pacienteControles.presionDiastolica=presionDiastolica;
            pacienteControles.presionSistolica=presionSistolica;
            pacienteControles.observaciones=observaciones;
            
            const repositoryPacienteControles = getRepository(PacienteControles);
            
            const results=await repositoryPacienteControles.save(pacienteControles)           
            PacienteControlesController.sendResponse(res, results, HTTP_STATUS_CODE_CREATED, true, "RegistroDosis actualizado correctamente");

        } catch (error) {
             // Se envia información sobre el error
            PacienteControlesController.sendResponse(res, null, HTTP_STATUS_CODE_BAD_REQUEST, false, error.message);
        }

    }

    static update = async (req: Request, res: Response) => {
        try {
             
            // Se obtiene el id que llega por parametro en la url
            const id: string = req.params.id;
    
            // Se obtiene instancia de la base de datos
            const repositoryPacienteControles = getRepository(PacienteControles);
            
            
            const pacienteControles = await repositoryPacienteControles.findOne(id);

            // Si no ecunetra el registro se lanza un error
            if(pacienteControles === undefined){
                let error = new DataNotFoundError();
                error.message = `Control con id ${id} no encontrado`;
                error.statusCode = HTTP_STATUS_CODE_NOT_FOUND;
                throw error;
            }
            

            let { idPaciente,idProfesionalSalud,
                fecha,hora,temperatura,peso,presionDiastolica,
                presionSistolica,observaciones} : PacienteControles = req.body;
           
            pacienteControles.idPaciente=idPaciente;
            pacienteControles.idProfesionalSalud=idProfesionalSalud;
            pacienteControles.fecha=fecha;
            pacienteControles.hora=hora;
            pacienteControles.temperatura=temperatura;
            pacienteControles.peso=peso;
            pacienteControles.presionDiastolica=presionDiastolica;
            pacienteControles.presionSistolica=presionSistolica;
            pacienteControles.observaciones=observaciones;

            const results =await repositoryPacienteControles.save(pacienteControles)        

            // Se envia resultado 
            PacienteControlesController.sendResponse(res, results, HTTP_STATUS_CODE_CREATED, true, "PacienteControles actualizado correctamente");

        } catch (error) {
             // Se envia información sobre el error
            if(error instanceof DataNotFoundError){
                PacienteControlesController.sendResponse(res, null, error.statusCode, false, error.message);
            }else{
               PacienteControlesController.sendResponse(res, null, HTTP_STATUS_CODE_BAD_REQUEST, false, error.message);
            }
        }
    }

    static sendResponse(response : Response, data: any = null, code : number = HTTP_STATUS_CODE_OK, ok : boolean = true, message : string = "OK") {
        const apiResponse = new ApiResponse(response, code, ok, message, data);
        apiResponse.sendResponse();
    }
}

export default PacienteControlesController;