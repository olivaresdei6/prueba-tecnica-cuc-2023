import { Injectable } from "@nestjs/common";
import { CreateProgramaAcademicoDto } from './dto/create-programa_academico.dto';
import { UpdateProgramaAcademicoDto } from './dto/update-programa_academico.dto';
import {ProgramaAcademico} from '../../frameworks/databases/mysql/entities';
import { IBaseDeDatosAbstract } from "../../frameworks/databases/mysql/core/abstract";
import { generateUUID } from '../../helpers/generate_uuid.helper';


@Injectable()
export class ProgramaAcademicoService {


	constructor(
		private readonly databaseService: IBaseDeDatosAbstract
	) {}


	async create(createProgramaAcademicoDto: CreateProgramaAcademicoDto){
		await this.databaseService.programaAcademico.create({...createProgramaAcademicoDto, uuid: generateUUID()});
		return { status: 201, message: 'Programa creado correctamente' };
	}


	async findAll() : Promise<ProgramaAcademico[]> {
		return await this.databaseService.programaAcademico.findAll();
	}


	async findOne(uuid: string) : Promise<ProgramaAcademico> {
		return await this.databaseService.programaAcademico.findOne({ where: { uuid } }, 'Peograma Academico');

	}


	async update(uuid: string, updateProgramaAcademicoDto: UpdateProgramaAcademicoDto) : Promise<ProgramaAcademico> {
		return await this.databaseService.programaAcademico.update(uuid, updateProgramaAcademicoDto);
	}

}
