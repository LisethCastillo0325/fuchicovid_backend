import { Request, Response } from "express";
import { getRepository, FindManyOptions } from "typeorm";
import { HTTP_STATUS_CODE_OK, HTTP_STATUS_CODE_BAD_REQUEST, HTTP_STATUS_CODE_NOT_FOUND, HTTP_STATUS_CODE_CREATED } from '../global/statuscode';
import { Medicamento } from '../entities/Medicamento';
import ApiResponse from '../classes/apiResponse';
import DataNotFoundError from '../classes/errors/DataNotFoundError';

class MedicamentoController {

    static getAll = async (req: Request, res: Response) => {
        // Se obtiene instancia de la base de datos
        const repositoryMedicamento = getRepository(Medicamento);
        try {
            
            const data = await repositoryMedicamento.find();
            // Se envia datos solicitados 
            MedicamentoController.sendResponse(res, data);
        } catch (error) {
            // Se envia información sobre el error
            MedicamentoController.sendResponse(res, null, HTTP_STATUS_CODE_BAD_REQUEST, false, error.message);
        }
    }

    static getById = async (req: Request, res: Response) => {
        // Se obtiene el id que llega por parametro en la url
        const id: string = req.params.id;

        // Se obtiene instancia de la base de datos
        const repositoryMedicamento = getRepository(Medicamento);
        try {
            
            const medicamento = await repositoryMedicamento.findOne(id);
            // Si no ecunetra el registro se lanza un error
            if(medicamento === undefined){
                let error = new DataNotFoundError();
                error.message = `Medicamento con id ${id} no encontrado`;
                error.statusCode = HTTP_STATUS_CODE_NOT_FOUND;
                throw error;
            }
            // Se envia datos solicitados 
            MedicamentoController.sendResponse(res, medicamento);

        } catch (error) {
            // Se envia información sobre el error
            if(error instanceof DataNotFoundError){
                MedicamentoController.sendResponse(res, null, error.statusCode, false, error.message);
            }else{
                MedicamentoController.sendResponse(res, null, HTTP_STATUS_CODE_BAD_REQUEST, false, error.message);
            }
        }
    }

    static create = async (req: Request, res: Response) => {

        try {
            console.log(req.body);
            // se obtiene los datos enviados por parametro
            let { nombreMedicamento } : Medicamento = req.body;

            // Se construye objeto
            let medicamento = new Medicamento();
            medicamento.nombreMedicamento = nombreMedicamento.toUpperCase();

            // Se obtiene instancia de la base de datos
            const repositoryMedicamento = getRepository(Medicamento);
            // Se guarda el objeto
            const results = repositoryMedicamento.save(medicamento);
            // Se envia resultado 
            MedicamentoController.sendResponse(res, results, HTTP_STATUS_CODE_CREATED, true, "Medicamento creado correctamente");

        } catch (error) {
             // Se envia información sobre el error
            MedicamentoController.sendResponse(res, null, HTTP_STATUS_CODE_BAD_REQUEST, false, error.message);
        }

    }

    static update = async (req: Request, res: Response) => {
        try {
             
            // Se obtiene el id que llega por parametro en la url
            const id: string = req.params.id;

            // se obtiene los datos enviados por parametro
            let { nombreMedicamento} : Medicamento = req.body;

            // Se obtiene instancia de la base de datos
            const repositoryMedicamento = getRepository(Medicamento);

            
            const medicamento = await repositoryMedicamento.findOne(id);

            // Si no ecunetra el registro se lanza un error
            if(medicamento === undefined){
                let error = new DataNotFoundError();
                error.message = `Entidad Promotora Salud con id ${id} no encontrado`;
                error.statusCode = HTTP_STATUS_CODE_NOT_FOUND;
                throw error;
            }

            
            medicamento.nombreMedicamento = nombreMedicamento.toUpperCase();

            // Se actualiza el objeto
            const results = repositoryMedicamento.save(medicamento);

            // Se envia resultado 
            MedicamentoController.sendResponse(res, results, HTTP_STATUS_CODE_CREATED, true, "Medicamento actualizada correctamente");

        } catch (error) {
             // Se envia información sobre el error
            if(error instanceof DataNotFoundError){
                MedicamentoController.sendResponse(res, null, error.statusCode, false, error.message);
            }else{
                MedicamentoController.sendResponse(res, null, HTTP_STATUS_CODE_BAD_REQUEST, false, error.message);
            }
        }
    }

    static sendResponse(response : Response, data: any = null, code : number = HTTP_STATUS_CODE_OK, ok : boolean = true, message : string = "OK") {
        const apiResponse = new ApiResponse(response, code, ok, message, data);
        apiResponse.sendResponse();
    }
}

export default MedicamentoController;