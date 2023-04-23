import { Module } from '@nestjs/common';
import { ProgramaAcademicoService } from './programa_academico.service';
import { ProgramaAcademicoController } from './programa_academico.controller';
import { MySQLDatabaseModule } from '../../frameworks/databases/mysql/mysql.module';
@Module({
	providers: [ProgramaAcademicoService],
	controllers: [ProgramaAcademicoController],
	exports: [ProgramaAcademicoService],
	imports: [MySQLDatabaseModule],
})
export class ProgramaAcademicoModule {}
