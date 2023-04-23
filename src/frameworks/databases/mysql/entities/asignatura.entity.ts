import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, JoinColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Grupo, ProgramaAcademico } from './';


@Entity({name: 'asignatura'})
export class Asignatura {
	@ApiProperty({
		example: 1,
		description: 'Identificador único de cada asignatura',
		uniqueItems: true
	})
	@PrimaryGeneratedColumn('increment', {type: 'bigint'})
	id?: number;

	@ApiProperty({
		description: 'UUID del registro',
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
		example: 'Matemáticas',
		description: 'Nombre de la asignatura',
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

	@ApiProperty({
		example: 1,
		description: 'Identificador único del programa universitario',
	})

	@ManyToOne(() => ProgramaAcademico, programaUniversitario => programaUniversitario.id)
	@JoinColumn({name: 'id_programa_academico'})
	idProgramaAcademico?: number | ProgramaAcademico;

	@OneToMany(() => Grupo, grupo => grupo.idAsignatura)
	grupos?: Grupo[];
}
