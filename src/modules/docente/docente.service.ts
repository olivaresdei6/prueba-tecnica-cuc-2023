import { Injectable } from "@nestjs/common";
import {ProgramaAcademico} from '../../frameworks/databases/mysql/entities';
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
		await this.databaseService.docente.create({...createDocenteDto, uuid: generateUUID()});
		return { status: 201, message: 'Docente creado correctamente' };
	}


	async findAll() : Promise<ProgramaAcademico[]> {
		return await this.databaseService.docente.findAll();
	}


	async findOne(uuid: string) : Promise<ProgramaAcademico> {
		return await this.databaseService.docente.findOne({ where: { uuid } }, 'Docente');

	}


	async update(uuid: string, updateDocenteDto: UpdateDocenteDto) : Promise<ProgramaAcademico> {
		return await this.databaseService.docente.update(uuid, updateDocenteDto);
	}

}
