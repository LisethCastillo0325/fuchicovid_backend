import { Request, Response } from "express";
import { getConnection, getRepository } from "typeorm";
import ApiResponse from '../classes/apiResponse';
import DataNotFoundError from '../classes/errors/DataNotFoundError';
import { Paciente } from '../entities/Paciente';
import { Persona } from '../entities/Persona';
import { HTTP_STATUS_CODE_BAD_REQUEST, HTTP_STATUS_CODE_CREATED, HTTP_STATUS_CODE_NOT_FOUND, HTTP_STATUS_CODE_OK } from '../global/statuscode';
import PersonaController from './PersonaController';

class PacienteController {

    static getAll = async (req: Request, res: Response) => {
        // Se obtiene instancia de la base de datos
        try {
            const repositoryPersona = await getRepository(Persona)
                .createQueryBuilder("persona")
                .innerJoinAndSelect(Paciente,'paciente',"paciente.idPersona=persona.id")
                .getRawMany();
                
            PacienteController.sendResponse(res, repositoryPersona);    
           
        } catch (error) {
            // Se envia información sobre el error
            PacienteController.sendResponse(res, null, HTTP_STATUS_CODE_BAD_REQUEST, false, error.message);
        }
    }

    static getById = async (req: Request, res: Response) => {
        // Se obtiene el id que llega por parametro en la url
        const id: string = req.params.id;
        
        try {
            // Se obtiene instancia de la base de datos
            const repositoryPersona = await getRepository(Persona)
            .createQueryBuilder("persona")
            .innerJoinAndSelect(Paciente,'paciente',"paciente.idPersona=persona.id")
            .where('persona.id = :id', {id})
            .getRawOne();

            if(repositoryPersona === undefined) {
                let error = new DataNotFoundError();
                error.message = `Paciente con id ${id} no encontrado`;
                error.statusCode = HTTP_STATUS_CODE_NOT_FOUND;
                throw error;
            } else { 
                 // Se envia datos solicitados 
                 PacienteController.sendResponse(res, repositoryPersona);
            }

        } catch (error) {
            // Se envia información sobre el error
            if(error instanceof DataNotFoundError){
                PacienteController.sendResponse(res, null, error.statusCode, false, error.message);
            }else{
                PacienteController.sendResponse(res, null, HTTP_STATUS_CODE_BAD_REQUEST, false, error.message);
            }
        }
    }

    static create = async (req: Request, res: Response) => {

        // get a connection and create a new query runner
        const queryRunner = getConnection().createQueryRunner();
        // establish real database connection using our new query runner
        await queryRunner.connect();
        // lets now open a new transaction:
        await queryRunner.startTransaction();

        try {
            // se obtiene los datos enviados por parametro
            let persona : Persona = await PersonaController.create(req, res, queryRunner);

            // Se construye objeto
            if(persona === undefined){
                throw new Error('Se presentó un error al crear el paciente.');
            }else{

                let {
                    idDoctorEncargado,
                    latitud,
                    longitud,
                    numeroIntegrantesHogar,
                    idCiudadContagio,
                    estadoEnfermedad
                } : Paciente = req.body;

                let paciente = new Paciente();
                paciente.idPersona = persona.id;
                paciente.idDoctorEncargado = idDoctorEncargado;
                paciente.latitud = latitud;
                paciente.longitud = longitud;
                paciente.numeroIntegrantesHogar = numeroIntegrantesHogar;
                paciente.idCiudadContagio = idCiudadContagio;
                paciente.estadoEnfermedad = estadoEnfermedad;
               
                // Se guarda el objeto
                const results = await queryRunner.manager.save(paciente);
                
                // commit transaction now:
                await queryRunner.commitTransaction();
                // Se envia resultado las funciones de send responde causan conflicto aqui porque ya se crea una respuesta 
                PacienteController.sendResponse(res, results, HTTP_STATUS_CODE_CREATED, true, "Paciente creado correctamente");
            }

        } 
        catch (error) {
            // since we have errors let's rollback changes we made
            await queryRunner.rollbackTransaction();
             // Se envia información sobre el error
            PacienteController.sendResponse(res, null, HTTP_STATUS_CODE_BAD_REQUEST, false, error.message);
        }
        finally {
            // you need to release query runner which is manually created:
            await queryRunner.release();
        }
    }

    static update = async (req: Request, res: Response) => {
        
        // get a connection and create a new query runner
        const queryRunner = getConnection().createQueryRunner();
        // establish real database connection using our new query runner
        await queryRunner.connect();
        // lets now open a new transaction:
        await queryRunner.startTransaction();
        
        try {
             
            // Se obtiene el id que llega por parametro en la url
            const id: string = req.params.id;

            let {
                idDoctorEncargado,
                latitud,
                longitud,
                numeroIntegrantesHogar,
                idCiudadContagio,
                estadoEnfermedad
            } : Paciente = req.body;

             // Se obtiene instancia de la base de datos
            const paciente : Paciente = await queryRunner.manager.findOne(id);
    
            // Si no ecunetra el registro se lanza un error
            if(paciente === undefined){
                let error = new DataNotFoundError();
                error.message = `Paciente con id ${id} no encontrado`;
                error.statusCode = HTTP_STATUS_CODE_NOT_FOUND;
                throw error;
            }

            paciente.idDoctorEncargado=idDoctorEncargado;
            paciente.latitud=latitud;
            paciente.longitud=longitud;
            paciente.numeroIntegrantesHogar=numeroIntegrantesHogar;
            paciente.idCiudadContagio=idCiudadContagio;
            paciente.estadoEnfermedad=estadoEnfermedad;
              
            // Se guarda el objeto
            await queryRunner.manager.save(paciente);
            
            // Actualizar datos de persona
            await PersonaController.update(req, res, queryRunner);

            // commit transaction now:
            await queryRunner.commitTransaction();

            // Se envia resultado las funciones de send responde causan conflicto aqui porque ya se crea una respuesta 
            PacienteController.sendResponse(res, paciente, HTTP_STATUS_CODE_CREATED, true, "Paciente actualizado correctamente");
            
        } 
        catch (error) {
            // since we have errors let's rollback changes we made
            await queryRunner.rollbackTransaction();

             // Se envia información sobre el error
            if(error instanceof DataNotFoundError){
                PacienteController.sendResponse(res, null, error.statusCode, false, error.message);
            }else{
               PacienteController.sendResponse(res, null, HTTP_STATUS_CODE_BAD_REQUEST, false, error.message);
            }
        } 
        finally {
            // you need to release query runner which is manually created:
            await queryRunner.release();
        }
    }

    static sendResponse(response : Response, data: any = null, code : number = HTTP_STATUS_CODE_OK, ok : boolean = true, message : string = "OK") {
        const apiResponse = new ApiResponse(response, code, ok, message, data);
        apiResponse.sendResponse();
    }
}

export default PacienteController;