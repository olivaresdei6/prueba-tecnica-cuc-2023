import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, JoinColumn, OneToMany } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Docente, Asignatura, ProgramaAcademico } from './';

@Entity({name: 'grupo'})
export class Grupo {
	@ApiProperty({
		description: 'Identificador del grupo',
		example: 1,
		uniqueItems: true
	})
	@PrimaryGeneratedColumn('increment', {type: 'bigint'})
	id?: number;

	@ApiProperty({
		description: 'UUID del grupo',
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
		description: 'Nombre del grupo',
		example: 'Matemáticas básicas REMOTO-B69BMU53',
		uniqueItems: true,
	})
	@Column('varchar', {
		unique: true,
		nullable: false,
		length : 200
	})
	nombre!: string;

	@ApiProperty({
		description: 'Periodo académico del grupo',
		example: '2021-1',
	})
	@Column('varchar', {
		nullable: false,
		length : 200,
		name: 'periodo_academico'
	})
	periodoAcademico!: string;

	@ApiProperty({
		description: 'Modalidad del grupo',
		example: 'REMOTO',
	})
	@Column('varchar', {
		nullable: false,
		length : 200,
	})
	modalidad!: string;

	@ApiProperty({
		description: 'Código del grupo',
		example: 'B69BMU53',
	})
	@Column('varchar', {
		nullable: false,
		length: 200,
		unique: true,
	})
	codigo!: string;

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
		description: 'Identificador del programa universitario al que pertenece el grupo',
		example: 1,
	})
	@ManyToOne(() => ProgramaAcademico, programaAcademico => programaAcademico.id, {eager: true})
	@JoinColumn({name: 'id_programa_universitario'})
	programaAcademico!: number | ProgramaAcademico;

	@ApiProperty({
		description: 'Identificador del docente que dicta el grupo',
		example: 1,
	})
	@ManyToOne(() => Docente, docente => docente.id, {eager: true})
	@JoinColumn({name: 'id_docente'})
	docente!: number | Docente;


	@ApiProperty({
		description: 'Identificador de la asignatura a la que pertenece el grupo',
		example: 1,
	})
	@ManyToOne(() => Asignatura, asignatura => asignatura.id, {eager: true})
	@JoinColumn({name: 'id_asignatura'})
	asignatura!: number | Asignatura;

}
