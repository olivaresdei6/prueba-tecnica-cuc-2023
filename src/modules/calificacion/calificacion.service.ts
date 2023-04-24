import { Injectable } from '@nestjs/common';
import { Calificacion, Estudiante, Grupo, ProgramaAcademico } from '../../frameworks/databases/mysql/entities';
import { IBaseDeDatosAbstract } from '../../frameworks/databases/mysql/core/abstract';
import { ExceptionsService } from '../../config/exceptions/exceptions.service';
import { RegistrarEstudianteEnElGrupoDto } from './dto/registrar_estudiante_en_el_grupo.dto';


@Injectable()

export class CalificacionService {


	constructor(
		private readonly baseDeDatosService: IBaseDeDatosAbstract,
		private readonly exceptionService: ExceptionsService
	) {}


	// Método que calcula cuanto le falta al estudiante para aprobar el curso
	async calcularNotaCorte(uuid: string) : Promise<{ message: string }> {
		const calificacion = await this.baseDeDatosService.calificacion.findOne({ where: { uuid } }, 'Calificación');
		const notaMinima = 3.0;
		const notaMaxima = 5.0;
		const notaCorte1 = calificacion.notaCorte1;
		const notaCorte2 = calificacion.notaCorte2;

		// Se calcula cuanto le falta al estudiante para aprobar el curso solo si tiene notas en los cortes 1 y 2
		if (notaCorte1 && notaCorte2) {
			const notaCorte3Necesaria = (notaMinima - (notaCorte1 * 0.3) - (notaCorte2 * 0.3)) / 0.4;
			// Si la nota que necesita en el corte 3 es mayor a 5.0, entonces no puede aprobar el curso, ya que la nota maxima es 5.0
			if (notaCorte3Necesaria > notaMaxima || notaCorte3Necesaria < 0) {
				this.exceptionService.badRequestException({message: 'Notas no validas'});
			}else{
				return {
					message: `La nota que necesita sacar en el corte 3 para ganar la materia es de ${notaCorte3Necesaria}`,
				}
			}
		}

	}

	async agregarNotaCorte1(uuid: string, notaCorte1: number) : Promise<{ message: string }> {
		const calificacion = await this.baseDeDatosService.calificacion.findOne({ where: { uuid } }, 'Calificación');
		await this.baseDeDatosService.calificacion.update(calificacion.uuid, { notaCorte1 });
		return { message: 'Nota agregada correctamente' };
	}

	async agregarNotaCorte2 (uuid: string, notaCorte2: number) : Promise<{ message: string }> {
		const calificacion = await this.baseDeDatosService.calificacion.findOne({ where: { uuid } }, 'Calificación');
		await this.baseDeDatosService.calificacion.update(calificacion.uuid, { notaCorte2 });
		return { message: 'Nota agregada correctamente' };
	}

	async agregarNotaCorte3 (uuid: string, notaCorte3: number) : Promise<{ message: string }> {
		const calificacion = await this.baseDeDatosService.calificacion.findOne({ where: { uuid } }, 'Calificación');
		await this.baseDeDatosService.calificacion.update(calificacion.uuid, { notaCorte3 });
		return { message: 'Nota agregada correctamente' };
	}

	// Listar todas las calificaciones de los estudiantes de un grupo
	async listarCalificacionesGrupo(uuid: string) {
		const grupo = await this.getGrupo(uuid);
		const programaAcademico = await this.baseDeDatosService.programaAcademico.findOne({where: {id: grupo.programaAcademico}}, 'ProgramaAcademico');
		const asignatura = await this.baseDeDatosService.asignatura.findOne({where: {id: grupo.asignatura}}, 'Asignatura');
		// A cada calificacion se le agrega el nombre del estudiante, el nombre del grupo, el nombre del programa academico y el nombre de la materia
		const calificaciones = await this.baseDeDatosService.calificacion.findBy({uuid});
		const docente = await this.baseDeDatosService.docente.findOne({where: {id: grupo.docente}}, 'Docente');
		const data = [
			[programaAcademico],
			[grupo],
			[asignatura],
			[docente],

		]
		let calificacionesConNombres;
		// Se hace un map para agregarle los datos del estudiante a cada calificacion
		// Se hace un Promise.all para que se resuelvan todas las promesas de una vez
		calificacionesConNombres= await Promise.all(calificaciones.map(async calificacion => {
			const {	nombre,apellido, correo,	tipoDocumento,	numeroDocumento, uuid, programaAcademico } = await this.baseDeDatosService.estudiante.findOne({where: {id: calificacion.estudiante}}, 'Estudiante', false);


			const {notaCorte1, notaCorte2, notaCorte3} = calificacion;
			return [
				{estudiante :[nombre, apellido, correo, tipoDocumento, numeroDocumento, uuid, programaAcademico]},
				{calificacion: [notaCorte1, notaCorte2, notaCorte3, calificacion.uuid]}
			];
		}));
		data.push(calificacionesConNombres);
		return data;
	}

	async registrarEstudiantesGrupo(uuid: string, estudiantes: RegistrarEstudianteEnElGrupoDto)  {
		// Se verifica que el grupo exista
		const grupo = await this.getGrupo(uuid);
		// Se extraen las calificaciones del grupo
		const calificaciones = await this.baseDeDatosService.calificacion.findBy({grupo: grupo.id});
		// arreglo que contiene los estudiantes que se van a registrar
		let estudiantesHaRegistrar: Estudiante[] = [];
		// Se verifica que los estudiantes que se quieren registrar no esten registrados en el grupo con los datos del dto
		for (const estudiante of estudiantes.estudiantesGrupos) {
			// Se extrae el estudiante de la base de datos
			const estudianteRegistrar = await this.baseDeDatosService.estudiante.findOne({where: {uuid: estudiante.uuidEstudiante}}, 'Estudiante', false);
			for (const calificacion of calificaciones) {
				// Se extrae el id del estudiante de la calificacion
				const idCalificacionEstudiante = calificacion.estudiante;
				// Se verifica que el estudiante no este registrado en el grupo, que no exista en el mismo grupo y que exista en la base de datos
				if (!(idCalificacionEstudiante === estudianteRegistrar.id) && !(calificacion.grupo === grupo.id) && estudianteRegistrar) {
					estudiantesHaRegistrar.push(estudianteRegistrar);
				}
			}
		}

		// Se registran los estudiantes en el grupo y se retorna un arreglo con los estudiantes registrados
		const estudiantesRegistrados = await Promise.all(estudiantesHaRegistrar.map(async estudiante => {
			return await this.baseDeDatosService.calificacion.create({
				estudiante: estudiante.id,
				grupo: grupo.id,
			});
		}));
		return { message: 'Estudiantes registrados correctamente', estudiantesRegistrados };
	}


	async findAll() : Promise<Calificacion[]> {
		return await this.baseDeDatosService.calificacion.findAll();
	}

	async findOne(uuid: string) : Promise<Calificacion> {
		return await this.baseDeDatosService.calificacion.findOne({ where: { uuid } }, 'Calificación');
	}


	private async getGrupo(uuid: string): Promise<Grupo> {
		const grupo: Grupo = await this.baseDeDatosService.grupo.findOne({ where: { uuid } }, 'Grupo');
		if (!grupo) {
			this.exceptionService.notFoundException({message: 'El grupo no existe'});
		}
		return grupo;
	}

}
