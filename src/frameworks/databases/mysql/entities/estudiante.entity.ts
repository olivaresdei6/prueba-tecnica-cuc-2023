import { Column, Entity, ManyToOne, JoinColumn, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { ProgramaAcademico } from './';


@Entity({name: 'estudiante'})
export class Estudiante {

	@ApiProperty({
		example: 1,
		description: 'Identificador único de cada estudiante',
		uniqueItems: true
	})
	@PrimaryGeneratedColumn('increment', {type: 'bigint'})
	id?: number;

	@ApiProperty({
		description: 'UUID del estudiante',
		example: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
		uniqueItems: true,
	})
	@Column('varchar', {
		unique: true,
		nullable: false,
		length : 200
	})
	uuid?: string;

	@ApiProperty({
		example: 'Juan',
		description: 'Nombre del estudiante',
		uniqueItems: true,
	})
	@Column('varchar', {
		nullable: false,
		length : 200
	})
	nombre!: string;

	@ApiProperty({
		example: 'Pérez',
		description: 'Apellido del estudiante',
	})
	@Column('varchar', {
		nullable: false,
		length : 200
	})
	apellido!: string;

	@ApiProperty({
		example: 'Tarjeta de identidad',
		description: 'Tipo de documento del estudiante',
	})
	@Column('varchar', {
		nullable: false,
		length : 200,
		name: 'tipo_documento',
		default: 'cedula de ciudadania'
	})
	tipoDocumento?: string;

	@ApiProperty({
		example: '123456789',
		description: 'Número de documento del estudiante',
	})
	@Column('varchar', {
		nullable: false,
		length : 200,
		unique: true,
		name: 'numero_documento'
	})
	numeroDocumento!: string;

	@ApiProperty({
		description: 'Correo electrónico del estudiante',
		example: 'correo@correo.com',
		uniqueItems: true,
	})
	@Column('varchar', {
		unique: true,
		nullable: false,
		length : 200
	})
	correo!: string;

	@ApiProperty({
		example: 1,
		description: 'Estado del registro',
	})
	@Column('tinyint', {
		nullable: false,
		default: 1
	})
	estado?: number;

	@ApiProperty({
		example: 1,
		description: 'Identificador único del programa universitario al que pertenece el estudiante',
		uniqueItems: true
	})
	@ManyToOne(() => ProgramaAcademico, programaAcademico => programaAcademico.id)
	@JoinColumn({name: 'id_programa_academico'})

	idProgramaAcademico?: number | ProgramaAcademico;


}
