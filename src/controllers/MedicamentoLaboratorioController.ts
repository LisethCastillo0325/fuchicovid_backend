import { Request, Response } from "express";
import { getRepository } from "typeorm";
import ApiResponse from '../classes/apiResponse';
import DataNotFoundError from '../classes/errors/DataNotFoundError';
import { MedicamentoLaboratorio } from '../entities/MedicamentoLaboratorio';
import { HTTP_STATUS_CODE_BAD_REQUEST, HTTP_STATUS_CODE_NOT_FOUND, HTTP_STATUS_CODE_OK } from '../global/statuscode';

class MedicamentoLaboratorioController {

    static getAll = async (req: Request, res: Response) => {
        // Se obtiene instancia de la base de datos
        const repositoryMedicamentoLaboratorio = getRepository(MedicamentoLaboratorio);
        try {
            
            const data = await repositoryMedicamentoLaboratorio.find();
            // Se envia datos solicitados 
            MedicamentoLaboratorioController.sendResponse(res, data);
        } catch (error) {
            // Se envia información sobre el error
            MedicamentoLaboratorioController.sendResponse(res, null, HTTP_STATUS_CODE_BAD_REQUEST, false, error.message);
        }
    }

    static getByLabId = async (req: Request, res: Response) => {
        // Se obtiene el id que llega por parametro en la url
        const id = req.params.id;

        // Se obtiene instancia de la base de datos
        const repositoryMedicamento = getRepository(MedicamentoLaboratorio);
        try {
            
            const medicamento = await repositoryMedicamento.createQueryBuilder("medicamentoLab")
            .where(`medicamentoLab.idLaboratorio = ${id}`).getRawMany()
            //.then(function(value){console.log(value)});
            // Si no ecunetra el registro se lanza un error
            if(medicamento === undefined){
                let error = new DataNotFoundError();
                error.message = `Laboratorio con id ${id} no encontrado`;
                error.statusCode = HTTP_STATUS_CODE_NOT_FOUND;
                throw error;
            }
            // Se envia datos solicitados 
            MedicamentoLaboratorioController.sendResponse(res, medicamento);

        } catch (error) {
            // Se envia información sobre el error
            if(error instanceof DataNotFoundError){
                MedicamentoLaboratorioController.sendResponse(res, null, error.statusCode, false, error.message);
            }else{
                MedicamentoLaboratorioController.sendResponse(res, null, HTTP_STATUS_CODE_BAD_REQUEST, false, error.message);
            }
        }
    }
    static getByMedId = async (req: Request, res: Response) => {
        // Se obtiene el id que llega por parametro en la url
        const id = req.params.id;

        // Se obtiene instancia de la base de datos
        const repositoryMedicamento = getRepository(MedicamentoLaboratorio);
        try {
            
            const medicamento = await repositoryMedicamento.createQueryBuilder("medicamentoLab")
            .where(`medicamentoLab.idMedicamento = ${id}`).getRawMany()
            //.then(function(value){console.log(value)});
            // Si no ecunetra el registro se lanza un error
            if(medicamento === undefined){
                let error = new DataNotFoundError();
                error.message = `Medicamento con id ${id} no encontrado`;
                error.statusCode = HTTP_STATUS_CODE_NOT_FOUND;
                throw error;
            }
            // Se envia datos solicitados 
            MedicamentoLaboratorioController.sendResponse(res, medicamento);

        } catch (error) {
            // Se envia información sobre el error
            if(error instanceof DataNotFoundError){
                MedicamentoLaboratorioController.sendResponse(res, null, error.statusCode, false, error.message);
            }else{
                MedicamentoLaboratorioController.sendResponse(res, null, HTTP_STATUS_CODE_BAD_REQUEST, false, error.message);
            }
        }
    }
    
    

    static sendResponse(response : Response, data: any = null, code : number = HTTP_STATUS_CODE_OK, ok : boolean = true, message : string = "OK") {
        const apiResponse = new ApiResponse(response, code, ok, message, data);
        apiResponse.sendResponse();
    }
}

export default MedicamentoLaboratorioController;