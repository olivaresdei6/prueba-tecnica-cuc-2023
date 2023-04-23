import * as entities from "../../entities";
import * as abstract from "./";

export abstract class IBaseDeDatosAbstract {
	public abstract asignatura: abstract.IAsignaturaRepository<entities.Asignatura>;
	public abstract calificacion: abstract.ICalificacionRepository<entities.Calificacion>;
	public abstract grupo: abstract.IGrupoRepository<entities.Grupo>;
	public abstract docente: abstract.IDocenteRepository<entities.Docente>;
	public abstract estudiante: abstract.IEstudianteRepository<entities.Estudiante>;
	public abstract programaAcademico: abstract.IProgramaUniversitarioRepository<entities.ProgramaAcademico>;
}
