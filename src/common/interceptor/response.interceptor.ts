import { CallHandler, ExecutionContext, HttpStatus, NestInterceptor } from "@nestjs/common";
import { ErrorResponseDTO, SuccessResponseDTO } from "../dto/response.dto";
import { catchError, map, Observable } from "rxjs";
import { ResponseHelperService } from "../service/response.helper.service";
import { CustomErrorException } from "../custom-/custom.error.exception";

export class ResponseInterceptor<T> implements NestInterceptor<T, SuccessResponseDTO<T>> {
    intercept(
        context: ExecutionContext,
        next: CallHandler
    ): Observable<SuccessResponseDTO<T> | ErrorResponseDTO> {
        const response = context.switchToHttp().getResponse();

        return next.handle().pipe(
            map((data) => {
                const statusCode = response.statusCode || HttpStatus.OK;

                data = this.excludePassword(data);

                return ResponseHelperService.successResponse(statusCode, data);
            }),
            catchError((error) => {
                throw new CustomErrorException(error.message, error.status);
            }),
        );
    }

    private excludePassword(data: any) {
        if (typeof data === 'object' && data !== null) {
            Object.keys(data).forEach((key) => {
                if (key === 'password') {
                    delete data[key];
                } else {
                    data[key] = this.excludePassword(data[key]);
                }
            });
            return data;
        } else if (Array.isArray(data)) {
            return data.map((item) => this.excludePassword(item));
        } else {
            if (data?.password) {
                delete data.password;
            }
            return data;
        }
    }
}