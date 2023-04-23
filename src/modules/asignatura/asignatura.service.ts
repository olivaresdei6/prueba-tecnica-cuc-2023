import { Injectable } from "@nestjs/common";
import { Asignatura, ProgramaAcademico } from '../../frameworks/databases/mysql/entities';
import { IBaseDeDatosAbstract } from "../../frameworks/databases/mysql/core/abstract";
import { generateUUID } from '../../helpers/generate_uuid.helper';
import { CreateAsignaturaDto } from './dto/create-asignatura.dto';
import { UpdateAsignaturaDto } from './dto/update-asignatura.dto';
import { ExceptionsService } from '../../config/exceptions/exceptions.service';


@Injectable()
export class AsignaturaService {


	constructor(
		private readonly baseDeDatosService: IBaseDeDatosAbstract,
		private readonly exceptionService: ExceptionsService
	) {}


	async create(createAsignaturaDto: CreateAsignaturaDto){
		const {uuidProgramaAcademico, nombre} = createAsignaturaDto;
		const programaAcademico = await this.getProgramaAcademico(uuidProgramaAcademico);

		if (programaAcademico){
			await this.baseDeDatosService.asignatura.create({
				nombre,
			 	uuid: generateUUID(),
				programaAcademico: programaAcademico.id
			});
			return { status: 201, message: 'Asignatura creada correctamente' };
		}
	}


	async findAll() : Promise<Asignatura[]> {
		return await this.baseDeDatosService.asignatura.findAll();
	}


	async findOne(uuid: string) : Promise<Asignatura> {
		return await this.baseDeDatosService.asignatura.findOne({ where: { uuid } }, 'Asignatura');
	}


	async update(uuid: string, updateDocenteDto: UpdateAsignaturaDto) : Promise<Asignatura> {
		const {uuidProgramaAcademico, nombre} = updateDocenteDto;
		if (!uuidProgramaAcademico && !nombre){
			this.exceptionService.badRequestException({message: 'No se ha enviado ningun dato para actualizar'});
		}
		else if (uuidProgramaAcademico){
			const programaAcademico = await this.getProgramaAcademico(uuidProgramaAcademico);
			if (programaAcademico){
				await this.baseDeDatosService.asignatura.update(uuid, {
					nombre,
					programaAcademico: programaAcademico.id
				});
			}
		}else{
			return await this.baseDeDatosService.asignatura.update(uuid, {nombre});
		}
	}


	private async getProgramaAcademico(idProgramaAcademico: string): Promise<ProgramaAcademico>{
		const programaAcademico = await this.baseDeDatosService.programaAcademico.findOne(
			{where: {uuid: idProgramaAcademico}}, 'Programa Academico'
		);
		console.log('programaAcademico', programaAcademico);
		return programaAcademico;
	}

}
