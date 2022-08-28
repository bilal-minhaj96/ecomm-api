
export class RequestDto {
    message: string;
    status: string;
    data: object;
}

export class ResponseDto {
    message: string;
    status: string;
    data: object;
    errors?: object;
    token?: string;
}

export interface ICreateResponse {
   
    status: number;
    message: string;
    data: object;
    errors: {[ket:string]:any};
    token?: string;
}
