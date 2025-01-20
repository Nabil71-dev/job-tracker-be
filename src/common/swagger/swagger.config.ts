import { INestApplication } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

export class SwaggerConfig {

    public static swaggerSetup(app: INestApplication) {
        const config = new DocumentBuilder()
            .setTitle("Job-Tracker API's")
            .setDescription('API documentation for My Job-Tracker App')
            .setVersion('1.0')
            .addBearerAuth(
                {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                    name: 'JWT',
                    description: 'Enter JWT Token',
                    in: 'header',
                },
                'JWT-AUTH',
            )
            .build();

        const document = SwaggerModule.createDocument(app, config);
        SwaggerModule.setup('api-docs', app, document);
    }
}