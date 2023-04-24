/* eslint-disable */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { envConfiguration } from './config/env.config';
import { JoiValidationSchema } from './config/joi.validation';
import { MySQLDatabaseModule } from './frameworks/databases/mysql/mysql.module';
import { ProgramaAcademicoModule } from './modules/programa_academico/programa_academico.module';
import { DocenteModule } from './modules/docente/docente.module';
import { AsignaturaModule } from './modules/asignatura/asignatura.module';
import { GrupoModule } from './modules/grupo/grupo.module';
import { EstudianteModule } from './modules/estudiante/estudiante.module';
import { CalificacionModule } from './modules/calificacion/calificacion.module';

@Module({
    imports: [
		ConfigModule.forRoot({
			load: [envConfiguration],
			validationSchema: JoiValidationSchema
		}),

		MySQLDatabaseModule,
		ProgramaAcademicoModule,
		DocenteModule,
		AsignaturaModule,
		GrupoModule,
		EstudianteModule,
		CalificacionModule
	],
	exports: [AppService],
    controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
