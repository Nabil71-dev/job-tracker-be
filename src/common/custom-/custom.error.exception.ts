import { HttpException, HttpStatus } from "@nestjs/common";

export class CustomErrorException extends HttpException {
    constructor(message: string, status: HttpStatus) {
        super(message, status);
    }
}