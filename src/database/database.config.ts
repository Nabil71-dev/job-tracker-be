import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';

@Injectable()
export class DatabaseConfig {
  constructor(private readonly configService: ConfigService) {}

  public getOrmConfig (): TypeOrmModuleOptions {
    const options: TypeOrmModuleOptions = {
      type: 'mysql',
      host: this.configService.get<string>('DB_HOST'),
      port: this.configService.get<number>('DB_PORT'),
      username: this.configService.get<string>('DB_USERNAME'),
      password: this.configService.get<string>('DB_PASSWORD'),
      database: this.configService.get<string>('DB_NAME'),
      entities: [__dirname + '/../**/*.entity{.ts,.js}'],
      autoLoadEntities: true,
      synchronize: true,
    };

    return options;
  }

  public checkDatabaseConnection(): boolean {
    const logger = new Logger();

    try {
      const ormConfig = this.getOrmConfig();
      TypeOrmModule.forRoot(ormConfig);

      const dbType = this.configService.get<string>('DB_TYPE');
      const host = this.configService.get<string>('DB_HOST');
      const port = this.configService.get<number>('DB_PORT');
      logger.log(
        `[DataBaseConfig] ${dbType} database connected successfully on host = ${host} and port = ${port}.`,
      );
      
      return true;

    } catch (error) {
      logger.error(
        '[DataBaseConfig] Failed to connect to the database: ',
        error,
      );
      return false;
    }
  }
}
