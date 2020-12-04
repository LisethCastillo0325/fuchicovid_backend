import { Request, Response } from "express";
import { getRepository, FindManyOptions } from "typeorm";
import { HTTP_STATUS_CODE_OK, HTTP_STATUS_CODE_BAD_REQUEST, HTTP_STATUS_CODE_NOT_FOUND, HTTP_STATUS_CODE_CREATED } from '../global/statuscode';
import { Ciudad } from '../entities/Ciudad';
import { Departamento } from '../entities/Departamento';
import ApiResponse from '../classes/apiResponse';
import DataNotFoundError from '../classes/errors/DataNotFoundError';

class CiudadController {

    static getAll = async (req: Request, res: Response) => {
        // Se obtiene instancia de la base de datos
        const repositoryCiudad = getRepository(Ciudad);
        try {
            
            const data = await repositoryCiudad.find();
            // Se envia datos solicitados 
            CiudadController.sendResponse(res, data);
        } catch (error) {
            // Se envia información sobre el error
            CiudadController.sendResponse(res, null, HTTP_STATUS_CODE_BAD_REQUEST, false, error.message);
        }
    }

    static getById = async (req: Request, res: Response) => {
        // Se obtiene el id que llega por parametro en la url
        const id: string = req.params.id;

        // Se obtiene instancia de la base de datos
        const repositoryCiudad = getRepository(Ciudad);
        try {
            
            const Ciudad = await repositoryCiudad.findOne(id);
            // Si no ecunetra el registro se lanza un error
            if(Ciudad === undefined){
                let error = new DataNotFoundError();
                error.message = `Ciudad con id ${id} no encontrado`;
                error.statusCode = HTTP_STATUS_CODE_NOT_FOUND;
                throw error;
            }
            // Se envia datos solicitados 
            CiudadController.sendResponse(res, Ciudad);

        } catch (error) {
            // Se envia información sobre el error
            if(error instanceof DataNotFoundError){
                CiudadController.sendResponse(res, null, error.statusCode, false, error.message);
            }else{
                CiudadController.sendResponse(res, null, HTTP_STATUS_CODE_BAD_REQUEST, false, error.message);
            }
        }
    }

    static getByDepartamento = async (req: Request, res: Response) => {
        // Se obtiene el id que llega por parametro en la url
        const id: string = req.params.id;

        // Se obtiene instancia de la base de datos
        const repositoryCiudad = getRepository(Ciudad);
        try {
            
            const Ciudad = await repositoryCiudad.find({
                where: [
                    {idDepartamento: id}
                ]
            });
            // Si no ecunetra el registro se lanza un error
            if(Ciudad === undefined){
                let error = new DataNotFoundError();
                error.message = `Ciudad con departamento id ${id} no encontrado`;
                error.statusCode = HTTP_STATUS_CODE_NOT_FOUND;
                throw error;
            }
            // Se envia datos solicitados 
            CiudadController.sendResponse(res, Ciudad);

        } catch (error) {
            // Se envia información sobre el error
            if(error instanceof DataNotFoundError){
                CiudadController.sendResponse(res, null, error.statusCode, false, error.message);
            }else{
                CiudadController.sendResponse(res, null, HTTP_STATUS_CODE_BAD_REQUEST, false, error.message);
            }
        }
    }

    static create = async (req: Request, res: Response) => {

        try {
            console.log(req.body);
            // se obtiene los datos enviados por parametro
            let { nombre } : Ciudad = req.body;
            let {nombre_departamento}=req.body;
            const repositoryDepartamento = getRepository(Departamento);      

             //Query para encontra el id del depto usando el nombre de la ciudad que se recibe en el json
           const idDept = await repositoryDepartamento.createQueryBuilder("departamento").select("departamento.id")
            .where(`departamento.nombre ilike '${nombre_departamento}'`).getRawOne();
           
            console.log(idDept);
            // Se construye objeto
            let ciudad = new Ciudad();
            ciudad.nombre = nombre.toUpperCase();
            ciudad.idDepartamento= idDept["departamento_id"];
            
            // Se obtiene instancia de la base de datos
            const repositoryCiudad = getRepository(Ciudad);
            // Se guarda el objeto
            const results = repositoryCiudad.save(ciudad);
            // Se envia resultado 
            CiudadController.sendResponse(res, results, HTTP_STATUS_CODE_CREATED, true, "Ciudad creada correctamente");
            
        } catch (error) {
             // Se envia información sobre el error
             CiudadController.sendResponse(res, null, HTTP_STATUS_CODE_BAD_REQUEST, false, error.message);
        }

    }

    static update = async (req: Request, res: Response) => {
        try {
             
            // Se obtiene el id que llega por parametro en la url
            const id: string = req.params.id;

            // se obtiene los datos enviados por parametro
            let { nombre } : Ciudad = req.body;
            let {nombre_departamento}=req.body;
            const repositoryDepartamento = getRepository(Departamento);      

             //Query para encontra el id del depto usando el nombre de la ciudad que se recibe en el json
             const idDept = await repositoryDepartamento.createQueryBuilder("departamento").select("departamento.id")
             .where(`departamento.nombre ilike '${nombre_departamento}'`).getRawOne();

            // Se obtiene instancia de la base de datos
            const repositoryCiudad = getRepository(Ciudad);

            
            const ciudad= await repositoryCiudad.findOne(id);

            // Si no ecunetra el registro se lanza un error
            if(ciudad === undefined){
                let error = new DataNotFoundError();
                error.message = `Ciudad con id ${id} no encontrada`;
                error.statusCode = HTTP_STATUS_CODE_NOT_FOUND;
                throw error;
            }

            
            ciudad.nombre = nombre.toUpperCase();
            ciudad.idDepartamento=idDept["departamento_id"];

            // Se actualiza el objeto
            const results = repositoryCiudad.save(ciudad);

            // Se envia resultado 
            CiudadController.sendResponse(res, results, HTTP_STATUS_CODE_CREATED, true, "ciudad actualizada correctamente");

        } catch (error) {
             // Se envia información sobre el error
            if(error instanceof DataNotFoundError){
                CiudadController.sendResponse(res, null, error.statusCode, false, error.message);
            }else{
                CiudadController.sendResponse(res, null, HTTP_STATUS_CODE_BAD_REQUEST, false, error.message);
            }
        }
    }

    static sendResponse(response : Response, data: any = null, code : number = HTTP_STATUS_CODE_OK, ok : boolean = true, message : string = "OK") {
        const apiResponse = new ApiResponse(response, code, ok, message, data);
        apiResponse.sendResponse();
    }
}

export default CiudadController;