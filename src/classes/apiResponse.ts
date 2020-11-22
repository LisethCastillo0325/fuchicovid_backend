import { Response } from 'express';
import { ApiResponseInterface } from '../interfaces/ApiResponse';
import { HTTP_STATUS_CODE_OK } from '../global/statuscode';

export default class ApiResponse implements ApiResponseInterface {
    ok: boolean;
    message: string;
    data: any;
    status: number;
    response: Response;

    constructor (response : Response, code : number = HTTP_STATUS_CODE_OK, ok : boolean = true, message : string = "OK", data: any = null){
        this.ok = ok;
        this.message = message;
        this.data = data;
        this.status = code;
        this.response = response;
    }

    sendResponse() {
        const result  = {
            ok : this.ok,
            message : this.message,
            data: this.data,
            status: this.status,
        }
        this.response.setHeader('Content-Type', 'application/json');
        this.response.status(this.status).json(result);
    }
    
}