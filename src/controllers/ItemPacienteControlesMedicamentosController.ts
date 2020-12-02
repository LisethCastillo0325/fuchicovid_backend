import { Request, Response } from "express";
import { getRepository } from "typeorm";
import ApiResponse from '../classes/apiResponse';
import DataNotFoundError from '../classes/errors/DataNotFoundError';
import { ItemPacienteControlesMedicamentos } from '../entities/ItemPacienteControlesMedicamentos';
import { HTTP_STATUS_CODE_BAD_REQUEST, HTTP_STATUS_CODE_CREATED, HTTP_STATUS_CODE_NOT_FOUND, HTTP_STATUS_CODE_OK } from '../global/statuscode';

class ItemPacienteControlesMedicamentosController {

    static getAll = async (req: Request, res: Response) => {
        // Se obtiene instancia de la base de datos
        
        const repositoryItemPacienteControlesMedicamentos = getRepository(ItemPacienteControlesMedicamentos);
        try {
            
            const data = await repositoryItemPacienteControlesMedicamentos.find(
                {
                    relations:["idPacienteControl","idRegistroDosis"]
                });
            // Se envia datos solicitados 
            ItemPacienteControlesMedicamentosController.sendResponse(res, data);
        } catch (error) {
            // Se envia información sobre el error
            ItemPacienteControlesMedicamentosController.sendResponse(res, null, HTTP_STATUS_CODE_BAD_REQUEST, false, error.message);
        }
    }

    static getById = async (req: Request, res: Response) => {
        // Se obtiene el id que llega por parametro en la url

        const id: string = req.params.id;

        // Se obtiene instancia de la base de datos
        const repositoryItemPacienteControlesMedicamentos = getRepository(ItemPacienteControlesMedicamentos);
        try {
            
            const pacienteControles = await repositoryItemPacienteControlesMedicamentos.find(
            {
                relations:["idPacienteControl","idRegistroDosis"],
                where: [{id:id}]
            });
            // Si no ecunetra el registro se lanza un error
            if(pacienteControles === undefined){
                let error = new DataNotFoundError();
                error.message = `Item con id ${id} no encontrado`;
                error.statusCode = HTTP_STATUS_CODE_NOT_FOUND;
                throw error;
            }
            // Se envia datos solicitados 
            ItemPacienteControlesMedicamentosController.sendResponse(res, pacienteControles);

        } catch (error) {
            // Se envia información sobre el error
            if(error instanceof DataNotFoundError){
                ItemPacienteControlesMedicamentosController.sendResponse(res, null, error.statusCode, false, error.message);
            }else{
                ItemPacienteControlesMedicamentosController.sendResponse(res, null, HTTP_STATUS_CODE_BAD_REQUEST, false, error.message);
            }
        }
    }
    
    static getByControlId = async (req: Request, res: Response) => {
        // Se obtiene el id que llega por parametro en la url
        const id = req.params.id;

        // Se obtiene instancia de la base de datos
        const repositoryItemPacienteControlesMedicamentos = getRepository(ItemPacienteControlesMedicamentos);
        try {
            
            const relacion=await repositoryItemPacienteControlesMedicamentos.find(
            {
                relations:["idPacienteControl","idRegistroDosis"],
                where: [{idPacienteControl:id}]
            });
            //.then(function(value){console.log(value)});
            // Si no ecunetra el registro se lanza un error
            if(relacion === undefined){
                let error = new DataNotFoundError();
                error.message = `Item con id de persona ${id} no encontrado`;
                error.statusCode = HTTP_STATUS_CODE_NOT_FOUND;
                throw error;
            }
            // Se envia datos solicitados 
            ItemPacienteControlesMedicamentosController.sendResponse(res, relacion);

        } catch (error) {
            // Se envia información sobre el error
            if(error instanceof DataNotFoundError){
                ItemPacienteControlesMedicamentosController.sendResponse(res, null, error.statusCode, false, error.message);
            }else{
                ItemPacienteControlesMedicamentosController.sendResponse(res, null, HTTP_STATUS_CODE_BAD_REQUEST, false, error.message);
            }
        }
    }
   
    static create = async (req: Request, res: Response) => {

        try {
            console.log(req.body);
            // se obtiene los datos enviados por parametro
            let {idPacienteControl,idRegistroDosis} : ItemPacienteControlesMedicamentos = req.body;
           
           
            // Se construye objeto
           
            let pacienteControles = new ItemPacienteControlesMedicamentos();
            pacienteControles.idPacienteControl=idPacienteControl;
            pacienteControles.idRegistroDosis=idRegistroDosis;
           
            const repositoryItemPacienteControlesMedicamentos = getRepository(ItemPacienteControlesMedicamentos);
            
            const results=await repositoryItemPacienteControlesMedicamentos.save(pacienteControles);        
            ItemPacienteControlesMedicamentosController.sendResponse(res, results, HTTP_STATUS_CODE_CREATED, true, "ItemPacienteControlesMedicamentos actualizado correctamente");

        } catch (error) {
             // Se envia información sobre el error
            ItemPacienteControlesMedicamentosController.sendResponse(res, null, HTTP_STATUS_CODE_BAD_REQUEST, false, error.message);
        }

    }

    static update = async (req: Request, res: Response) => {
        try {
             
            // Se obtiene el id que llega por parametro en la url
            const id: string = req.params.id;
    
            // Se obtiene instancia de la base de datos
            const repositoryItemPacienteControlesMedicamentos = getRepository(ItemPacienteControlesMedicamentos);

            
            const pacienteControles = await repositoryItemPacienteControlesMedicamentos.findOne(id);

            // Si no ecunetra el registro se lanza un error
            if(pacienteControles === undefined){
                let error = new DataNotFoundError();
                error.message = `Control con id ${id} no encontrado`;
                error.statusCode = HTTP_STATUS_CODE_NOT_FOUND;
                throw error;
            }
            let {idPacienteControl,idRegistroDosis} : ItemPacienteControlesMedicamentos = req.body;
            
            pacienteControles.idPacienteControl=idPacienteControl;
            pacienteControles.idRegistroDosis=idRegistroDosis;
    
            const results=await repositoryItemPacienteControlesMedicamentos.save(pacienteControles)        

        

            // Se envia resultado 
            ItemPacienteControlesMedicamentosController.sendResponse(res, results, HTTP_STATUS_CODE_CREATED, true, "ItemPacienteControlesMedicamentos actualizado correctamente");

        } catch (error) {
             // Se envia información sobre el error
            if(error instanceof DataNotFoundError){
                ItemPacienteControlesMedicamentosController.sendResponse(res, null, error.statusCode, false, error.message);
            }else{
               ItemPacienteControlesMedicamentosController.sendResponse(res, null, HTTP_STATUS_CODE_BAD_REQUEST, false, error.message);
            }
        }
    }

    static sendResponse(response : Response, data: any = null, code : number = HTTP_STATUS_CODE_OK, ok : boolean = true, message : string = "OK") {
        const apiResponse = new ApiResponse(response, code, ok, message, data);
        apiResponse.sendResponse();
    }
}

export default ItemPacienteControlesMedicamentosController;