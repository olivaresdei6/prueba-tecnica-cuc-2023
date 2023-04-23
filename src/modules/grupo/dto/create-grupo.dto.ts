import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString, IsUUID, MaxLength, MinLength } from 'class-validator';

export class CreateGrupoDto {

	@ApiProperty({
		example: 'Programación',
		description: 'Nombre de la asignatura',
		uniqueItems: true,
	})
	@IsString({message: 'El nombre de la asignatura debe ser una cadena de texto'})
	@MinLength(3, {message: 'El nombre de la asignatura debe tener al menos 3 caracteres'})
	@MaxLength(50, {message: 'El nombre de la asignatura debe tener máximo 50 caracteres'})
	nombre!: string;

	@ApiProperty({
		description: 'UUID del programa académico al que pertenece la asignatura',
		example: 'f1c5c3c0-3f2b-4b1a-8f3a-2b1b1b1b1b1b',
	})
	@IsString({message: 'El UUID del programa académico al que pertenece la asignatura debe ser una cadena de texto'})
	@IsUUID('all', {message: 'El UUID del programa académico al que pertenece la asignatura debe ser un UUID válido'})
	uuidProgramaAcademico!: string;


}
