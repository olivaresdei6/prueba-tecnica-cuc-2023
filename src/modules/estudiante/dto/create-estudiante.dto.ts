import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString, IsUUID, Matches, MaxLength, MinLength } from 'class-validator';

export class CreateEstudianteDto {

	@ApiProperty({
		example: 'Juan',
		description: 'Nombre del estudiante',
	})
	@IsString({message: 'El nombre del estudiante debe ser una cadena de texto'})
	@MinLength(3, {message: 'El nombre del estudiante debe tener al menos 3 caracteres'})
	@MaxLength(50, {message: 'El nombre del estudiante debe tener máximo 50 caracteres'})
	nombre!: string;

	@ApiProperty({
		example: 'Perez',
		description: 'Apellido del estudiante',
	})
	@IsString({message: 'El apellido del estudiante debe ser una cadena de texto'})
	@MinLength(3, {message: 'El apellido del estudiante debe tener al menos 3 caracteres'})
	@MaxLength(50, {message: 'El apellido del estudiante debe tener máximo 50 caracteres'})
	apellido!: string;

	@ApiProperty({
		example: 'cedula de ciudadania',
		description: 'Tipo de documento del estudiante',
	})
	@IsString({message: 'El tipo de documento del estudiante debe ser una cadena de texto'})
	@MinLength(3, {message: 'El tipo de documento del estudiante debe tener al menos 3 caracteres'})
	@MaxLength(50, {message: 'El tipo de documento del estudiante debe tener máximo 50 caracteres'})
	@IsOptional()
	tipoDocumento?: string;

	@ApiProperty({
		example: '123456789',
		description: 'Número de documento del estudiante',
	})
	@IsString({message: 'El número de documento del estudiante debe ser una cadena de texto'})
	@MinLength(3, {message: 'El número de documento del estudiante debe tener al menos 3 caracteres'})
	@MaxLength(50, {message: 'El número de documento del estudiante debe tener máximo 50 caracteres'})
	numeroDocumento!: string;

	@ApiProperty({
		example: 'correo@correo.com',
		description: 'Correo electrónico del estudiante',
	})
	@IsString({message: 'El correo electrónico del estudiante debe ser una cadena de texto'})
	@MinLength(3, {message: 'El correo electrónico del estudiante debe tener al menos 3 caracteres'})
	@MaxLength(50, {message: 'El correo electrónico del estudiante debe tener máximo 50 caracteres'})
	@IsEmail({}, {message: 'El correo electrónico del estudiante debe ser un correo electrónico válido'})
	correo!: string;

	@ApiProperty({
		description: 'UUID del programa académico al que pertenece el grupo',
		example: 'f1c5c3c0-3f2b-4b1a-8f3a-2b1b1b1b1b1b',
	})
	@IsString({message: 'El UUID del programa académico al que pertenece el grupo debe ser una cadena de texto'})
	@IsUUID('4', {message: 'El UUID del programa académico al que pertenece el grupo debe ser un UUID válido'})
	uuidProgramaAcademico!: string;
}
