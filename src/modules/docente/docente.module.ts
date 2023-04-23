import { Module } from '@nestjs/common';
import { MySQLDatabaseModule } from '../../frameworks/databases/mysql/mysql.module';
import { DocenteService } from './docente.service';
import { DocenteController } from './docente.controller';
@Module({
	providers: [DocenteService],
	controllers: [DocenteController],
	exports: [DocenteService],
	imports: [MySQLDatabaseModule],
})
export class DocenteModule {}
