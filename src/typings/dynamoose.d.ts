// Custom made dynamoose declaration file.

declare module "dynamoose" {
	export function local(url: string): void;
	export function model<DataSchema, KeySchema, ModelSchema extends Model<DataSchema>>(
    modelName: string,
    schema: Schema,
    options?: ModelOption
  ): ModelConstructor<DataSchema, KeySchema, ModelSchema>;
	export function setDefaults(options: ModelOption): void;

  interface ModelOption {
    create?: boolean, // Create table in DB, if it does not exist,
    update?: boolean, // Update remote indexes if they do not match local index structure
    waitForActive?: boolean, // Wait for table to be created before trying to us it
    waitForActiveTimeout?: number // wait 3 minutes for table to activate
  }

  /**
   * Schema
   */
  export class Schema {
    constructor(schema: SchemaAttributes, options?: SchemaOptions);
		method(name: string, fn: any): any;
		parseDynamo(model: any, dynamoObj: any): any;
		static(name: string, fn: any): any;
		toDynamo(model: any): any;
		virtual(name: string, options: any): any;
		virtualpath(name: string): any;
  }

  interface SchemaAttributeDefinition<Constructor, Type> {
    type: Constructor;
    validate?: (v: Type) => boolean;
    hashKey?: boolean;
    rangeKey?: boolean;
    required?: boolean;
    get?: () => Type;
    set?: (v: Type) => void;
    trim?: boolean;
    lowercase?: boolean;
    uppercase?: boolean;
    index?: {
      name: string;
      global: boolean;
      rangeKey: string;
      project: boolean;
      throughput: number;
    } | boolean;
    default?: (() => Type) | Type
  }
  interface SchemaOptions {
    throughput?: boolean | { read: number, write: number };
    timestamps: boolean | { createdAt: string, updatedAt: string };
  }

  interface SchemaAttributes {
    [key: string]: (
      SchemaAttributeDefinition<NumberConstructor, number>
      | SchemaAttributeDefinition<[NumberConstructor], number[]>
      | SchemaAttributeDefinition<DateConstructor, Date>
      | SchemaAttributeDefinition<StringConstructor, string>
      | SchemaAttributeDefinition<[StringConstructor], string[]>
      | SchemaAttributeDefinition<ObjectConstructor, Object>
      | SchemaAttributeDefinition<ArrayConstructor, Array<any>>
      | SchemaAttributeDefinition<any, any>
    )
  }

  /**
   * Table
   */
	export class Table {
		constructor(name: string, schema: any, options: any, base: any);
		create(next: any): any;
		createIndex(attributes: any, indexSpec: any): any;
		delete(next: any): any;
		deleteIndex(indexname: string): any;
		describe(next: any): any;
		init(next: any): any;
		update(next: any): any;
		waitForActive(timeout: any, next: any): any;
	}

  /**
   * Model
   */
  export class Model<ModelData> {
		constructor(obj: ModelData);
		put(options: PutOptions, callback: (err: Error) => void): Promise<Model<ModelData>>;
		save(options: SaveOptions, callback: (err: Error) => void): Promise<Model<ModelData>>;

    delete(callback?: (err: Error) => void): Promise<undefined>;

    put(callback: (err: Error) => void): Promise<Model<ModelData>>;
    put(options: ModelData, callback?: (err: Error) => void): Promise<Model<ModelData>>;

    save(callback?: (err: Error) => void): Promise<Model<ModelData>>;
    save(options: ModelData, callback?: (err: Error) => void): Promise<Model<ModelData>>;
  }

  interface PutOptions {
    /**
     * Overwrite existing item. Defaults to true.
     */
    overwrite: boolean;
    /**
     * An expression for a conditional update. See the AWS documentation for more information about condition expressions.
     */
    condition: string;
    /**
    * A map of name substitutions for the condition expression.
    */
    conditionNames: any;
    /**
    * A map of values for the condition expression. Note that in order for automatic object conversion to work, the keys in this object must match schema attribute names.
    */
    conditionValues: any;
  }
  type SaveOptions = PutOptions;

  interface ModelConstructor<DataSchema, KeySchema, Model> {
    new (value?: DataSchema): Model;
    (value?: DataSchema): Model;
    readonly prototype: Model;

    batchPut(items: DataSchema[], options: PutOptions, callback: (err: Error, items: Model[]) => void): Promise<Model[]>;
    create(item: DataSchema, callback?: (err: Error, model: Model) => void): Promise<Model>;

    get(key: KeySchema, callback?: (err: Error, data: DataSchema) => void): Promise<Model | undefined>;
    batchGet(key: KeySchema, callback?: (err: Error, data: DataSchema) => void): Promise<Model[]>;

    delete(key: KeySchema, callback?: (err: Error) => void): Promise<undefined>;
    batchDelete(keys: KeySchema, callback: (err: Error) => void): Promise<undefined>;

		query(query: QueryFilter, callback?: (err: Error, results: Model[]) => void): Promise<Model[]>;
    queryOne(query: QueryFilter, callback?: (err: Error, results: Model) => void): Promise<Model>;
    scan(filter: ScanFilter, callback: (err: Error, results: Model[]) => void): ScanInterface<Model>;

		// update(key, update, options, callback: (err) => void);
  }

  /**
   * Query
   */
  type QueryFilter = any;
  interface QueryInterface<T> {
    exec(callback?: (err: Error, result: ScanResult<T>) => void): Promise<ScanResult<T>>;
		where(rangeKey: string): QueryInterface<T>;
		filter(filter: string): QueryInterface<T>;
		and(): QueryInterface<T>;
		or(): QueryInterface<T>;
		not(): QueryInterface<T>;
		null(): QueryInterface<T>;
		eq(value: any): QueryInterface<T>;
		lt(value: any): QueryInterface<T>;
		le(value: any): QueryInterface<T>;
		ge(value: any): QueryInterface<T>;
		gt(value: any): QueryInterface<T>;
		beginsWith(value: string): QueryInterface<T>;
		between(valueA: any, valueB: any): QueryInterface<T>;
		contains(value: string): QueryInterface<T>;
		in(values: any[]): QueryInterface<T>;
		limit(limit: number): QueryInterface<T>;
		consistent(): QueryInterface<T>;
		descending(): QueryInterface<T>;
		ascending(): QueryInterface<T>;
		startAt(key: QueryKey): QueryInterface<T>;
		attributes(attributes: string[]): QueryInterface<T>;
  }
  interface QueryResult<T> extends Array<T> {
    lastKey?: QueryKey;
  }
  type QueryKey = string;


  /**
   * Scan
   */
  type ScanFilter = string | any;

  interface ScanInterface<T> {
    exec(callback?: (err: Error, result: ScanResult<T>) => void): Promise<ScanResult<T>>;
		where(filter: any): ScanInterface<T>;
		filter(filter: any): ScanInterface<T>;
		and(): ScanInterface<T>;
		not(): ScanInterface<T>;
		null(): ScanInterface<T>;
		eq(value: any): ScanInterface<T>;
		lt(value: any): ScanInterface<T>;
		le(value: any): ScanInterface<T>;
		ge(value: any): ScanInterface<T>;
		gt(value: any): ScanInterface<T>;
		beginsWith(value: any): ScanInterface<T>;
		between(valueA: any, valueB: any): ScanInterface<T>;
		contains(value: any): ScanInterface<T>;
		beginsWith(value: any): ScanInterface<T>;
		in(value: any): ScanInterface<T>;
		limit(limit: number): ScanInterface<T>;
		startAt(key: ScanKey): ScanInterface<T>;
		attributes(value: any): ScanInterface<T>;
  }

  interface ScanResult<ModelData> extends Array<ModelData> {
    lastKey?: ScanKey;
  }

  type ScanKey = string;

	export class VirtualType {
		constructor(options: any, name: string);
		applyVirtuals(model: any): void;
		get(fn: any): any;
		set(fn: any): any;
	}

  export function local(url?: string): void;
}
