import { Injectable } from '@nestjs/common';
import { MysqlGenericRepository } from './mysql-generyc.repository';
import { IDocenteRepository } from '../core/abstract';

@Injectable()
export class MysqlDocenteRepository<T> extends MysqlGenericRepository<T> implements IDocenteRepository<T> {

}
