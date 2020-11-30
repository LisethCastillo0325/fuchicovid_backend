import { Request, Response } from "express";
import { getRepository } from "typeorm";
import ApiResponse from '../classes/apiResponse';
import DataNotFoundError from '../classes/errors/DataNotFoundError';
import { Paciente } from '../entities/Paciente';
import { Persona } from '../entities/Persona';
import { HTTP_STATUS_CODE_BAD_REQUEST, HTTP_STATUS_CODE_CREATED, HTTP_STATUS_CODE_NOT_FOUND, HTTP_STATUS_CODE_OK } from '../global/statuscode';
import PersonaController from './PersonaController';

class PacienteController {

    static getAll = async (req: Request, res: Response) => {
        // Se obtiene instancia de la base de datos
        const repositoryPaciente = getRepository(Paciente);
        try {
            
            const data = await repositoryPaciente.find({
                relations:["idCiudadContagio"]
               });
            var ids=[];
          
            if(data.length>0 )
            {
                data.forEach(function(value){ids.push(value["idPersona"]) })
                var strIds="(".concat(ids.join()).concat(")");
                const repositoryPersona = getRepository(Persona);

                //trae los datos de las personas que son integrantes
                repositoryPersona.createQueryBuilder("persona")
                .where(`persona.id in ${strIds}`).getRawMany()
                .then(function(value){ 
                    value.forEach((val,index)=>
                    {
                       for(var i=1;i<Object.keys(data[index]).length;i++)
                       {
                           for(var key in data[index])
                           {
                               
                               if(key.localeCompare("idPersona")!=0)
                                val[key]=data[index][key];
                           }
                       }
                    }) 
                    PacienteController.sendResponse(res, value);
                })
            }
            else PacienteController.sendResponse(res, data);
           
        } catch (error) {
            // Se envia información sobre el error
            PacienteController.sendResponse(res, null, HTTP_STATUS_CODE_BAD_REQUEST, false, error.message);
        }
    }

    static getById = async (req: Request, res: Response) => {
        // Se obtiene el id que llega por parametro en la url
        const id: string = req.params.id;

        // Se obtiene instancia de la base de datos
        const repositoryPaciente = getRepository(Paciente);
        try {
            
             await repositoryPaciente.findOne({ where: {idPersona: id}, relations: ["idCiudadContagio"]})
            .then(function(value)
            {
                if(value!=undefined)
                {
                    const repositoryPersona = getRepository(Persona);
                    
                    repositoryPersona.createQueryBuilder("persona")
                    .where(`persona.id = ${value["idPersona"]}`).getRawOne()
                    .then(function(respuesta){
                        for(var key in value)
                        {
                            if(key.localeCompare("idPersona")!=0)
                            respuesta[key]=value[key];
                        }
                        // Se envia datos solicitados 
                        PacienteController.sendResponse(res, respuesta);
                    });
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
                PacienteController.sendResponse(res, null, error.statusCode, false, error.message);
            }else{
                PacienteController.sendResponse(res, null, HTTP_STATUS_CODE_BAD_REQUEST, false, error.message);
            }
        }
    }

    static create = async (req: Request, res: Response) => {

        try {
            console.log(req.body);
            // se obtiene los datos enviados por parametro
            let { nombre,numeroIdentificacion,idTipoIdentificacion } : Persona = req.body;
            let{idDoctorEncargado,latitud,longitud,numeroIntegrantesHogar,idCiudadContagio,estadoEnfermedad} : Paciente=req.body;
           
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
            
                let paciente = new Paciente();
                paciente.idPersona = value["persona_id"];
                paciente.idDoctorEncargado=idDoctorEncargado;
                paciente.latitud=latitud;
                paciente.longitud=longitud;
                paciente.numeroIntegrantesHogar=numeroIntegrantesHogar;
                paciente.idCiudadContagio=idCiudadContagio;
                paciente.estadoEnfermedad=estadoEnfermedad;
                    // Se obtiene instancia de la base de datos
                const repositoryPaciente = getRepository(Paciente);
                    // Se guarda el objeto
                const results = repositoryPaciente.save(paciente);
                // Se envia resultado las funciones de send responde causan conflicto aqui porque ya se crea una respuesta 
                PacienteController.sendResponse(res, results, HTTP_STATUS_CODE_CREATED, true, "Paciente creado correctamente");
            })});
            
            

        } catch (error) {
             // Se envia información sobre el error
            PacienteController.sendResponse(res, null, HTTP_STATUS_CODE_BAD_REQUEST, false, error.message);
        }

    }

    static update = async (req: Request, res: Response) => {
        try {
             
            // Se obtiene el id que llega por parametro en la url
            const id: string = req.params.id;
    
            // Se obtiene instancia de la base de datos
            const repositoryPersona= getRepository(Persona);

            
            const persona = await repositoryPersona.findOne(id);

            // Si no ecunetra el registro se lanza un error
            if(persona === undefined){
                let error = new DataNotFoundError();
                error.message = `Paciente con id ${id} no encontrado`;
                error.statusCode = HTTP_STATUS_CODE_NOT_FOUND;
                throw error;
            }

            PersonaController.update(req,res);
            const repositoryPaciente = getRepository(Paciente);
            const paciente = await repositoryPaciente.findOne(id);
            let{idDoctorEncargado,latitud,longitud,numeroIntegrantesHogar,idCiudadContagio,estadoEnfermedad} : Paciente=req.body;
            paciente.idDoctorEncargado=idDoctorEncargado;
            paciente.latitud=latitud;
            paciente.longitud=longitud;
            paciente.numeroIntegrantesHogar=numeroIntegrantesHogar;
            paciente.idCiudadContagio=idCiudadContagio;
            paciente.estadoEnfermedad=estadoEnfermedad;
              
                    // Se guarda el objeto
            const results = repositoryPaciente.save(paciente);
            // Se actualiza el objeto
            //const results = repositoryPaciente.save(paciente);

            // Se envia resultado 
            //PacienteController.sendResponse(res, results, HTTP_STATUS_CODE_CREATED, true, "Paciente actualizado correctamente");

        } catch (error) {
             // Se envia información sobre el error
            if(error instanceof DataNotFoundError){
                //PacienteController.sendResponse(res, null, error.statusCode, false, error.message);
            }else{
               // PacienteController.sendResponse(res, null, HTTP_STATUS_CODE_BAD_REQUEST, false, error.message);
            }
        }
    }

    static sendResponse(response : Response, data: any = null, code : number = HTTP_STATUS_CODE_OK, ok : boolean = true, message : string = "OK") {
        const apiResponse = new ApiResponse(response, code, ok, message, data);
        apiResponse.sendResponse();
    }
}

export default PacienteController;