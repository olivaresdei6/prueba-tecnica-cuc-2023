import { Injectable } from '@nestjs/common';
import { MysqlGenericRepository } from './mysql-generyc.repository';
import { IGrupoRepository } from '../core/abstract';

@Injectable()
export class MysqlGrupoRepository<T> extends MysqlGenericRepository<T> implements IGrupoRepository<T> {

}
