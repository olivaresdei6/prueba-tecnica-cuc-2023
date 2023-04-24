import { Module } from '@nestjs/common';
import { MySQLDatabaseModule } from '../../frameworks/databases/mysql/mysql.module';
import { EstudianteService } from './estudiante.service';
import { EstudianteController } from './estudiante.controller';
import { ExceptionsModule } from '../../config/exceptions/exceptions.module';
@Module({
	providers: [EstudianteService],
	controllers: [EstudianteController],
	exports: [EstudianteService],
	imports: [MySQLDatabaseModule, ExceptionsModule],
})
export class EstudianteModule {}
