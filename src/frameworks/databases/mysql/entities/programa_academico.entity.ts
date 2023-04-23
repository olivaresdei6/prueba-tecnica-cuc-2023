import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Asignatura, Estudiante } from './';


@Entity({name: 'programa_academico'})
export class ProgramaAcademico {
	@ApiProperty({
		example: 1,
		description: 'Identificador único de cada programa universitario',
		uniqueItems: true
	})
	@PrimaryGeneratedColumn('increment', {type: 'bigint'})
	id?: number;

	@ApiProperty({
		description: 'UUID del programa universitario',
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
		example: 'Ingeniería de Sistemas',
		description: 'Nombre del programa universitario',
		uniqueItems: true,
	})
	@Column('varchar', {
		unique: true,
		nullable: false,
		length : 200
	})
	nombre!: string;

	@ApiProperty({
		example: 1,
		description: 'Estado del registro',
	})
	@Column('tinyint', {
		nullable: false,
		default: 1
	})
	estado?: number;

	@OneToMany(() => Asignatura, asignatura => asignatura.programaAcademico)
	asignaturas?: Asignatura[];

	@OneToMany(() => Estudiante, estudiante => estudiante.programaAcademico)
	estudiantes?: Estudiante[];
}
