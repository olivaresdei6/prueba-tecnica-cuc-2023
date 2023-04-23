import { Module } from '@nestjs/common';
import { MySQLDatabaseModule } from '../../frameworks/databases/mysql/mysql.module';
import { DocenteService } from './docente.service';
import { DocenteController } from './docente.controller';
import { ExceptionsService } from '../../config/exceptions/exceptions.service';
@Module({
	providers: [DocenteService],
	controllers: [DocenteController],
	exports: [DocenteService],
	imports: [MySQLDatabaseModule],
})
export class DocenteModule {}
