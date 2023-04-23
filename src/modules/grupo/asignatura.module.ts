import { Module } from '@nestjs/common';
import { MySQLDatabaseModule } from '../../frameworks/databases/mysql/mysql.module';
import { AsignaturaService } from './asignatura.service';
import { AsignaturaController } from './asignatura.controller';
import { ExceptionsModule } from '../../config/exceptions/exceptions.module';
@Module({
	providers: [AsignaturaService],
	controllers: [AsignaturaController],
	exports: [AsignaturaService],
	imports: [MySQLDatabaseModule, ExceptionsModule],
})
export class AsignaturaModule {}
