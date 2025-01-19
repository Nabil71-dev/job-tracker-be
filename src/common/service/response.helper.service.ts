import { HttpStatus } from "@nestjs/common";
import { ErrorResponseDTO, SuccessResponseDTO } from "../dto/response.dto";

export class ResponseHelperService {
    public static successResponse<T>(statusCode: number, data: T | T[]) {
        const successResponseDTO = new SuccessResponseDTO<T>();
        successResponseDTO.statusCode = statusCode;
        successResponseDTO.type = HttpStatus[statusCode];

        if(statusCode>=200 && statusCode<300){
            successResponseDTO.data=data as T;
        }

        return successResponseDTO;
    }

    public static errorResponse(statusCode: number, message: string) {
        const errorResponseDTO = new ErrorResponseDTO();
        errorResponseDTO.statusCode = statusCode;
        errorResponseDTO.type = HttpStatus[statusCode];
        errorResponseDTO.message = message;

        return errorResponseDTO;
    }
}