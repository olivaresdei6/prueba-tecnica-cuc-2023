import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsUUID, ValidateNested } from 'class-validator';
import { v4 as uuidv4 } from 'uuid';

class EstudianteGrupo {
	@ApiProperty({ example: uuidv4() })
	@IsUUID('4', { message: 'El UUID del estudiante debe ser un UUID válido' })
	uuidEstudiante: string;
}

export class RegistrarEstudianteEnElGrupoDto {
	@ApiProperty({
		example: [
			{
				uuidEstudiante: uuidv4(),
				uuidGrupo: uuidv4(),
			},
			{
				uuidEstudiante: uuidv4(),
				uuidGrupo: uuidv4(),
			},
		],
		description: 'Arreglo de estudiantes y grupos',
	})
	@IsArray()
	@ValidateNested({ each: true })
	@Type(() => EstudianteGrupo)
	estudiantesGrupos: EstudianteGrupo[];
}
