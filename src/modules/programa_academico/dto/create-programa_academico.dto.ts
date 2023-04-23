import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength, MinLength } from 'class-validator';

export class CreateProgramaAcademicoDto {

	@ApiProperty({
		description: 'Nombre del programa académico',
		example: 'Ingeniería de Sistemas',
		uniqueItems: true,
	})
	@IsString({message: 'El nombre del programa académico debe ser una cadena de texto'})
	@MinLength(8, {message: 'El nombre del programa académico debe tener al menos 8 caracteres'})
	@MaxLength(50, {message: 'El nombre del programa académico debe tener máximo 50 caracteres'})
	nombre!: string;

}
