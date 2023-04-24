import { Injectable } from '@nestjs/common';
import { Estudiante, Grupo, ProgramaAcademico } from '../../frameworks/databases/mysql/entities';
import { IBaseDeDatosAbstract } from '../../frameworks/databases/mysql/core/abstract';
import { generateUUID } from '../../helpers/generate_uuid.helper';
import { CreateEstudianteDto } from './dto/create-estudiante.dto';
import { UpdateEstudianteDto } from './dto/update-estudiante.dto';
import { ExceptionsService } from '../../config/exceptions/exceptions.service';


@Injectable()
export class EstudianteService {


	constructor(
		private readonly baseDeDatosService: IBaseDeDatosAbstract,
		private readonly exceptionService: ExceptionsService
	) {}


	async create(createEstudianteDto: CreateEstudianteDto){
		const {uuidProgramaAcademico} = createEstudianteDto;
		const programaAcademico = await this.getProgramaAcademico(uuidProgramaAcademico);
		if (programaAcademico){
			await this.baseDeDatosService.estudiante.create({
				...createEstudianteDto,
				programaAcademico: programaAcademico.id,
			 	uuid: generateUUID(),
			});
			return { status: 201, message: 'Estudiante creado correctamente' };
		}
	}


	async findAll() : Promise<Estudiante[]> {
		return await this.baseDeDatosService.estudiante.findAll();
	}


	async findOne(uuid: string) : Promise<Estudiante> {
		return await this.baseDeDatosService.estudiante.findOne({ where: { uuid } }, 'Estudiante');
	}


	async update(uuid: string, updateEstudianteDto: UpdateEstudianteDto): Promise<Estudiante> {
		const {uuidProgramaAcademico, nombre, apellido, correo, numeroDocumento, tipoDocumento} = updateEstudianteDto;
		if (!uuidProgramaAcademico && !nombre && !apellido && !correo && !numeroDocumento && !tipoDocumento) {
			this.exceptionService.badRequestException({message: 'No se ha enviado ningun dato para actualizar'});
		} else {
			if (uuidProgramaAcademico) {
				const programaAcademico: ProgramaAcademico = await this.getProgramaAcademico(uuidProgramaAcademico);
				if (programaAcademico) {
					return await this.baseDeDatosService.estudiante.update(uuid, {
						...updateEstudianteDto,
						programaAcademico: programaAcademico.id
					});
				}
			}
			return await this.baseDeDatosService.estudiante.update(uuid, updateEstudianteDto);
		}
	}

	private async getProgramaAcademico(idProgramaAcademico: string): Promise<ProgramaAcademico>{
		return await this.baseDeDatosService.programaAcademico.findOne(
			{ where: { uuid: idProgramaAcademico } }, 'Programa Academico'
		);
	}

}
