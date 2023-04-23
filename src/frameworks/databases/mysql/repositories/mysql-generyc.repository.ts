import {DataSource, DeepPartial, FindOneOptions, FindOptionsSelect, QueryRunner, Repository} from "typeorm";
import {ExceptionsService} from "../../../../config/exceptions/exceptions.service";
import {FindOptionsWhere} from "typeorm/find-options/FindOptionsWhere";
import {isNumber} from "class-validator";
import {ResponseInterface} from "../../../../interfaces/response.interface";
import { IGenericRepository } from '../core/abstract/generic-repository.abstract';

export class MysqlGenericRepository<T> implements IGenericRepository<T> {
	public _repository: Repository<T>;
	public exceptions: ExceptionsService;
	constructor( repository: Repository<T>, private readonly dataSource: DataSource, exceptions: ExceptionsService) {
		this._repository = repository
		this.exceptions = exceptions;
	}

	public async findBy(where: FindOptionsWhere<T> | FindOptionsWhere<T>[], options?: FindOneOptions<T>): Promise<T[]> {
		return await this._repository.find({ where, select: options.select });
	}

	/**
	 * Método que convierte el dto en una entidad de la base de datos.
	 * @param entity
	 */
	async create(entity: DeepPartial<T>): Promise<T> {
		try {
			/**
			 * Se crea una nueva instancia de la entidad que se recibe como parámetro.
			 * */
			const entityInstance: T = this._repository.create(entity);
			/**
			 * Se guarda la nueva instancia de la entidad en la base de datos.
			 */
			await this._repository.save(entityInstance);

			/**
			 * Se retorna la nueva instancia de la entidad que se acaba de guardar en la base de datos.
			 */
			return entityInstance;

		} catch (error) {
			/**
			 * Si ocurre un error, se maneja el error.
			 */
			this.handleDBExceptions(error);
		}
	}

	async findOne(options: FindOneOptions<T>, entity: string, launchException: boolean = true): Promise<T> {
		const entityInstance: T = await this._repository.findOne(options);
		if (!entityInstance && launchException) {
			if (!entityInstance) this.exceptions.notFoundException({message: `${entity} no se encontró en la base de datos.`});
			// @ts-ignore
			if (entityInstance.estado === 0) this.exceptions.notFoundException({message: `El recurso solicitado no se encuentra disponible por el momento. Contacte al administrador.`});
		}
		return entityInstance;
	}


	async findAll(select?: FindOptionsSelect<T>, where?:FindOptionsWhere<T>, relations?:string[]): Promise<T[]> {
		const relationArray = relations ? relations : [];
		const records: T[] = await this._repository.find({where, relations: relationArray, select});
		if (!records) {
			this.exceptions.notFoundException({message: `No se encontraron registros en la base de datos.`});
		}
		return records;
	}

	async getRegistersPaginated(limit: number, page: number, table:string) : Promise<ResponseInterface> {
		if (!page) page = 1;
		if (!limit) limit = 10;
		const countFieldsTotal = (await this.executeQuery(`SELECT COUNT(id) as count FROM ${table} `))[0].count;
		/**
		 * Si el número de página es mayor al número de páginas que existen, se mostrará la última página.
		 * Math.ceil() redondea un número hacia arriba.
		 */
		if(this.validatePageAndLimit(page, limit, countFieldsTotal)) {
			if (page > Math.ceil(countFieldsTotal / limit)) page = Math.ceil(countFieldsTotal / limit);
			const countFieldsPaginate = await this._repository.query(`SELECT COUNT(*) as count FROM ${table} LIMIT ${limit} OFFSET ${page}`);
			const results : Object[] = await this._repository.query(`SELECT * FROM ${table} LIMIT ${limit} OFFSET ${page}`);
			return {
				countFieldsTotal,
				countFieldsPaginate,
				results,
			};
		}
	}


	async update(id: string | number , entity: DeepPartial<T>): Promise<T> {
		/**
		 * Se hace uso del dataSource para obtener la conexión a la base de datos.
		 * El queryRunner permite ejecutar queries en la base de datos.
		 */
		const queryRunner = this.dataSource.createQueryRunner();
		/**
		 * Se realiza la conexión a la base de datos.
		 */
		await queryRunner.connect();

		/**
		 * Se inicia una transacción. Esto permite que si ocurre un error en el
		 * proceso, se deshaga lo que se haya hecho.
		 */
		await queryRunner.startTransaction();
		let entityInstance : T;
		if(typeof id === 'string'){
			// @ts-ignore
			const register = await this._repository.findOne({ where: { uuid: id } });
			if (!register) {
				this.exceptions.notFoundException({message: `No se encontró el registro`});
			}
			// @ts-ignore
			entityInstance = await this._repository.preload({id: register.id, ...entity});
		}else{
			entityInstance = await this._repository.preload({ id, ...entity});
			if (!entityInstance) {
				const id_str = id.toString();
				entityInstance = await this._repository.preload({ id: id_str, ...entity});
			}
		}
		/**
		 * Si no se encuentra la acción de permiso, se lanza una excepción.
		 */
		if (!entityInstance) {
			this.exceptions.notFoundException({message: `Los datos del registro a actualizar no son válidos. Intente nuevamente.`});
		}
		try {
			await queryRunner.manager.save(entityInstance);
			/**
			 * Se confirman los cambios en la base de datos.
			 */
			await queryRunner.commitTransaction();
			/**
			 * Se cierra la conexión a la base de datos.
			 */
			await queryRunner.release();
			/**
			 * Se devuelve la acción de permiso actualizada.
			 */
			return entityInstance;
		} catch (error) {
			/**
			 * Si ocurre un error, se deshacen los cambios en la base de datos.
			 */
			await queryRunner.rollbackTransaction();
			/**
			 * Se maneja el error.
			 */
			this.handleDBExceptions(error);
		} finally {
			/**
			 * Se cierra la conexión a la base de datos.
			 */
			await queryRunner.release();
		}
	}

	async executeQuery(query: string): Promise<any> {
		const queryRunner: QueryRunner = this.dataSource.createQueryRunner();
		try {
			await queryRunner.connect();
			await queryRunner.startTransaction();
			const queryExecute = await queryRunner.query(query);
			await queryRunner.commitTransaction();
			await queryRunner.release();
			return queryExecute;
		}catch (e) {
			this.handleDBExceptions(e);
		} finally {
			await queryRunner.release();
		}
	}


	public validatePageAndLimit(page: number, limit: number, total:number): boolean {
		if (total === 0){
			this.exceptions.notFoundException({message: 'No se encontraron registros.'});
		}
		if (page > total){
			this.exceptions.badRequestException({message: 'El número de página es mayor al número de páginas'});
		}

		if (page <= 0 || limit <= 0) {
			this.exceptions.badRequestException({message: 'El número de página y límite deben ser mayor a 0'});
		}
		if (limit > total) {
			this.exceptions.badRequestException({message: 'El límite debe ser menor o igual al número de registros totales'});
		}

		if (page > total) {
			this.exceptions.badRequestException({message: 'El número de página debe ser menor o igual al número de páginas'});
		}

		return true;
	}

	/**
	 * Método para manejar las excepciones que puede generar la base de datos.
	 * @param error
	 * @return void
	 */
	handleDBExceptions(error: any): void {
		/**
		 * Comprobando si el código de error es 23505, que es el código para
		 * una violación de restricción única.
		 * */
		if (error.errno === 1062) {
			this.exceptions.badRequestException({message: "Ya existe un registro con los datos proporcionados."});
		}

		if (error.errno === 1364) {
			this.exceptions.badRequestException({message: "Los datos proporcionados no son válidos."});
		}

		if (error.code === '23503') {
			this.exceptions.badRequestException({message: "Los datos proporcionados no son válidos."});
		}
		if (error.code === '23502') {
			this.exceptions.notFoundException({message: error.response.message});
		}

		this.exceptions.internalServerErrorException({message: error});
	}
}
