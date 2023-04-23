import { Body, Controller, Get, Param, ParseIntPipe, ParseUUIDPipe, Patch, Post } from '@nestjs/common';
import {ApiResponse, ApiTags} from "@nestjs/swagger";
import {ProgramaAcademico} from '../../frameworks/databases/mysql/entities';
import {ProgramaAcademicoService} from "./programa_academico.service";
import {CreateProgramaAcademicoDto} from "./dto/create-programa_academico.dto";
import {UpdateProgramaAcademicoDto} from "./dto/update-programa_academico.dto";


@ApiTags("Programa Académico")

@Controller('programa_academico')
export class ProgramaAcademicoController {

	constructor(
		private readonly programaAcademicoService: ProgramaAcademicoService
	) {}

	@ApiResponse({ status: 201, description: 'Programa Académico creado correctamente.' })
	@ApiResponse({ status: 400, description: 'Bad Request: Verifique los datos de entrada' })
	@ApiResponse({ status: 401, description: 'Unauthorized: No tiene permisos para realizar esta acción' })
	@ApiResponse({ status: 403, description: 'Forbidden: No tiene permisos para realizar esta acción' })
	@ApiResponse({ status: 404, description: 'Not Found: El programa académico no existe' })
	@Post()

	create(@Body() createProgramaAcademicoDto: CreateProgramaAcademicoDto) {
		return this.programaAcademicoService.create(createProgramaAcademicoDto);
	}


	@ApiResponse({ status: 201, description: 'Programas Académicos encontrados correctamente.', type: ProgramaAcademico, isArray: true })
	@ApiResponse({ status: 400, description: 'Bad Request: Verifique los datos de entrada' })
	@ApiResponse({ status: 401, description: 'Unauthorized: No tiene permisos para realizar esta acción' })
	@ApiResponse({ status: 403, description: 'Forbidden: No tiene permisos para realizar esta acción' })
	@ApiResponse({ status: 404, description: 'Not Found: No se encontraron programas académicos' })
	@Get()

	findAll() {
		return this.programaAcademicoService.findAll();
	}


	@ApiResponse({ status: 201, description: 'Programa Académico encontrado correctamente.', type: ProgramaAcademico })
	@ApiResponse({ status: 400, description: 'Bad Request: Verifique los datos de entrada' })
	@ApiResponse({ status: 401, description: 'Unauthorized: No tiene permisos para realizar esta acción' })
	@ApiResponse({ status: 403, description: 'Forbidden: No tiene permisos para realizar esta acción' })
	@ApiResponse({ status: 404, description: 'Not Found: El programa académico no existe' })
	@Get(':uuid')
	findOne(@Param('uuid', ParseUUIDPipe) uuid: string) {
		return this.programaAcademicoService.findOne(uuid);
	}


	@ApiResponse({ status: 201, description: 'Programa Académico actualizado correctamente.', type: ProgramaAcademico })
	@ApiResponse({ status: 400, description: 'Bad Request: Verifique los datos de entrada' })
	@ApiResponse({ status: 401, description: 'Unauthorized: No tiene permisos para realizar esta acción' })
	@ApiResponse({ status: 403, description: 'Forbidden: No tiene permisos para realizar esta acción' })
	@ApiResponse({ status: 404, description: 'Not Found: El programa académico no existe' })
	@Patch(':uuid')

	update(@Param('uuid', ParseUUIDPipe) uuid: string, @Body() updateProgramaAcademicoDto: UpdateProgramaAcademicoDto) {
		return this.programaAcademicoService.update(uuid, updateProgramaAcademicoDto);
	}
}
