import { Module } from '@nestjs/common';
import { MySQLDatabaseModule } from '../../frameworks/databases/mysql/mysql.module';
import { CalificacionService } from './calificacion.service';
import { CalificacionController } from './calificacion.controller';
import { ExceptionsModule } from '../../config/exceptions/exceptions.module';
@Module({
	providers: [CalificacionService],
	controllers: [CalificacionController],
	exports: [CalificacionService],
	imports: [MySQLDatabaseModule, ExceptionsModule],
})
export class CalificacionModule {}
