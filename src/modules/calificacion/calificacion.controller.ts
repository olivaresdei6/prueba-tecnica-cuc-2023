import { Body, Controller, Get, Param, ParseUUIDPipe, Patch, Post } from '@nestjs/common';
import {ApiResponse, ApiTags} from "@nestjs/swagger";
import { Calificacion, Estudiante, Grupo } from '../../frameworks/databases/mysql/entities';
import { CalificacionService } from './calificacion.service';
import { NotaCorte1Dto } from './dto/nota_corte1.dto';
import { NotaCorte2Dto } from './dto/nota_corte2.dto';
import { NotaCorte3Dto } from './dto/nota_corte3.dto';


@ApiTags("Estudiante")

@Controller('estudiante')
export class CalificacionController {

	constructor(
		private readonly calificacionService: CalificacionService
	) {}

	@ApiResponse({ status: 201, description: 'Calificación del corte 1 creada correctamente.' })
	@ApiResponse({ status: 400, description: 'Bad Request: Verifique los datos de entrada' })
	@ApiResponse({ status: 401, description: 'Unauthorized: No tiene permisos para realizar esta acción' })
	@ApiResponse({ status: 403, description: 'Forbidden: No tiene permisos para realizar esta acción' })
	@ApiResponse({ status: 404, description: 'Not Found: La calificación del corte 1 no existe' })
	@Post()

	addCorte1(@Body() corte1Dto:NotaCorte1Dto) {
		return this.calificacionService.agregarNotaCorte1(corte1Dto.uuidEstudiante, corte1Dto.notaCorte1);
	}

	@ApiResponse({ status: 201, description: 'Calificación del corte 2 creada correctamente.' })
	@ApiResponse({ status: 400, description: 'Bad Request: Verifique los datos de entrada' })
	@ApiResponse({ status: 401, description: 'Unauthorized: No tiene permisos para realizar esta acción' })
	@ApiResponse({ status: 403, description: 'Forbidden: No tiene permisos para realizar esta acción' })
	@ApiResponse({ status: 404, description: 'Not Found: La calificación del corte 2 no existe' })
	@Post()

	addCorte2(@Body() notaCorte2Dto: NotaCorte2Dto) {
		return this.calificacionService.agregarNotaCorte2(notaCorte2Dto.uuidEstudiante, notaCorte2Dto.notaCorte2);
	}

	@ApiResponse({ status: 201, description: 'Calificación del corte 3 creada correctamente.' })
	@ApiResponse({ status: 400, description: 'Bad Request: Verifique los datos de entrada' })
	@ApiResponse({ status: 401, description: 'Unauthorized: No tiene permisos para realizar esta acción' })
	@ApiResponse({ status: 403, description: 'Forbidden: No tiene permisos para realizar esta acción' })
	@ApiResponse({ status: 404, description: 'Not Found: La calificación del corte 3 no existe' })
	@Post()

	addCorte3(@Body() notaCorte3Dto: NotaCorte3Dto) {
		return this.calificacionService.agregarNotaCorte3(notaCorte3Dto.uuidEstudiante, notaCorte3Dto.notaCorte3);
	}


	@ApiResponse({ status: 201, description: 'Calificaciones encontradas correctamente.' })
	@ApiResponse({ status: 400, description: 'Bad Request: Verifique los datos de entrada' })
	@ApiResponse({ status: 401, description: 'Unauthorized: No tiene permisos para realizar esta acción' })
	@ApiResponse({ status: 403, description: 'Forbidden: No tiene permisos para realizar esta acción' })
	@ApiResponse({ status: 404, description: 'Not Found: No se encontraron Calificaciones' })
	@Get()
	findAll() {
		return this.calificacionService.findAll();
	}


	@ApiResponse({ status: 201, description: 'Calificaciones encontradas correctamente.'})
	@ApiResponse({ status: 400, description: 'Bad Request: Verifique los datos de entrada' })
	@ApiResponse({ status: 401, description: 'Unauthorized: No tiene permisos para realizar esta acción' })
	@ApiResponse({ status: 403, description: 'Forbidden: No tiene permisos para realizar esta acción' })
	@ApiResponse({ status: 404, description: 'Not Found: No se encontraron Calificaciones' })
	@Get('/calificaciones_de_un_grupo/:uuid')
	findOneGrupo(@Param('uuid', ParseUUIDPipe) uuid: string) {
		return this.calificacionService.listarCalificacionesGrupo(uuid);
	}

	@ApiResponse({ status: 201, description: 'Calificaciones encontradas correctamente.' })
	@ApiResponse({ status: 400, description: 'Bad Request: Verifique los datos de entrada' })
	@ApiResponse({ status: 401, description: 'Unauthorized: No tiene permisos para realizar esta acción' })
	@ApiResponse({ status: 403, description: 'Forbidden: No tiene permisos para realizar esta acción' })
	@ApiResponse({ status: 404, description: 'Not Found: No se encontraron Calificaciones' })
	@Get('/calificaciones_de_un_estudiante/:uuid')
	findOneEstudiante(@Param('uuid', ParseUUIDPipe) uuid: string) {
		return this.calificacionService.findOne(uuid);
	}

	@ApiResponse({ status: 201, description: 'Nota calculada correctamente.' })
	@ApiResponse({ status: 400, description: 'Bad Request: Verifique los datos de entrada' })
	@ApiResponse({ status: 401, description: 'Unauthorized: No tiene permisos para realizar esta acción' })
	@ApiResponse({ status: 403, description: 'Forbidden: No tiene permisos para realizar esta acción' })
	@ApiResponse({ status: 404, description: 'Not Found: La calificación del corte 1 no existe' })
	@Patch('/calcular_nota/:uuid')
	calcularNota(@Param('uuid', ParseUUIDPipe) uuid: string) {
		return this.calificacionService.calcularNotaCorte(uuid);
	}

	// TODO: Falta el método para recibir un arreglo de estudiantes que perteneceran a un grupo y crearles el registro de calificaciones


}
