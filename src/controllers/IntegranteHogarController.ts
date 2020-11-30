import { Request, Response } from "express";
import { getRepository } from "typeorm";
import ApiResponse from '../classes/apiResponse';
import DataNotFoundError from '../classes/errors/DataNotFoundError';
import { IntegranteHogar } from '../entities/IntegranteHogar';
import { Persona } from '../entities/Persona';
import { HTTP_STATUS_CODE_BAD_REQUEST, HTTP_STATUS_CODE_CREATED, HTTP_STATUS_CODE_NOT_FOUND, HTTP_STATUS_CODE_OK } from '../global/statuscode';
import PersonaController from './PersonaController';

class IntegranteHogarController {

    static getAll = async (req: Request, res: Response) => {
        // Se obtiene instancia de la base de datos
        const repositoryIntegranteHogar = getRepository(IntegranteHogar);
        try {
            
            var data = await repositoryIntegranteHogar.find()
            // .then(function(value)
            //{console.log(value);});
            var ids=[];
            if(data.length>0 )
            {
                data.forEach(function(value){ids.push(value["idPersona"]) })
                var strIds="(".concat(ids.join()).concat(")");
                const repositoryPersona = getRepository(Persona);

                //trae los datos de las personas que son integrantes
                repositoryPersona.createQueryBuilder("persona")
                .where(`persona.id in ${strIds}`).getRawMany()
                .then(function(value){  IntegranteHogarController.sendResponse(res, value);})

            }
            else IntegranteHogarController.sendResponse(res,data);
            // Se envia datos solicitados 
          
        } catch (error) {
            // Se envia información sobre el error
            IntegranteHogarController.sendResponse(res, null, HTTP_STATUS_CODE_BAD_REQUEST, false, error.message);
        }
    }

    static getById = async (req: Request, res: Response) => {
        // Se obtiene el id que llega por parametro en la url
        const id: string = req.params.id;

        // Se obtiene instancia de la base de datos
        const repositoryIntegranteHogar = getRepository(IntegranteHogar);
        try {
            
            await repositoryIntegranteHogar.findOne(id)
            .then(function(value)
            {
                if(value!=undefined)
                {
                const repositoryPersona = getRepository(Persona);
                //trae los datos de las personas que son integrantes
                repositoryPersona.createQueryBuilder("persona")
                .where(`persona.id = ${value["idPersona"]}`).getRawOne()
                .then(function(value){
                    // Se envia datos solicitados 
                    IntegranteHogarController.sendResponse(res, value);
                });
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
                IntegranteHogarController.sendResponse(res, null, error.statusCode, false, error.message);
            }else{
                IntegranteHogarController.sendResponse(res, null, HTTP_STATUS_CODE_BAD_REQUEST, false, error.message);
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
             const repositoryPersona = getRepository(Persona);
             repositoryPersona.createQueryBuilder("persona")
            .where(`persona.numero_identificacion = '${numeroIdentificacion}'`).getRawOne()
            .then(function(value){
            
                let integranteHogar = new IntegranteHogar();
                integranteHogar.idPersona = value["persona_id"];
                    // Se obtiene instancia de la base de datos
                const repositoryIntegranteHogar = getRepository(IntegranteHogar);
                    // Se guarda el objeto
                const results = repositoryIntegranteHogar.save(integranteHogar);
                // Se envia resultado las funciones de send responde causan conflicto aqui porque ya se crea una respuesta 
                IntegranteHogarController.sendResponse(res, results, HTTP_STATUS_CODE_CREATED, true, "Integrante de hogar creado correctamente");
            })});
            
            
             
        } catch (error) {
             // Se envia información sobre el error
            IntegranteHogarController.sendResponse(res, null, HTTP_STATUS_CODE_BAD_REQUEST, false, error.message);
        }

    }

    static update = async (req: Request, res: Response) => {
        try {
             
            // Se obtiene el id que llega por parametro en la url
            const id: string = req.params.id;
    
            // Se obtiene instancia de la base de datos
            const repositoryIntegranteHogar = getRepository(Persona);

            
            const integranteHogar = await repositoryIntegranteHogar.findOne(id);

            // Si no ecunetra el registro se lanza un error
            if(integranteHogar === undefined){
                let error = new DataNotFoundError();
                error.message = `Integrante de hogar con id ${id} no encontrado`;
                error.statusCode = HTTP_STATUS_CODE_NOT_FOUND;
                throw error;
            }

            PersonaController.update(req,res);

            // Se actualiza el objeto
            //const results = repositoryIntegranteHogar.save(integranteHogar);

            // Se envia resultado 
            //IntegranteHogarController.sendResponse(res, results, HTTP_STATUS_CODE_CREATED, true, "IntegranteHogar actualizado correctamente");

        } catch (error) {
             // Se envia información sobre el error
            if(error instanceof DataNotFoundError){
                //IntegranteHogarController.sendResponse(res, null, error.statusCode, false, error.message);
            }else{
               // IntegranteHogarController.sendResponse(res, null, HTTP_STATUS_CODE_BAD_REQUEST, false, error.message);
            }
        }
    }

    static sendResponse(response : Response, data: any = null, code : number = HTTP_STATUS_CODE_OK, ok : boolean = true, message : string = "OK") {
        const apiResponse = new ApiResponse(response, code, ok, message, data);
        apiResponse.sendResponse();
    }
}

export default IntegranteHogarController;