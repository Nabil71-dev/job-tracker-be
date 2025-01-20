import { ApiProperty } from "@nestjs/swagger";

export class ResponseDTO {
    @ApiProperty()
    statusCode: number;

    @ApiProperty()
    type: string;
}

export class SuccessResponseDTO<T> extends ResponseDTO {
    @ApiProperty()
    data?: T | T[];
}

export class ErrorResponseDTO extends ResponseDTO {
    @ApiProperty()
    message: string;
}