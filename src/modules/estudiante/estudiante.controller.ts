import { Body, Controller, Get, Param, ParseUUIDPipe, Patch, Post } from '@nestjs/common';
import {ApiResponse, ApiTags} from "@nestjs/swagger";
import { Estudiante, Grupo } from '../../frameworks/databases/mysql/entities';
import { EstudianteService } from './estudiante.service';
import { CreateEstudianteDto } from './dto/create-estudiante.dto';
import { UpdateEstudianteDto } from './dto/update-estudiante.dto';


@ApiTags("Estudiante")

@Controller('estudiante')
export class EstudianteController {

	constructor(
		private readonly estudianteService: EstudianteService
	) {}

	@ApiResponse({ status: 201, description: 'Estudiante creado correctamente.' })
	@ApiResponse({ status: 400, description: 'Bad Request: Verifique los datos de entrada' })
	@ApiResponse({ status: 401, description: 'Unauthorized: No tiene permisos para realizar esta acción' })
	@ApiResponse({ status: 403, description: 'Forbidden: No tiene permisos para realizar esta acción' })
	@ApiResponse({ status: 404, description: 'Not Found: El Estudiante no existe' })
	@Post()

	create(@Body() createEstudianteDto: CreateEstudianteDto) {
		return this.estudianteService.create(createEstudianteDto);
	}


	@ApiResponse({ status: 201, description: 'Estudiantes encontrados correctamente.', type: Estudiante, isArray: true })
	@ApiResponse({ status: 400, description: 'Bad Request: Verifique los datos de entrada' })
	@ApiResponse({ status: 401, description: 'Unauthorized: No tiene permisos para realizar esta acción' })
	@ApiResponse({ status: 403, description: 'Forbidden: No tiene permisos para realizar esta acción' })
	@ApiResponse({ status: 404, description: 'Not Found: No se encontraron Estudiantes' })
	@Get()
	findAll() {
		return this.estudianteService.findAll();
	}


	@ApiResponse({ status: 201, description: 'Estudiante encontrada correctamente.', type: Estudiante })
	@ApiResponse({ status: 400, description: 'Bad Request: Verifique los datos de entrada' })
	@ApiResponse({ status: 401, description: 'Unauthorized: No tiene permisos para realizar esta acción' })
	@ApiResponse({ status: 403, description: 'Forbidden: No tiene permisos para realizar esta acción' })
	@ApiResponse({ status: 404, description: 'Not Found: El Estudiante no existe' })
	@Get(':uuid')
	findOne(@Param('uuid', ParseUUIDPipe) uuid: string) {
		return this.estudianteService.findOne(uuid);
	}


	@ApiResponse({ status: 201, description: 'Estudiante actualizado correctamente.', type: Grupo })
	@ApiResponse({ status: 400, description: 'Bad Request: Verifique los datos de entrada' })
	@ApiResponse({ status: 401, description: 'Unauthorized: No tiene permisos para realizar esta acción' })
	@ApiResponse({ status: 403, description: 'Forbidden: No tiene permisos para realizar esta acción' })
	@ApiResponse({ status: 404, description: 'Not Found: El Estudiante no existe' })
	@Patch(':uuid')

	update(@Param('uuid', ParseUUIDPipe) uuid: string, @Body() updateGrupoDto: UpdateEstudianteDto) {
		return this.estudianteService.update(uuid, updateGrupoDto);
	}
}
