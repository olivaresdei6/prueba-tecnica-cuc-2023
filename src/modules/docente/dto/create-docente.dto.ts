import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString, IsUUID, MaxLength, MinLength } from 'class-validator';

export class CreateDocenteDto {

	@ApiProperty({
		example: 'Juan',
		description: 'Nombre del docente',
		uniqueItems: true,
	})
	@IsString({message: 'El nombre del docente debe ser una cadena de texto'})
	@MinLength(3, {message: 'El nombre del docente debe tener al menos 3 caracteres'})
	@MaxLength(50, {message: 'El nombre del docente debe tener máximo 50 caracteres'})
	nombre!: string;

	@ApiProperty({
		example: 'Pérez',
		description: 'Apellido del docente',
	})
	@IsString({message: 'El apellido del docente debe ser una cadena de texto'})
	@MinLength(3, {message: 'El apellido del docente debe tener al menos 3 caracteres'})
	@MaxLength(50, {message: 'El apellido del docente debe tener máximo 50 caracteres'})
	apellido!: string;

	@ApiProperty({
		example: 'Cédula de ciudadanía',
		description: 'Tipo de documento del docente',
	})
	@IsString({message: 'El tipo de documento del docente debe ser una cadena de texto'})
	@MinLength(3, {message: 'El tipo de documento del docente debe tener al menos 3 caracteres'})
	@MaxLength(50, {message: 'El tipo de documento del docente debe tener máximo 50 caracteres'})
	@IsOptional()
	tipoDocumento?: string;

	@ApiProperty({
		example: '123456789',
		description: 'Número de documento del docente',
	})
	@IsString({message: 'El número de documento del docente debe ser una cadena de texto'})
	@MinLength(3, {message: 'El número de documento del docente debe tener al menos 3 caracteres'})
	@MaxLength(50, {message: 'El número de documento del docente debe tener máximo 50 caracteres'})
	numeroDocumento!: string;

	@ApiProperty({
		example: 'correo@correo.co,',
		description: 'Correo electrónico del docente',
	})
	@IsString({message: 'El correo electrónico del docente debe ser una cadena de texto'})
	@MinLength(3, {message: 'El correo electrónico del docente debe tener al menos 3 caracteres'})
	@MaxLength(50, {message: 'El correo electrónico del docente debe tener máximo 50 caracteres'})
	@IsEmail({}, {message: 'El correo electrónico del docente debe ser un correo electrónico válido'})
	correo!: string;

	@ApiProperty({
		description: 'UUID del programa académico al que pertenece el docente',
		example: 'f1c5c3c0-3f2b-4b1a-8f3a-2b1b1b1b1b1b',
	})
	@IsString({message: 'El UUID del programa académico al que pertenece el docente debe ser una cadena de texto'})
	@IsUUID('4', {message: 'El UUID del programa académico al que pertenece el docente debe ser un UUID válido'})
	uuidProgramaAcademico!: string;



}
