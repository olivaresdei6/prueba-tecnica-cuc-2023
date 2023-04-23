import { Body, Controller, Get, Param, ParseIntPipe, ParseUUIDPipe, Patch, Post } from '@nestjs/common';
import {ApiResponse, ApiTags} from "@nestjs/swagger";
import { Asignatura } from '../../frameworks/databases/mysql/entities';
import { AsignaturaService } from './asignatura.service';
import { CreateGrupoDto } from './dto/create-grupo.dto';
import { UpdateGrupoDto } from './dto/update-grupo.dto';


@ApiTags("Asignatura")

@Controller('asignatura')
export class AsignaturaController {

	constructor(
		private readonly asignaturaService: AsignaturaService
	) {}

	@ApiResponse({ status: 201, description: 'Asignatura creada correctamente.' })
	@ApiResponse({ status: 400, description: 'Bad Request: Verifique los datos de entrada' })
	@ApiResponse({ status: 401, description: 'Unauthorized: No tiene permisos para realizar esta acción' })
	@ApiResponse({ status: 403, description: 'Forbidden: No tiene permisos para realizar esta acción' })
	@ApiResponse({ status: 404, description: 'Not Found: La Asignatura no existe' })
	@Post()

	create(@Body() createAsignaturaDto: CreateGrupoDto) {
		return this.asignaturaService.create(createAsignaturaDto);
	}


	@ApiResponse({ status: 201, description: 'Asignaturas encontradas correctamente.', type: Asignatura, isArray: true })
	@ApiResponse({ status: 400, description: 'Bad Request: Verifique los datos de entrada' })
	@ApiResponse({ status: 401, description: 'Unauthorized: No tiene permisos para realizar esta acción' })
	@ApiResponse({ status: 403, description: 'Forbidden: No tiene permisos para realizar esta acción' })
	@ApiResponse({ status: 404, description: 'Not Found: No se encontraron Asignaturas' })
	@Get()

	findAll() {
		return this.asignaturaService.findAll();
	}


	@ApiResponse({ status: 201, description: 'Asignatura encontrada correctamente.', type: Asignatura })
	@ApiResponse({ status: 400, description: 'Bad Request: Verifique los datos de entrada' })
	@ApiResponse({ status: 401, description: 'Unauthorized: No tiene permisos para realizar esta acción' })
	@ApiResponse({ status: 403, description: 'Forbidden: No tiene permisos para realizar esta acción' })
	@ApiResponse({ status: 404, description: 'Not Found: La Asignatura no existe' })
	@Get(':uuid')
	findOne(@Param('uuid', ParseUUIDPipe) uuid: string) {
		return this.asignaturaService.findOne(uuid);
	}


	@ApiResponse({ status: 201, description: 'Docente actualizado correctamente.', type: Asignatura })
	@ApiResponse({ status: 400, description: 'Bad Request: Verifique los datos de entrada' })
	@ApiResponse({ status: 401, description: 'Unauthorized: No tiene permisos para realizar esta acción' })
	@ApiResponse({ status: 403, description: 'Forbidden: No tiene permisos para realizar esta acción' })
	@ApiResponse({ status: 404, description: 'Not Found: El Docente no existe' })
	@Patch(':uuid')

	update(@Param('uuid', ParseUUIDPipe) uuid: string, @Body() updateAsignaturaDto: UpdateGrupoDto) {
		return this.asignaturaService.update(uuid, updateAsignaturaDto);
	}
}