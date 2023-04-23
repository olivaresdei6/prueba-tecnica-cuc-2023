import { Injectable } from '@nestjs/common';
import { IAsignaturaRepository } from '../core/abstract';
import { MysqlGenericRepository } from './mysql-generyc.repository';

@Injectable()
export class MysqlAsignaturaRepository<T> extends MysqlGenericRepository<T> implements IAsignaturaRepository<T> {

}
