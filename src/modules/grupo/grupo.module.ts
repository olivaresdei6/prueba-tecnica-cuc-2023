import { Module } from '@nestjs/common';
import { MySQLDatabaseModule } from '../../frameworks/databases/mysql/mysql.module';
import { GrupoService } from './grupo.service';
import { GrupoController } from './grupo.controller';
import { ExceptionsModule } from '../../config/exceptions/exceptions.module';
@Module({
	providers: [GrupoService],
	controllers: [GrupoController],
	exports: [GrupoService],
	imports: [MySQLDatabaseModule, ExceptionsModule],
})
export class GrupoModule {}
