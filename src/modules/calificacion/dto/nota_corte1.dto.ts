import { ApiProperty } from '@nestjs/swagger';
import { IsDecimal, IsEmail, IsOptional, IsString, IsUUID, Matches, MaxLength, MinLength } from 'class-validator';

export class NotaCorte1Dto {

	@ApiProperty({
		example: 3.6,
		description: 'Nota del estudiante en el 1° corte',
	})
	@IsDecimal({decimal_digits: '1,1'}, {message: 'La nota debe ser un número decimal entre 0 y 5'})
	@Matches(/^[0-5](\.[0-9])?$/, {message: 'La nota debe ser un número decimal entre 0 y 5'})
	@IsOptional()
	notaCorte1?: number;

	@ApiProperty({
		example: 'f1c5c3c0-3f2b-4b1a-8f3a-2b1b1b1b1b1b',
		description: 'UUID del estudiante',
	})
	@IsString({message: 'El UUID del estudiante debe ser una cadena de texto'})
	@IsUUID('4', {message: 'El UUID del estudiante debe ser un UUID válido'})
	uuidEstudiante!: string;

	@ApiProperty({
		example: 'f1c5c3c0-3f2b-4b1a-8f3a-2b1b1b1b1b1b',
		description: 'UUID del grupo al que pertenece el estudiante',
	})
	@IsString({message: 'El UUID del grupo al que pertenece el estudiante debe ser una cadena de texto'})
	@IsUUID('4', {message: 'El UUID del grupo al que pertenece el estudiante debe ser un UUID válido'})
	uuidGrupo!: string;

}
