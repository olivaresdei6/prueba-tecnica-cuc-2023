import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString, IsUUID, Matches, MaxLength, MinLength } from 'class-validator';

export class CreateGrupoDto {

	@ApiProperty({
		example: 'Programación',
		description: 'Nombre del grupo',
		uniqueItems: true,
	})
	@IsString({message: 'El nombre del grupo debe ser una cadena de texto'})
	@MinLength(3, {message: 'El nombre del grupo debe tener al menos 3 caracteres'})
	@MaxLength(50, {message: 'El nombre del grupo debe tener máximo 50 caracteres'})
	nombre!: string;

	@ApiProperty({
		description: '2023-1',
		example: 'Periodo académico del grupo',
	})
	@IsString({message: 'El periodo académico del grupo debe ser una cadena de texto'})
	@MinLength(6, {message: 'El periodo académico del grupo debe tener al menos 6 caracteres'})
	@MaxLength(6, {message: 'El periodo académico del grupo debe tener máximo 6 caracteres'})
	@Matches(/^[0-9]{4}-[1-2]{1}$/, {message: 'El periodo académico del grupo debe tener el formato YYYY-1 o YYYY-2'})
	periodoAcademico!: string;

	@ApiProperty({
		description: 'REMOTO',
		example: 'Modalidad del grupo',
	})
	@IsString({message: 'La modalidad del grupo debe ser una cadena de texto'})
	@MinLength(6, {message: 'La modalidad del grupo debe tener al menos 6 caracteres'})
	@MaxLength(10, {message: 'La modalidad del grupo debe tener máximo 10 caracteres'})
	modalidad!: string;

	@ApiProperty({
		description: 'Código del grupo',
		example: '2023-1-REMOTO-PROGRAMACION-1',
	})
	@IsString({message: 'El código del grupo debe ser una cadena de texto'})
	@MinLength(6, {message: 'El código del grupo debe tener al menos 6 caracteres'})
	@MaxLength(50, {message: 'El código del grupo debe tener máximo 50 caracteres'})
	codigo!: string;

	@ApiProperty({
		description: 'UUID del docente que lidera el grupo',
		example: 'f1c5c3c0-3f2b-4b1a-8f3a-2b1b1b1b1b1b',
	})
	@IsString({message: 'El UUID del docente que lidera el grupo debe ser una cadena de texto'})
	@IsUUID('4', {message: 'El UUID del docente que lidera el grupo debe ser un UUID válido'})
	uuidDocente!: string;


	@ApiProperty({
		description: 'UUID de la asignatura a la que pertenece el grupo',
		example: 'f1c5c3c0-3f2b-4b1a-8f3a-2b1b1b1b1b1b',
	})
	@IsString({message: 'El UUID de la asignatura a la que pertenece el grupo debe ser una cadena de texto'})
	@IsUUID('4', {message: 'El UUID de la asignatura a la que pertenece el grupo debe ser un UUID válido'})
	uuidAsignatura!: string;

	@ApiProperty({
		description: 'UUID del programa académico al que pertenece el grupo',
		example: 'f1c5c3c0-3f2b-4b1a-8f3a-2b1b1b1b1b1b',
	})
	@IsString({message: 'El UUID del programa académico al que pertenece el grupo debe ser una cadena de texto'})
	@IsUUID('4', {message: 'El UUID del programa académico al que pertenece el grupo debe ser un UUID válido'})
	uuidProgramaAcademico!: string;
}
