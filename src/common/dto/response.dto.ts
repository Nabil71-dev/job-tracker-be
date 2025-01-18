export class ResponseDTO {
    statusCode: number;
    type: string;
}

export class SuccessResponseDTO<T> extends ResponseDTO {
    data?: T | T[];
}

export class ErrorResponseDTO extends ResponseDTO {
    message: string;
}