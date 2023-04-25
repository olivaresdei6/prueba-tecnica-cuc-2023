import { Injectable } from "@nestjs/common";
import { Docente } from '../../frameworks/databases/mysql/entities';
import { IBaseDeDatosAbstract } from "../../frameworks/databases/mysql/core/abstract";
import { generateUUID } from '../../helpers/generate_uuid.helper';
import { CreateDocenteDto } from './dto/create-docente.dto';
import { UpdateDocenteDto } from './dto/update-docente.dto';


@Injectable()
export class DocenteService {


	constructor(
		private readonly databaseService: IBaseDeDatosAbstract
	) {}


	async create(createDocenteDto: CreateDocenteDto){
		const { id } = await this.databaseService.programaAcademico.findOne({ where: { uuid: createDocenteDto.uuidProgramaAcademico } }, 'Programa Academico');
		await this.databaseService.docente.create({...createDocenteDto, uuid: generateUUID(), programaAcademico: id});
		return { status: 201, message: 'Docente creado correctamente' };
	}


	async findAll() : Promise<Docente[]> {
		return await this.databaseService.docente.findAll();
	}


	async findOne(uuid: string) : Promise<Docente> {
		return await this.databaseService.docente.findOne({ where: { uuid } }, 'Docente');

	}


	async update(uuid: string, updateDocenteDto: UpdateDocenteDto) : Promise<Docente> {
		return await this.databaseService.docente.update(uuid, updateDocenteDto);
	}

}
