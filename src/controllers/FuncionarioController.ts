import { Request, Response } from "express";
import { getRepository } from "typeorm";
import ApiResponse from '../classes/apiResponse';
import DataNotFoundError from '../classes/errors/DataNotFoundError';
import { Funcionario } from '../entities/Funcionario';
import { Persona } from '../entities/Persona';
import { HTTP_STATUS_CODE_BAD_REQUEST, HTTP_STATUS_CODE_CREATED, HTTP_STATUS_CODE_NOT_FOUND, HTTP_STATUS_CODE_OK } from '../global/statuscode';
import PersonaController from './PersonaController';

class FuncionarioController {

    static getAll = async (req: Request, res: Response) => {
          
        try {
            const repositoryPersona = getRepository(Persona);
            repositoryPersona.createQueryBuilder("persona").innerJoinAndSelect(Funcionario,'funcionario',"funcionario.idPersona=persona.id")
            .getRawMany().then(function(value){
            FuncionarioController.sendResponse(res, value);
            });    
           
        } catch (error) {
            // Se envia información sobre el error
            FuncionarioController.sendResponse(res, null, HTTP_STATUS_CODE_BAD_REQUEST, false, error.message);
        }
    }

    static getById = async (req: Request, res: Response) => {
        // Se obtiene el id que llega por parametro en la url
        const id: string = req.params.id;

        // Se obtiene instancia de la base de datos
        const repositoryPersona = getRepository(Persona);
        try {
            
            await repositoryPersona.createQueryBuilder("persona").innerJoinAndSelect(Funcionario,'funcionario',"funcionario.idPersona=persona.id")
            .where(`persona.id = ${id}`).getRawOne()
            .then(function(value)
            {
                if(value!=undefined)
                {
                

                    FuncionarioController.sendResponse(res, value);
                    
                }
                else
                {
                    let error = new DataNotFoundError();
                    error.message = `Integrante de hogar con id ${id} no encontrado`;
                    error.statusCode = HTTP_STATUS_CODE_NOT_FOUND;
                    throw error;
                }
            
            });

        } catch (error) {
            // Se envia información sobre el error
            if(error instanceof DataNotFoundError){
                FuncionarioController.sendResponse(res, null, error.statusCode, false, error.message);
            }else{
                FuncionarioController.sendResponse(res, null, HTTP_STATUS_CODE_BAD_REQUEST, false, error.message);
            }
        }
    }

    static create = async (req: Request, res: Response) => {

        try {
            console.log(req.body);
            // se obtiene los datos enviados por parametro
            let { nombre,numeroIdentificacion,idTipoIdentificacion } : Persona = req.body;

           
            // Se construye objeto
           
            let persona = new Persona();
            persona.nombre = nombre;
            persona.numeroIdentificacion=numeroIdentificacion;
            persona.idTipoIdentificacion=idTipoIdentificacion;
            const repositoryPersona = getRepository(Persona);
            
            await repositoryPersona.save(persona)           
            .then(function()
            {
             const repositoryCiudad = getRepository(Persona);
             repositoryCiudad.createQueryBuilder("persona")
            .where(`persona.numero_identificacion = '${numeroIdentificacion}'`).getRawOne()
            .then(function(value){
            
                let funcionario = new Funcionario();
                funcionario.idPersona = value["persona_id"];
                    // Se obtiene instancia de la base de datos
                const repositoryFuncionario = getRepository(Funcionario);
                    // Se guarda el objeto
                const results = repositoryFuncionario.save(funcionario);
                // Se envia resultado las funciones de send responde causan conflicto aqui porque ya se crea una respuesta 
                FuncionarioController.sendResponse(res, results, HTTP_STATUS_CODE_CREATED, true, "Funcionario creado correctamente");
            })});
            
            

        } catch (error) {
             // Se envia información sobre el error
            FuncionarioController.sendResponse(res, null, HTTP_STATUS_CODE_BAD_REQUEST, false, error.message);
        }

    }

    static update = async (req: Request, res: Response) => {
        try {
             
            // Se obtiene el id que llega por parametro en la url
            const id: string = req.params.id;
    
            // Se obtiene instancia de la base de datos
            const repositoryFuncionario = getRepository(Persona);

            
            const funcionario = await repositoryFuncionario.findOne(id);

            // Si no ecunetra el registro se lanza un error
            if(funcionario === undefined){
                let error = new DataNotFoundError();
                error.message = `Funcionario con id ${id} no encontrado`;
                error.statusCode = HTTP_STATUS_CODE_NOT_FOUND;
                throw error;
            }

            PersonaController.update(req,res);

            // Se actualiza el objeto
            //const results = repositoryFuncionario.save(funcionario);

            // Se envia resultado 
            //FuncionarioController.sendResponse(res, results, HTTP_STATUS_CODE_CREATED, true, "Funcionario actualizado correctamente");

        } catch (error) {
             // Se envia información sobre el error
            if(error instanceof DataNotFoundError){
                //FuncionarioController.sendResponse(res, null, error.statusCode, false, error.message);
            }else{
               // FuncionarioController.sendResponse(res, null, HTTP_STATUS_CODE_BAD_REQUEST, false, error.message);
            }
        }
    }

    static sendResponse(response : Response, data: any = null, code : number = HTTP_STATUS_CODE_OK, ok : boolean = true, message : string = "OK") {
        const apiResponse = new ApiResponse(response, code, ok, message, data);
        apiResponse.sendResponse();
    }
}

export default FuncionarioController;