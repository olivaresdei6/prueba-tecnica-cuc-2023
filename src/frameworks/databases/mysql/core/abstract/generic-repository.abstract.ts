import {FindOptionsWhere} from "typeorm/find-options/FindOptionsWhere";
import {DeepPartial, FindOneOptions, FindOptionsSelect} from "typeorm";
import {ResponseInterface} from "../../../../../interfaces/response.interface";

export abstract class IGenericRepository<T> {

	public abstract findAll(select?: FindOptionsSelect<T>, where?:FindOptionsWhere<T>, relations?:string[]): Promise<T[]>;

	public abstract findOne(options: FindOneOptions<T>, entity: string, launchException?:boolean): Promise<T | null>;

	public abstract findBy(where: FindOptionsWhere<T> | FindOptionsWhere<T>[]): Promise<T[]>;

	public abstract create(entity: DeepPartial<T>): Promise<T>;

	public abstract update(id: string | number, entity: DeepPartial<T>): Promise<T>;

	public abstract executeQuery(query: string): Promise<any>;

	public abstract getRegistersPaginated(limit: number, page: number, table: string): Promise<ResponseInterface>;

	public abstract validatePageAndLimit(page: number, limit: number, total:number): boolean;
}
