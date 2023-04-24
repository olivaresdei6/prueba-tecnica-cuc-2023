import { Body, Controller, Get, Param, ParseUUIDPipe, Patch, Post } from '@nestjs/common';
import {ApiResponse, ApiTags} from "@nestjs/swagger";
import { Grupo } from '../../frameworks/databases/mysql/entities';
import { GrupoService } from './grupo.service';
import { CreateGrupoDto } from './dto/create-grupo.dto';
import { UpdateGrupoDto } from './dto/update-grupo.dto';


@ApiTags("Grupo")

@Controller('grupo')
export class GrupoController {

	constructor(
		private readonly grupoService: GrupoService
	) {}

	@ApiResponse({ status: 201, description: 'Grupo creado correctamente.' })
	@ApiResponse({ status: 400, description: 'Bad Request: Verifique los datos de entrada' })
	@ApiResponse({ status: 401, description: 'Unauthorized: No tiene permisos para realizar esta acción' })
	@ApiResponse({ status: 403, description: 'Forbidden: No tiene permisos para realizar esta acción' })
	@ApiResponse({ status: 404, description: 'Not Found: El Grupo no existe' })
	@Post()

	create(@Body() createGrupoDto: CreateGrupoDto) {
		return this.grupoService.create(createGrupoDto);
	}


	@ApiResponse({ status: 201, description: 'Grupos encontrados correctamente.', type: Grupo, isArray: true })
	@ApiResponse({ status: 400, description: 'Bad Request: Verifique los datos de entrada' })
	@ApiResponse({ status: 401, description: 'Unauthorized: No tiene permisos para realizar esta acción' })
	@ApiResponse({ status: 403, description: 'Forbidden: No tiene permisos para realizar esta acción' })
	@ApiResponse({ status: 404, description: 'Not Found: No se encontraron Grupo' })
	@Get()
	findAll() {
		return this.grupoService.findAll();
	}


	@ApiResponse({ status: 201, description: 'Grupo encontrado correctamente.', type: Grupo })
	@ApiResponse({ status: 400, description: 'Bad Request: Verifique los datos de entrada' })
	@ApiResponse({ status: 401, description: 'Unauthorized: No tiene permisos para realizar esta acción' })
	@ApiResponse({ status: 403, description: 'Forbidden: No tiene permisos para realizar esta acción' })
	@ApiResponse({ status: 404, description: 'Not Found: El Grupo no existe' })
	@Get(':uuid')
	findOne(@Param('uuid', ParseUUIDPipe) uuid: string) {
		return this.grupoService.findOne(uuid);
	}


	@ApiResponse({ status: 201, description: 'Grupo actualizado correctamente.', type: Grupo })
	@ApiResponse({ status: 400, description: 'Bad Request: Verifique los datos de entrada' })
	@ApiResponse({ status: 401, description: 'Unauthorized: No tiene permisos para realizar esta acción' })
	@ApiResponse({ status: 403, description: 'Forbidden: No tiene permisos para realizar esta acción' })
	@ApiResponse({ status: 404, description: 'Not Found: El Grupo no existe' })
	@Patch(':uuid')

	update(@Param('uuid', ParseUUIDPipe) uuid: string, @Body() updateGrupoDto: UpdateGrupoDto) {
		return this.grupoService.update(uuid, updateGrupoDto);
	}
}
