import { Request, Response } from "express";
import { getConnection, getRepository, Like } from 'typeorm';
import ApiResponse from '../classes/apiResponse';
import DataNotFoundError from '../classes/errors/DataNotFoundError';
import PaginateData from '../classes/PaginateData';
import { Persona } from '../entities/Persona';
import { ProfesionalSalud } from '../entities/ProfesionalSalud';
import { HTTP_STATUS_CODE_BAD_REQUEST, HTTP_STATUS_CODE_CREATED, HTTP_STATUS_CODE_NOT_FOUND, HTTP_STATUS_CODE_OK } from '../global/statuscode';
import PersonaController from './PersonaController';
class ProfesionalSaludController {

    static getAll = async (req: Request, res: Response) => {
        // Se obtiene instancia de la base de datos
        
        try {
            const repositoryPersona = getRepository(Persona);
            repositoryPersona.createQueryBuilder("persona").innerJoinAndSelect(ProfesionalSalud,'profesional',"profesional.idPersona=persona.id")
            .getRawMany().then(function(value){
            ProfesionalSaludController.sendResponse(res, value);
            });    

        } catch (error) {
            // Se envia información sobre el error
            ProfesionalSaludController.sendResponse(res, null, HTTP_STATUS_CODE_BAD_REQUEST, false, error.message);
        }
    }

    static getById = async (req: Request, res: Response) => {
        // Se obtiene el id que llega por parametro en la url
        const id: string = req.params.id;

        // Se obtiene instancia de la base de datos
        const repositoryPersona = getRepository(Persona);
        try {
            
             await repositoryPersona.createQueryBuilder("persona").innerJoinAndSelect(ProfesionalSalud,'profesional',"profesional.idPersona=persona.id")
            .where(`persona.id = ${id}`).getRawOne()
            .then(function(value)
            {
                if(value!=undefined)
                {
                    
                        ProfesionalSaludController.sendResponse(res, value);
                }
                
                else 
                { 
                    let error = new DataNotFoundError();
                    error.message = `Profesional de salud con id ${id} no encontrado`;
                    error.statusCode = HTTP_STATUS_CODE_NOT_FOUND;
                    throw error;
                }
            });

        } catch (error) {
            // Se envia información sobre el error
            if(error instanceof DataNotFoundError){
                ProfesionalSaludController.sendResponse(res, null, error.statusCode, false, error.message);
            }else{
                ProfesionalSaludController.sendResponse(res, null, HTTP_STATUS_CODE_BAD_REQUEST, false, error.message);
            }
        }
    }

    static create = async (req: Request, res: Response) => {

        try {
            console.log(req.body);
            // se obtiene los datos enviados por parametro
            let { nombre,numeroIdentificacion,idTipoIdentificacion,fechaNacimiento } : Persona = req.body;
            let{idEps,idUniversidad} : ProfesionalSalud=req.body;
           
            // Se construye objeto
           
            let persona = new Persona();
            persona.nombre = nombre;
            persona.numeroIdentificacion=numeroIdentificacion;
            persona.idTipoIdentificacion=idTipoIdentificacion;
            persona.fechaNacimiento=fechaNacimiento;
            const repositoryPersona = getRepository(Persona);
            
            await repositoryPersona.save(persona)           
            .then(function()
            {
             const repositoryCiudad = getRepository(Persona);
             repositoryCiudad.createQueryBuilder("persona")
            .where(`persona.numero_identificacion = '${numeroIdentificacion}'`).getRawOne()
            .then(function(value){
            
                let profesionalSalud = new ProfesionalSalud();
                profesionalSalud.idPersona = value["persona_id"];
                profesionalSalud.idEps=idEps;
                profesionalSalud.idUniversidad=idUniversidad;
                profesionalSalud.idPersona2=value["persona_id"];
                    // Se obtiene instancia de la base de datos
                const repositoryProfesionalSalud = getRepository(ProfesionalSalud);
                    // Se guarda el objeto
                const results = repositoryProfesionalSalud.save(profesionalSalud);
                // Se envia resultado las funciones de send responde causan conflicto aqui porque ya se crea una respuesta 
                ProfesionalSaludController.sendResponse(res, results, HTTP_STATUS_CODE_CREATED, true, "Profesional de Salud creado correctamente");
            })});
            
            

        } catch (error) {
             // Se envia información sobre el error
            ProfesionalSaludController.sendResponse(res, null, HTTP_STATUS_CODE_BAD_REQUEST, false, error.message);
        }

    }
    static getAllPaginated = async (req: Request, res: Response) => {
        ///console.log('getAllPaginated ->  body: ', req.body);
        try {
            const where = ProfesionalSaludController.getWhere(req);
            if (Object.keys(where).length ===0)
            {
                const data = await PaginateData.paginator(req, ProfesionalSalud, {
                    where,  
                    relations: ['idPersona2','idPersona2.idTipoIdentificacion','idEps','idUniversidad'],
                    // order: {
                    //     nombre: "ASC" 
                    // }
                });
                ProfesionalSaludController.sendResponse(res, data);
            }
        } catch (error) {
            ProfesionalSaludController.sendResponse(res, null, HTTP_STATUS_CODE_BAD_REQUEST, false, error.message);
        }
    }

    private static getWhere (req: Request) {
        let where: any = {};
        if(req.body.filters !== undefined){
            if(req.body.filters.nombre !== null && req.body.filters.nombre !== ''){
                let nombre : string = req.body.filters.nombre;
                console.log('where nombre: ', nombre);
                where.nombre = Like("%"+ nombre.toUpperCase() +"%");
            }
            if(req.body.filters.estado !== null && req.body.filters.estado !== ''){
                let estado : string = req.body.filters.estado;
                console.log('where estado: ', estado);
                where.estado = estado.toUpperCase();
            }
        }
        return where;
    }

    static inactivateAndActivate = async (req: Request, res: Response) => {
        try {
             
            // Se obtiene el id que llega por parametro en la url
            const id: string = req.params.id;
            console.log("cosas que hace",req.body);
            // se obtiene los datos enviados por parametro
            let { estado } : Persona = req.body.idPersona2;

            // Se obtiene instancia de la base de datos
            const repositoryPersona = getRepository(Persona);

            // se obtiene el tipo de identificación por el id
            const persona = await repositoryPersona.findOne(id);
          
            // Si no ecunetra el registro se lanza un error
            if(persona === undefined){
                let error = new DataNotFoundError();
                error.message = `Persona con id ${id} no encontrado`;
                error.statusCode = HTTP_STATUS_CODE_NOT_FOUND;
                throw error;
            }
            // se actualiza los datos del tipo de identificación
            persona.estado = estado.toUpperCase();

            // Se actualiza el objeto
            const results = repositoryPersona.save(persona);

            // Se envia resultado 
            PersonaController.sendResponse(res, results, HTTP_STATUS_CODE_CREATED, true, `Persona ${estado.toUpperCase()} correctamente`);

        } catch (error) {
             // Se envia información sobre el error
            if(error instanceof DataNotFoundError){
                PersonaController.sendResponse(res, null, error.statusCode, false, error.message);
            }else{
                PersonaController.sendResponse(res, null, HTTP_STATUS_CODE_BAD_REQUEST, false, error.message);
            }
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
    
            // Se obtiene instancia de la base de datos

            const profesionalSalud : ProfesionalSalud = await queryRunner.manager.findOne(ProfesionalSalud, id);

            // Si no ecunetra el registro se lanza un error
            if(profesionalSalud === undefined){
                let error = new DataNotFoundError();
                error.message = `Profesional de Salud con id ${id} no encontrado`;
                error.statusCode = HTTP_STATUS_CODE_NOT_FOUND;
                throw error;
            }
            let{idEps,idUniversidad} : ProfesionalSalud=req.body;
            profesionalSalud.idEps=idEps;
            profesionalSalud.idUniversidad=idUniversidad;
            await queryRunner.manager.save(profesionalSalud);
            await PersonaController.update(req,res, queryRunner);
            // commit transaction now:
            await queryRunner.commitTransaction();
            await queryRunner.release();

            // Se envia resultado 
            ProfesionalSaludController.sendResponse(res, null, HTTP_STATUS_CODE_CREATED, true, "ProfesionalSalud actualizado correctamente");

        } catch (error) {
            // since we have errors let's rollback changes we made
            await queryRunner.rollbackTransaction();
             // Se envia información sobre el error
            if(error instanceof DataNotFoundError){
                ProfesionalSaludController.sendResponse(res, null, error.statusCode, false, error.message);
            }else{
                ProfesionalSaludController.sendResponse(res, null, HTTP_STATUS_CODE_BAD_REQUEST, false, error.message);
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

export default ProfesionalSaludController;