import { Request, Response } from "express";
import { getRepository } from "typeorm";
import ApiResponse from '../classes/apiResponse';
import DataNotFoundError from '../classes/errors/DataNotFoundError';
import { Laboratorio } from '../entities/Laboratorio';
import { TelefonoLaboratorio } from '../entities/TelefonoLaboratorio';
import { TipoTelefono } from '../entities/TipoTelefono';
import { HTTP_STATUS_CODE_BAD_REQUEST, HTTP_STATUS_CODE_CREATED, HTTP_STATUS_CODE_NOT_FOUND, HTTP_STATUS_CODE_OK } from '../global/statuscode';

class TelefonoLaboratorioController {

    static getAll = async (req: Request, res: Response) => {
        // Se obtiene instancia de la base de datos
        const repositoryTelefonoLaboratorio = getRepository(TelefonoLaboratorio);
        try {
            
            const data = await repositoryTelefonoLaboratorio.find();
            // Se envia datos solicitados 
            TelefonoLaboratorioController.sendResponse(res, data);
        } catch (error) {
            // Se envia información sobre el error
            TelefonoLaboratorioController.sendResponse(res, null, HTTP_STATUS_CODE_BAD_REQUEST, false, error.message);
        }
    }

    static getById = async (req: Request, res: Response) => {
        // Se obtiene el id que llega por parametro en la url
        const id: string = req.params.id;

        // Se obtiene instancia de la base de datos
        const repositoryTelefonoLaboratorio = getRepository(TelefonoLaboratorio);
        try {
            
            const telefonoLaboratorio = await repositoryTelefonoLaboratorio.findOne(id);
            // Si no ecunetra el registro se lanza un error
            if(telefonoLaboratorio === undefined){
                let error = new DataNotFoundError();
                error.message = `Telefono de laboratorio con id ${id} no encontrado`;
                error.statusCode = HTTP_STATUS_CODE_NOT_FOUND;
                throw error;
            }
            // Se envia datos solicitados 
            TelefonoLaboratorioController.sendResponse(res, telefonoLaboratorio);

        } catch (error) {
            // Se envia información sobre el error
            if(error instanceof DataNotFoundError){
                TelefonoLaboratorioController.sendResponse(res, null, error.statusCode, false, error.message);
            }else{
                TelefonoLaboratorioController.sendResponse(res, null, HTTP_STATUS_CODE_BAD_REQUEST, false, error.message);
            }
        }
    }

    static create = async (req: Request, res: Response) => {

        try {
            console.log(req.body);
            // se obtiene los datos enviados por parametro
            let { telefono } : TelefonoLaboratorio = req.body;
            let {tipoTel,laboratorio}=req.body;
            const repositoryLaboratorio = getRepository(Laboratorio);
            const repositoryTipoTel = getRepository(TipoTelefono);

            const idLab= await repositoryLaboratorio.createQueryBuilder("laboratorio")
            .where(`laboratorio.nombre ilike '${laboratorio}'`).getRawOne();
            const idTipoTel= await repositoryTipoTel.createQueryBuilder("tipoTel")
            .where(`tipoTel.nombre ilike '${tipoTel}'`).getRawOne();
           
            // Se construye objeto
           
            let telefonoLaboratorio = new TelefonoLaboratorio();
            telefonoLaboratorio.telefono = telefono;
            telefonoLaboratorio.idLaboratorio=idLab["laboratorio_id"];
            telefonoLaboratorio.idTipoTelefono=idTipoTel["tipoTel_id"];

            // Se obtiene instancia de la base de datos
            const repositoryTelefonoLaboratorio = getRepository(TelefonoLaboratorio);
            // Se guarda el objeto
            const results = repositoryTelefonoLaboratorio.save(telefonoLaboratorio);
            // Se envia resultado 
            TelefonoLaboratorioController.sendResponse(res, results, HTTP_STATUS_CODE_CREATED, true, "telefono de laboratorio creado correctamente");

        } catch (error) {
             // Se envia información sobre el error
            TelefonoLaboratorioController.sendResponse(res, null, HTTP_STATUS_CODE_BAD_REQUEST, false, error.message);
        }

    }

    static update = async (req: Request, res: Response) => {
        try {
             
            // Se obtiene el id que llega por parametro en la url
            const id: string = req.params.id;

            // se obtiene los datos enviados por parametro
            let { telefono } : TelefonoLaboratorio = req.body;
            let {tipoTel,laboratorio}=req.body;
            // Se obtiene instancia de la base de datos
            const repositoryTelefonoLaboratorio = getRepository(TelefonoLaboratorio);

            
            const telefonoLaboratorio = await repositoryTelefonoLaboratorio.findOne(id);

            // Si no ecunetra el registro se lanza un error
            if(telefonoLaboratorio === undefined){
                let error = new DataNotFoundError();
                error.message = `Telefono de laboratorio con id ${id} no encontrado`;
                error.statusCode = HTTP_STATUS_CODE_NOT_FOUND;
                throw error;
            }

            
            const repositoryLaboratorio = getRepository(Laboratorio);
            const repositoryTipoTel = getRepository(TipoTelefono);

            const idLab= await repositoryLaboratorio.createQueryBuilder("laboratorio")
            .where(`laboratorio.nombre ilike '${laboratorio}'`).getRawOne();
            const idTipoTel= await repositoryTipoTel.createQueryBuilder("tipoTel")
            .where(`tipoTel.nombre ilike '${tipoTel}'`).getRawOne();
           
            // Se construye objeto
            
            telefonoLaboratorio.telefono = telefono;
            telefonoLaboratorio.idLaboratorio=idLab["laboratorio_id"];
            telefonoLaboratorio.idTipoTelefono=idTipoTel["tipoTel_id"];

            // Se actualiza el objeto
            const results = repositoryTelefonoLaboratorio.save(telefonoLaboratorio);

            // Se envia resultado 
            TelefonoLaboratorioController.sendResponse(res, results, HTTP_STATUS_CODE_CREATED, true, "telefono actualizado correctamente");

        } catch (error) {
             // Se envia información sobre el error
            if(error instanceof DataNotFoundError){
                TelefonoLaboratorioController.sendResponse(res, null, error.statusCode, false, error.message);
            }else{
                TelefonoLaboratorioController.sendResponse(res, null, HTTP_STATUS_CODE_BAD_REQUEST, false, error.message);
            }
        }
    }

    static sendResponse(response : Response, data: any = null, code : number = HTTP_STATUS_CODE_OK, ok : boolean = true, message : string = "OK") {
        const apiResponse = new ApiResponse(response, code, ok, message, data);
        apiResponse.sendResponse();
    }
}

export default TelefonoLaboratorioController;