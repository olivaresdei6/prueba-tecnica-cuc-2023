import {Module} from '@nestjs/common';
import {ConfigModule, ConfigService} from '@nestjs/config';
import {TypeOrmModule} from '@nestjs/typeorm';
import {IBaseDeDatosAbstract} from './core/abstract';
import * as entities from './entities';
import {envConfiguration} from "../../../config/env.config";
import {MysqlService} from "./mysql.service";
import { ExceptionsModule } from '../../../config/exceptions/exceptions.module';

@Module({
	imports: [
		TypeOrmModule.forRootAsync({
			imports: [ConfigModule.forRoot({})],
			inject: [ConfigService],
			useFactory: (configService: ConfigService) => {
				return {
					type: 'mysql',
					host: envConfiguration().databaseHost,
					port: envConfiguration().databasePort,
					username: envConfiguration().databaseUser,
					password: envConfiguration().databasePassword,
					database: envConfiguration().databaseName,
					synchronize: true,
					/* Logging sirve para ver las consultas que se hacen a la base de datos */
					logging: false,
					/* autoLoadEntities sirve para que no sea necesario importar las entidades en el archivo app.module.ts */
					autoLoadEntities: true,
					entities: Object.values(entities),
					migrations: ['dist/database/migrations/*.js'],
					subscribers: ['dist/observers/subscribers/*.subscriber.js'],
					cli: {
						entitiesDir: 'src/modules/**/entity',
						migrationsDir: 'src/database/migrations',
						subscribersDir: 'src/observers/subscribers',
					},
				};
			},
		}),
		TypeOrmModule.forFeature(Object.values(entities)),
		ExceptionsModule
	],
	providers: [
		{
			provide: IBaseDeDatosAbstract,
			useClass: MysqlService,
		},
	],
	exports: [IBaseDeDatosAbstract],
})
export class MySQLDatabaseModule {}
