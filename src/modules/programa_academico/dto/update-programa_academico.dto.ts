import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsString, MaxLength, MinLength } from 'class-validator';
import { CreateProgramaAcademicoDto } from './create-programa_academico.dto';

export class UpdateProgramaAcademicoDto extends PartialType(CreateProgramaAcademicoDto) {}
