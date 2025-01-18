import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseConfig } from './database.config';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true
        }),
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) => {
                const databaseConfig = new DatabaseConfig(configService);
                const isConnected = databaseConfig.checkDatabaseConnection();

                return isConnected ? databaseConfig.getOrmConfig() : null;
            },
        }),
    ],
})
export class DatabaseModule { }
