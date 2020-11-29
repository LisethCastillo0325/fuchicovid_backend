import { Request, Response } from "express";
import { getRepository } from "typeorm";
import ApiResponse from '../classes/apiResponse';
import DataNotFoundError from '../classes/errors/DataNotFoundError';
import { Ciudad } from '../entities/Ciudad';
import { Laboratorio } from '../entities/Laboratorio';
import { HTTP_STATUS_CODE_BAD_REQUEST, HTTP_STATUS_CODE_CREATED, HTTP_STATUS_CODE_NOT_FOUND, HTTP_STATUS_CODE_OK } from '../global/statuscode';

class LaboratorioController {

    static getAll = async (req: Request, res: Response) => {
        // Se obtiene instancia de la base de datos
        const repositoryLaboratorio = getRepository(Laboratorio);
        try {
            
            const data = await repositoryLaboratorio.find();
            // Se envia datos solicitados 
            LaboratorioController.sendResponse(res, data);
        } catch (error) {
            // Se envia información sobre el error
            LaboratorioController.sendResponse(res, null, HTTP_STATUS_CODE_BAD_REQUEST, false, error.message);
        }
    }

    static getById = async (req: Request, res: Response) => {
        // Se obtiene el id que llega por parametro en la url
        const id: string = req.params.id;

        // Se obtiene instancia de la base de datos
        const repositoryLaboratorio = getRepository(Laboratorio);
        try {
            
            const laboratorio = await repositoryLaboratorio.findOne(id);
            // Si no ecunetra el registro se lanza un error
            if(laboratorio === undefined){
                let error = new DataNotFoundError();
                error.message = `Laboratorio con id ${id} no encontrado`;
                error.statusCode = HTTP_STATUS_CODE_NOT_FOUND;
                throw error;
            }
            // Se envia datos solicitados 
            LaboratorioController.sendResponse(res, laboratorio);

        } catch (error) {
            // Se envia información sobre el error
            if(error instanceof DataNotFoundError){
                LaboratorioController.sendResponse(res, null, error.statusCode, false, error.message);
            }else{
                LaboratorioController.sendResponse(res, null, HTTP_STATUS_CODE_BAD_REQUEST, false, error.message);
            }
        }
    }

    static create = async (req: Request, res: Response) => {

        try {
            console.log(req.body);
            // se obtiene los datos enviados por parametro
            let { nombre,direccion } : Laboratorio = req.body;
            let {nombre_ciudad}=req.body; //nombre de la ciudad recibido en el json
            const repositoryCiudad = getRepository(Ciudad);
            
            //Query para encontra el id de la ciudad usando el nombre de la ciudad que se recibe en el json
            const idCiudad= await repositoryCiudad.createQueryBuilder("ciudad")
            .where(`ciudad.nombre ilike '${nombre_ciudad}'`).getRawOne();
          
            // Se construye objeto
            let laboratorio = new Laboratorio();
            laboratorio.nombre = nombre.toUpperCase();
            laboratorio.direccion=direccion.toUpperCase();
            laboratorio.idCiudad=idCiudad["ciudad_id"];

            // Se obtiene instancia de la base de datos
            const repositoryLaboratorio = getRepository(Laboratorio);
            // Se guarda el objeto
            const results = repositoryLaboratorio.save(laboratorio);
            // Se envia resultado 
            LaboratorioController.sendResponse(res, results, HTTP_STATUS_CODE_CREATED, true, "Laboratorio creado correctamente");

        } catch (error) {
             // Se envia información sobre el error
            LaboratorioController.sendResponse(res, null, HTTP_STATUS_CODE_BAD_REQUEST, false, error.message);
        }

    }

    static update = async (req: Request, res: Response) => {
        try {
             
            // Se obtiene el id que llega por parametro en la url
            const id: string = req.params.id;

            let { nombre,direccion } : Laboratorio = req.body;
            let {nombre_ciudad}=req.body; //nombre de la ciudad recibido en el json
            const repositoryCiudad = getRepository(Ciudad);
            
            //Query para encontra el id de la ciudad usando el nombre de la ciudad que se recibe en el json
            const idCiudad= await repositoryCiudad.createQueryBuilder("ciudad")
            .where(`ciudad.nombre ilike '${nombre_ciudad}'`).getRawOne();
          
            // Se obtiene instancia de la base de datos
            const repositoryLaboratorio = getRepository(Laboratorio);

            
            const laboratorio = await repositoryLaboratorio.findOne(id);

            // Si no ecunetra el registro se lanza un error
            if(laboratorio === undefined){
                let error = new DataNotFoundError();
                error.message = `Laboratorio con id ${id} no encontrado`;
                error.statusCode = HTTP_STATUS_CODE_NOT_FOUND;
                throw error;
            }

            
            laboratorio.nombre = nombre.toUpperCase();
            laboratorio.direccion=direccion.toUpperCase();
            laboratorio.idCiudad=idCiudad["ciudad_id"];

            // Se actualiza el objeto
            const results = repositoryLaboratorio.save(laboratorio);

            // Se envia resultado 
            LaboratorioController.sendResponse(res, results, HTTP_STATUS_CODE_CREATED, true, "Laboratorio actualizada correctamente");

        } catch (error) {
             // Se envia información sobre el error
            if(error instanceof DataNotFoundError){
                LaboratorioController.sendResponse(res, null, error.statusCode, false, error.message);
            }else{
                LaboratorioController.sendResponse(res, null, HTTP_STATUS_CODE_BAD_REQUEST, false, error.message);
            }
        }
    }

    static sendResponse(response : Response, data: any = null, code : number = HTTP_STATUS_CODE_OK, ok : boolean = true, message : string = "OK") {
        const apiResponse = new ApiResponse(response, code, ok, message, data);
        apiResponse.sendResponse();
    }
}

export default LaboratorioController;