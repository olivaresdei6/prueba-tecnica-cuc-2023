import { Injectable } from '@nestjs/common';
import { IEstudianteRepository } from '../core/abstract';
import { MysqlGenericRepository } from './mysql-generyc.repository';

@Injectable()
export class MysqlEstudianteRepository<T> extends MysqlGenericRepository<T> implements IEstudianteRepository<T> {

}
