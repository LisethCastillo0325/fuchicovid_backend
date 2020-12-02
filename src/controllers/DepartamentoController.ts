import { Request, Response } from "express";
import { getRepository, FindManyOptions } from "typeorm";
import { HTTP_STATUS_CODE_OK, HTTP_STATUS_CODE_BAD_REQUEST, HTTP_STATUS_CODE_NOT_FOUND, HTTP_STATUS_CODE_CREATED } from '../global/statuscode';
import { Departamento } from '../entities/Departamento';
import ApiResponse from '../classes/apiResponse';
import DataNotFoundError from '../classes/errors/DataNotFoundError';
import { Pais } from "../entities/Pais";

class DepartamentoController {

    static getAll = async (req: Request, res: Response) => {
        // Se obtiene instancia de la base de datos
        const repositoryDepartamento = getRepository(Departamento);
        try {
            
            const data = await repositoryDepartamento.find();
            // Se envia datos solicitados 
            DepartamentoController.sendResponse(res, data);
        } catch (error) {
            // Se envia información sobre el error
            DepartamentoController.sendResponse(res, null, HTTP_STATUS_CODE_BAD_REQUEST, false, error.message);
        }
    }

    static getById = async (req: Request, res: Response) => {
        // Se obtiene el id que llega por parametro en la url
        const id: string = req.params.id;

        // Se obtiene instancia de la base de datos
        const repositoryDepartamento = getRepository(Departamento);
        try {
            
            const Departamento = await repositoryDepartamento.findOne(id);
            // Si no ecunetra el registro se lanza un error
            if(Departamento === undefined){
                let error = new DataNotFoundError();
                error.message = `Departamento con id ${id} no encontrado`;
                error.statusCode = HTTP_STATUS_CODE_NOT_FOUND;
                throw error;
            }
            // Se envia datos solicitados 
            DepartamentoController.sendResponse(res, Departamento);

        } catch (error) {
            // Se envia información sobre el error
            if(error instanceof DataNotFoundError){
                DepartamentoController.sendResponse(res, null, error.statusCode, false, error.message);
            }else{
                DepartamentoController.sendResponse(res, null, HTTP_STATUS_CODE_BAD_REQUEST, false, error.message);
            }
        }
    }

    static create = async (req: Request, res: Response) => {

        try {
            console.log(req.body);
            // se obtiene los datos enviados por parametro
            let { nombre } : Departamento = req.body;
            let {nombre_pais}=req.body;
            const repositoryPais = getRepository(Pais);      

             //Query para encontra el id del pais usando el nombre del pais que se recibe en el json
            const idpais= await repositoryPais.createQueryBuilder("pais").select("pais.id")
            .where(`pais.nombre ilike '${nombre_pais}'`).getRawOne();
           
            
            // Se construye objeto 
            let departamento = new Departamento();
            departamento.nombre = nombre.toUpperCase();
            departamento.idPais=idpais["pais_id"];

            
            // Se obtiene instancia de la base de datos
            const repositoryDepartamento = getRepository(Departamento);
            // Se guarda el objeto
            const results = repositoryDepartamento.save(departamento);
            // Se envia resultado 
            DepartamentoController.sendResponse(res, results, HTTP_STATUS_CODE_CREATED, true, "Departamento creado correctamente");

        } catch (error) {
             // Se envia información sobre el error
             DepartamentoController.sendResponse(res, null, HTTP_STATUS_CODE_BAD_REQUEST, false, error.message);
        }

    }

    static update = async (req: Request, res: Response) => {
        try {
             
            // Se obtiene el id que llega por parametro en la url
            const id: string = req.params.id;

            // se obtiene los datos enviados por parametro
            let { nombre } : Departamento = req.body;
            let {nombre_pais}=req.body;
            const repositoryPais = getRepository(Pais);      

             //Query para encontra el id del depto usando el nombre de la departamento que se recibe en el json
             const idpais= await repositoryPais.createQueryBuilder("pais").select("pais.id")
             .where(`pais.nombre ilike '${nombre_pais}'`).getRawOne();

            // Se obtiene instancia de la base de datos
            const repositoryDepartamento = getRepository(Departamento);

            
            const departamento= await repositoryDepartamento.findOne(id);

            // Si no ecunetra el registro se lanza un error
            if(departamento === undefined){
                let error = new DataNotFoundError();
                error.message = `Departamento con id ${id} no encontrado`;
                error.statusCode = HTTP_STATUS_CODE_NOT_FOUND;
                throw error;
            }

            
            departamento.nombre = nombre.toUpperCase();
            departamento.idPais=idpais["pais_id"];

            // Se actualiza el objeto
            const results = repositoryDepartamento.save(departamento);

            // Se envia resultado 
            DepartamentoController.sendResponse(res, results, HTTP_STATUS_CODE_CREATED, true, "Departamento actualizado correctamente");

        } catch (error) {
             // Se envia información sobre el error
            if(error instanceof DataNotFoundError){
                DepartamentoController.sendResponse(res, null, error.statusCode, false, error.message);
            }else{
                DepartamentoController.sendResponse(res, null, HTTP_STATUS_CODE_BAD_REQUEST, false, error.message);
            }
        }
    }

    static sendResponse(response : Response, data: any = null, code : number = HTTP_STATUS_CODE_OK, ok : boolean = true, message : string = "OK") {
        const apiResponse = new ApiResponse(response, code, ok, message, data);
        apiResponse.sendResponse();
    }
}

export default DepartamentoController;