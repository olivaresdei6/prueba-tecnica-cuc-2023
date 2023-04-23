import {Injectable} from "@nestjs/common";

import {InjectRepository} from "@nestjs/typeorm";
import {DataSource, Repository} from "typeorm";

import * as abstract from "./core/abstract";
import * as repositories from "./repositories";
import * as entities from "./entities";

import {ExceptionsService} from "../../../config/exceptions/exceptions.service";

@Injectable()
export class MysqlService implements abstract.IBaseDeDatosAbstract {
	public docente: abstract.IDocenteRepository<entities.Docente>;
	public programaAcademico: abstract.IProgramaUniversitarioRepository<entities.ProgramaAcademico>;
	public asignatura: abstract.IAsignaturaRepository<entities.Asignatura>;
	public calificacion: abstract.ICalificacionRepository<entities.Calificacion>;
	public grupo: abstract.IGrupoRepository<entities.Grupo>;
	public estudiante: abstract.IEstudianteRepository<entities.Estudiante>;

	constructor(
		@InjectRepository(entities.Docente) private readonly docenteRepository: Repository<entities.Docente>,
		@InjectRepository(entities.ProgramaAcademico) private readonly programaUniversitarioRepository: Repository<entities.ProgramaAcademico>,
		@InjectRepository(entities.Asignatura) private readonly asignaturaRepository: Repository<entities.Asignatura>,
		@InjectRepository(entities.Calificacion) private readonly calificacionRepository: Repository<entities.Calificacion>,
		@InjectRepository(entities.Grupo) private readonly cursoRepository: Repository<entities.Grupo>,
		@InjectRepository(entities.Estudiante) private readonly estudianteRepository: Repository<entities.Estudiante>,
		private readonly exceptionsService: ExceptionsService,
		private readonly dataSource: DataSource,
	) {}

	public async onApplicationBootstrap() {
		this.docente = new repositories.MysqlDocenteRepository(this.docenteRepository, this.dataSource, this.exceptionsService);
		this.programaAcademico = new repositories.MysqlProgramaUniversitarioRepository(this.programaUniversitarioRepository, this.dataSource, this.exceptionsService);
		this.asignatura = new repositories.MysqlAsignaturaRepository(this.asignaturaRepository, this.dataSource, this.exceptionsService);
		this.calificacion = new repositories.MysqlCalificacionRepository(this.calificacionRepository, this.dataSource, this.exceptionsService);
		this.grupo = new repositories.MysqlGrupoRepository(this.cursoRepository, this.dataSource, this.exceptionsService);
		this.estudiante = new repositories.MysqlEstudianteRepository(this.estudianteRepository, this.dataSource, this.exceptionsService);
	}
}

