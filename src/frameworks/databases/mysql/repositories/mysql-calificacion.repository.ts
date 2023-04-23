import { Injectable } from '@nestjs/common';
import { ICalificacionRepository } from '../core/abstract';
import { MysqlGenericRepository } from './mysql-generyc.repository';

@Injectable()
export class MysqlCalificacionRepository<T> extends MysqlGenericRepository<T> implements ICalificacionRepository<T> {

}
