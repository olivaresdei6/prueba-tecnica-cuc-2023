import { Injectable } from '@nestjs/common';
import { IProgramaUniversitarioRepository } from '../core/abstract';
import { MysqlGenericRepository } from './mysql-generyc.repository';

@Injectable()
export class MysqlProgramaUniversitarioRepository<T> extends MysqlGenericRepository<T> implements IProgramaUniversitarioRepository<T> {

}
