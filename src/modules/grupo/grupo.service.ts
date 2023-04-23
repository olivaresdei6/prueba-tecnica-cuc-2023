import { Injectable } from '@nestjs/common';
import { Asignatura, Docente, Grupo, ProgramaAcademico } from '../../frameworks/databases/mysql/entities';
import { IBaseDeDatosAbstract } from '../../frameworks/databases/mysql/core/abstract';
import { generateUUID } from '../../helpers/generate_uuid.helper';
import { CreateGrupoDto } from './dto/create-grupo.dto';
import { UpdateGrupoDto } from './dto/update-grupo.dto';
import { ExceptionsService } from '../../config/exceptions/exceptions.service';


@Injectable()
export class GrupoService {


	constructor(
		private readonly baseDeDatosService: IBaseDeDatosAbstract,
		private readonly exceptionService: ExceptionsService
	) {}


	async create(createGrupoDto: CreateGrupoDto){
		const {uuidProgramaAcademico, uuidDocente, uuidAsignatura} = createGrupoDto;
		const programaAcademico = await this.getProgramaAcademico(uuidProgramaAcademico);
		const docente = await this.getDocente(uuidDocente);
		const asignatura = await this.getAsignatura(uuidAsignatura);

		if (programaAcademico && docente && asignatura){
			await this.baseDeDatosService.grupo.create({
				codigo: createGrupoDto.codigo,
				asignatura: asignatura.id,
				docente: docente.id,
				programaAcademico: programaAcademico.id,
			 	uuid: generateUUID(),
				periodoAcademico: createGrupoDto.periodoAcademico,
				modalidad: createGrupoDto.modalidad,
				nombre: createGrupoDto.nombre
			});
			return { status: 201, message: 'Grupo creado correctamente' };
		}
	}


	async findAll() : Promise<Grupo[]> {
		return await this.baseDeDatosService.grupo.findAll();
	}


	async findOne(uuid: string) : Promise<Grupo> {
		return await this.baseDeDatosService.grupo.findOne({ where: { uuid } }, 'Grupo');
	}


	async update(uuid: string, { uuidProgramaAcademico, nombre, codigo, modalidad, periodoAcademico, uuidDocente, uuidAsignatura }: UpdateGrupoDto): Promise<Grupo> {
		if (!uuidProgramaAcademico && !nombre && !codigo && !modalidad && !periodoAcademico && !uuidDocente && !uuidAsignatura) {
			this.exceptionService.badRequestException({message: 'No se ha enviado ningun dato para actualizar'});
		} else {
			const [programaAcademico, docente, asignatura] = await Promise.all([
				uuidProgramaAcademico ? this.getProgramaAcademico(uuidProgramaAcademico) : Promise.resolve(null),
				uuidDocente ? this.getDocente(uuidDocente) : Promise.resolve(null),
				uuidAsignatura ? this.getAsignatura(uuidAsignatura) : Promise.resolve(null)
			]);

			const updateFields = {
				programaAcademico: programaAcademico?.id,
				docente: docente?.id,
				asignatura: asignatura?.id,
				nombre,
				codigo,
				modalidad,
				periodoAcademico
			};

			return await this.baseDeDatosService.grupo.update(uuid, updateFields);
		}
	}

	private async getProgramaAcademico(idProgramaAcademico: string): Promise<ProgramaAcademico>{
		return await this.baseDeDatosService.programaAcademico.findOne(
			{ where: { uuid: idProgramaAcademico } }, 'Programa Academico'
		);
	}

	private async getDocente(idDocente: string): Promise<Docente>{
		return await this.baseDeDatosService.docente.findOne(
			{ where: { uuid: idDocente } }, 'Docente'
		);
	}

	private async getAsignatura(idAsignatura: string): Promise<Asignatura>{
		return await this.baseDeDatosService.asignatura.findOne(
			{ where: { uuid: idAsignatura } }, 'Asignatura'
		);
	}

}
