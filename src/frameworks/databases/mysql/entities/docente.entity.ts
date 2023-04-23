import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Grupo } from './';


@Entity('docente')
export class Docente {
	@ApiProperty({
		example: 1,
		description: 'Identificador único de cada docente',
		uniqueItems: true
	})
	@PrimaryGeneratedColumn('increment', {type: 'bigint'})
	id?: number;

	@ApiProperty({
		description: 'UUID del docente',
		example: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
		uniqueItems: true,
	})
	@Column('varchar', {
		unique: true,
		nullable: false,
	})
	uuid?: string;

	@ApiProperty({
		example: 'Juan',
		description: 'Nombre del docente',
		uniqueItems: true,
	})
	@Column('varchar', {
		unique: true,
		nullable: false,
		length : 200
	})
	nombre!: string;

	@ApiProperty({
		example: 'Pérez',
		description: 'Apellido del docente',
	})
	@Column('varchar', {
		nullable: false,
		length : 200
	})
	apellido!: string;

	@ApiProperty({
		example: 'Cédula de ciudadanía',
		description: 'Tipo de documento del docente',
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
		description: 'Número de documento del docente',
	})
	@Column('varchar', {
		nullable: false,
		length : 200,
		name: 'numero_documento',
		unique: true
	})
	numeroDocumento!: string;



	@ApiProperty({
		example: 'correo@correo.com',
		description: 'Correo electrónico del docente',
	})
	@Column('varchar', {
		nullable: false,
		length : 200,
		unique: true
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

	@OneToMany(() => Grupo, grupo => grupo.docente)
	grupos?: Grupo[];
}
