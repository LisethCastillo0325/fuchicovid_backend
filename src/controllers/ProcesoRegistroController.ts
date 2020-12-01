import { Request, Response } from "express";
import { getRepository } from "typeorm";
import ApiResponse from '../classes/apiResponse';
import DataNotFoundError from '../classes/errors/DataNotFoundError';
import { ProcesoRegistros } from '../entities/ProcesoRegistros';
import { HTTP_STATUS_CODE_OK, HTTP_STATUS_CODE_BAD_REQUEST, HTTP_STATUS_CODE_NOT_FOUND, HTTP_STATUS_CODE_CREATED } from '../global/statuscode';

class ProcesoRegistrosController {

    static getAll = async (req: Request, res: Response) => {
        // Se obtiene instancia de la base de datos
        
        const repositoryProcesoRegistros = getRepository(ProcesoRegistros);
        try {
            
            const data = await repositoryProcesoRegistros.find(
                {
                    relations:["idPersonaRegistrada","idPersonaRegistrador"]
                });
            // Se envia datos solicitados 
            ProcesoRegistrosController.sendResponse(res, data);
        } catch (error) {
            // Se envia información sobre el error
            ProcesoRegistrosController.sendResponse(res, null, HTTP_STATUS_CODE_BAD_REQUEST, false, error.message);
        }
    }

    static getById = async (req: Request, res: Response) => {
        // Se obtiene el id que llega por parametro en la url

        const id: string = req.params.id;

        // Se obtiene instancia de la base de datos
        const repositoryProcesoRegistros = getRepository(ProcesoRegistros);
        try {
            
            const procesoRegistro = await repositoryProcesoRegistros.find(
            {
                relations:["idPersonaRegistrada","idPersonaRegistrador"],
                where: [{id:id}]
            });
            // Si no ecunetra el registro se lanza un error
            if(procesoRegistro === undefined){
                let error = new DataNotFoundError();
                error.message = `Registro con id ${id} no encontrado`;
                error.statusCode = HTTP_STATUS_CODE_NOT_FOUND;
                throw error;
            }
            // Se envia datos solicitados 
            ProcesoRegistrosController.sendResponse(res, procesoRegistro);

        } catch (error) {
            // Se envia información sobre el error
            if(error instanceof DataNotFoundError){
                ProcesoRegistrosController.sendResponse(res, null, error.statusCode, false, error.message);
            }else{
                ProcesoRegistrosController.sendResponse(res, null, HTTP_STATUS_CODE_BAD_REQUEST, false, error.message);
            }
        }
    }
    static getByPersonaId = async (req: Request, res: Response) => {
        // Se obtiene el id que llega por parametro en la url

        const id: string = req.params.id;

        // Se obtiene instancia de la base de datos
        const repositoryProcesoRegistros = getRepository(ProcesoRegistros);
        try {
            
            const procesoRegistro = await repositoryProcesoRegistros.find(
            {
                relations:["idPersonaRegistradda","idPersonaRegistrador"],
                where: [{idPersonaRegistrada:id},{idPersonaRegistrador:id}]
            });
            // Si no ecunetra el registro se lanza un error
            if(procesoRegistro === undefined){
                let error = new DataNotFoundError();
                error.message = `Registro con id ${id} no encontrado`;
                error.statusCode = HTTP_STATUS_CODE_NOT_FOUND;
                throw error;
            }
            // Se envia datos solicitados 
            ProcesoRegistrosController.sendResponse(res, procesoRegistro);

        } catch (error) {
            // Se envia información sobre el error
            if(error instanceof DataNotFoundError){
                ProcesoRegistrosController.sendResponse(res, null, error.statusCode, false, error.message);
            }else{
                ProcesoRegistrosController.sendResponse(res, null, HTTP_STATUS_CODE_BAD_REQUEST, false, error.message);
            }
        }
    }
    
   
    static create = async (req: Request, res: Response) => {

        try {
            console.log(req.body);
            // se obtiene los datos enviados por parametro
            let {fecha,hora,idPersonaRegistrada,idPersonaRegistrador} : ProcesoRegistros = req.body;
           
           
            // Se construye objeto
           
            let procesoRegistro = new ProcesoRegistros();
            procesoRegistro.fecha=fecha;
            procesoRegistro.hora=hora;
            procesoRegistro.idPersonaRegistrada=idPersonaRegistrada;
            procesoRegistro.idPersonaRegistrador=idPersonaRegistrador;
           
            const repositoryProcesoRegistros = getRepository(ProcesoRegistros);
            
            const results= await repositoryProcesoRegistros.save(procesoRegistro);       
            ProcesoRegistrosController.sendResponse(res, results, HTTP_STATUS_CODE_CREATED, true, "RegistroDosis actualizado correctamente");

        } catch (error) {
             // Se envia información sobre el error
            ProcesoRegistrosController.sendResponse(res, null, HTTP_STATUS_CODE_BAD_REQUEST, false, error.message);
        }

    }

    static update = async (req: Request, res: Response) => {
        try {
             
            // Se obtiene el id que llega por parametro en la url
            const id: string = req.params.id;
    
            // Se obtiene instancia de la base de datos
            const repositoryProcesoRegistros = getRepository(ProcesoRegistros);

            
            const procesoRegistro = await repositoryProcesoRegistros.findOne(id);

            // Si no ecunetra el registro se lanza un error
            if(procesoRegistro === undefined){
                let error = new DataNotFoundError();
                error.message = `Control con id ${id} no encontrado`;
                error.statusCode = HTTP_STATUS_CODE_NOT_FOUND;
                throw error;
            }
            let {fecha,hora,idPersonaRegistrada,idPersonaRegistrador} : ProcesoRegistros = req.body;
            
            procesoRegistro.fecha=fecha;
            procesoRegistro.hora=hora;
            procesoRegistro.idPersonaRegistrada=idPersonaRegistrada;
            procesoRegistro.idPersonaRegistrador=idPersonaRegistrador;
    
            const results=await repositoryProcesoRegistros.save(procesoRegistro)        

        

            // Se envia resultado 
            ProcesoRegistrosController.sendResponse(res, results, HTTP_STATUS_CODE_CREATED, true, "Proceso de Registro actualizado correctamente");

        } catch (error) {
             // Se envia información sobre el error
            if(error instanceof DataNotFoundError){
                ProcesoRegistrosController.sendResponse(res, null, error.statusCode, false, error.message);
            }else{
               ProcesoRegistrosController.sendResponse(res, null, HTTP_STATUS_CODE_BAD_REQUEST, false, error.message);
            }
        }
    }

    static sendResponse(response : Response, data: any = null, code : number = HTTP_STATUS_CODE_OK, ok : boolean = true, message : string = "OK") {
        const apiResponse = new ApiResponse(response, code, ok, message, data);
        apiResponse.sendResponse();
    }
}

export default ProcesoRegistrosController;