import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Estudiante, Grupo } from './';


@Entity({name: 'calificacion'})
export class Calificacion {
	@ApiProperty({
		example: 1,
		description: 'Identificador único de cada calificación',
		uniqueItems: true
	})
	@PrimaryGeneratedColumn('increment', {type: 'bigint'})
	id?: number;

	@ApiProperty({
		example: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
		description: 'UUID del registro',
		uniqueItems: true,
	})
	uuid?: string;

	@ApiProperty({
		example: 3.5,
		description: 'Nota de la calificación del 1° corte (30%)',
	})
	@Column('decimal', {
		nullable: false,
		precision: 2,
		name: 'nota_corte_1',
		default: 0
	})
	notaCorte1?: number;


	@ApiProperty({
		example: 4.5,
		description: 'Nota de la calificación del 2° corte (30%)',
	})
	@Column('decimal', {
		nullable: false,
		precision: 2,
		name: 'nota_corte_2',
		default: 0
	})
	notaCorte2?: number;


	@ApiProperty({
		example: 5.0,
		description: 'Nota de la calificación del 3° corte (40%)',
	})
	@Column('decimal', {
		nullable: false,
		precision: 2,
		name: 'nota_corte_3',
		default: 0
	})
	notaCorte3?: number;

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
		description: 'Id del curso',
	})
	@ManyToOne(() => Grupo, (grupo) => grupo.id, {eager: true})
	grupo?: number;


	@ApiProperty({
		example: 1,
		description: 'Id del estudiante',
	})
	@ManyToOne(() => Estudiante, (estudiante) => estudiante.id, {eager: true})
	estudiante?: number;
}
