import { Body, Controller, Get, Param, ParseIntPipe, ParseUUIDPipe, Patch, Post } from '@nestjs/common';
import {ApiResponse, ApiTags} from "@nestjs/swagger";
import { Docente } from '../../frameworks/databases/mysql/entities';
import { DocenteService } from './docente.service';
import { CreateDocenteDto } from './dto/create-docente.dto';
import { UpdateDocenteDto } from './dto/update-docente.dto';


@ApiTags("Docente")

@Controller('docente')
export class DocenteController {

	constructor(
		private readonly docenteService: DocenteService
	) {}

	@ApiResponse({ status: 201, description: 'Docente creado correctamente.' })
	@ApiResponse({ status: 400, description: 'Bad Request: Verifique los datos de entrada' })
	@ApiResponse({ status: 401, description: 'Unauthorized: No tiene permisos para realizar esta acción' })
	@ApiResponse({ status: 403, description: 'Forbidden: No tiene permisos para realizar esta acción' })
	@ApiResponse({ status: 404, description: 'Not Found: El Docente no existe' })
	@Post()

	create(@Body() createDocenteDto: CreateDocenteDto) {
		return this.docenteService.create(createDocenteDto);
	}


	@ApiResponse({ status: 201, description: 'Docentes encontrados correctamente.', type: Docente, isArray: true })
	@ApiResponse({ status: 400, description: 'Bad Request: Verifique los datos de entrada' })
	@ApiResponse({ status: 401, description: 'Unauthorized: No tiene permisos para realizar esta acción' })
	@ApiResponse({ status: 403, description: 'Forbidden: No tiene permisos para realizar esta acción' })
	@ApiResponse({ status: 404, description: 'Not Found: No se encontraron Docentes' })
	@Get()

	findAll() {
		return this.docenteService.findAll();
	}


	@ApiResponse({ status: 201, description: 'Docente encontrado correctamente.', type: Docente })
	@ApiResponse({ status: 400, description: 'Bad Request: Verifique los datos de entrada' })
	@ApiResponse({ status: 401, description: 'Unauthorized: No tiene permisos para realizar esta acción' })
	@ApiResponse({ status: 403, description: 'Forbidden: No tiene permisos para realizar esta acción' })
	@ApiResponse({ status: 404, description: 'Not Found: El Docente no existe' })
	@Get(':uuid')
	findOne(@Param('uuid', ParseUUIDPipe) uuid: string) {
		return this.docenteService.findOne(uuid);
	}


	@ApiResponse({ status: 201, description: 'Docente actualizado correctamente.', type: Docente })
	@ApiResponse({ status: 400, description: 'Bad Request: Verifique los datos de entrada' })
	@ApiResponse({ status: 401, description: 'Unauthorized: No tiene permisos para realizar esta acción' })
	@ApiResponse({ status: 403, description: 'Forbidden: No tiene permisos para realizar esta acción' })
	@ApiResponse({ status: 404, description: 'Not Found: El Docente no existe' })
	@Patch(':uuid')

	update(@Param('uuid', ParseUUIDPipe) uuid: string, @Body() updateDocenteDto: UpdateDocenteDto) {
		return this.docenteService.update(uuid, updateDocenteDto);
	}
}
