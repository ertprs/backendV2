import {
  DMMF,
  DMMFClass,
  Engine,
  PrismaClientKnownRequestError,
  PrismaClientUnknownRequestError,
  PrismaClientRustPanicError,
  PrismaClientInitializationError,
  PrismaClientValidationError,
  sqltag as sql,
  empty,
  join,
  raw,
  Sql,
  Decimal,
} from './runtime';

export { PrismaClientKnownRequestError }
export { PrismaClientUnknownRequestError }
export { PrismaClientRustPanicError }
export { PrismaClientInitializationError }
export { PrismaClientValidationError }
export { Decimal }

/**
 * Re-export of sql-template-tag
 */
export { sql, empty, join, raw, Sql }

/**
 * Prisma Client JS version: 2.11.0
 * Query Engine version: 58369335532e47bdcec77a2f1e7c1fb83a463918
 */
export declare type PrismaVersion = {
  client: string
}

export declare const prismaVersion: PrismaVersion 

/**
 * Utility Types
 */

/**
 * From https://github.com/sindresorhus/type-fest/
 * Matches a JSON object.
 * This type can be useful to enforce some input to be JSON-compatible or as a super-type to be extended from. 
 */
export declare type JsonObject = {[Key in string]?: JsonValue}
 
/**
 * From https://github.com/sindresorhus/type-fest/
 * Matches a JSON array.
 */
export declare interface JsonArray extends Array<JsonValue> {}
 
/**
 * From https://github.com/sindresorhus/type-fest/
 * Matches any valid JSON value.
 */
export declare type JsonValue = string | number | boolean | null | JsonObject | JsonArray

/**
 * Same as JsonObject, but allows undefined
 */
export declare type InputJsonObject = {[Key in string]?: JsonValue}
 
export declare interface InputJsonArray extends Array<JsonValue> {}
 
export declare type InputJsonValue = undefined |  string | number | boolean | null | InputJsonObject | InputJsonArray

declare type SelectAndInclude = {
  select: any
  include: any
}

declare type HasSelect = {
  select: any
}

declare type HasInclude = {
  include: any
}

declare type CheckSelect<T, S, U> = T extends SelectAndInclude
  ? 'Please either choose `select` or `include`'
  : T extends HasSelect
  ? U
  : T extends HasInclude
  ? U
  : S

/**
 * Get the type of the value, that the Promise holds.
 */
export declare type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

/**
 * Get the return type of a function which returns a Promise.
 */
export declare type PromiseReturnType<T extends (...args: any) => Promise<any>> = PromiseType<ReturnType<T>>


export declare type Enumerable<T> = T | Array<T>;

export type RequiredKeys<T> = {
  [K in keyof T]-?: {} extends Pick<T, K> ? never : K
}[keyof T]

export declare type TruthyKeys<T> = {
  [key in keyof T]: T[key] extends false | undefined | null ? never : key
}[keyof T]

export declare type TrueKeys<T> = TruthyKeys<Pick<T, RequiredKeys<T>>>

/**
 * Subset
 * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
 */
export declare type Subset<T, U> = {
  [key in keyof T]: key extends keyof U ? T[key] : never;
};

type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };
/**
 * XOR is needed to have a real mutually exclusive union type
 * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
 */
type XOR<T, U> = (T | U) extends object ? (Without<T, U> & U) | (Without<U, T> & T) : T | U;

declare class PrismaClientFetcher {
  private readonly prisma;
  private readonly debug;
  private readonly hooks?;
  constructor(prisma: PrismaClient<any, any>, debug?: boolean, hooks?: Hooks | undefined);
  request<T>(document: any, dataPath?: string[], rootField?: string, typeName?: string, isList?: boolean, callsite?: string): Promise<T>;
  sanitizeMessage(message: string): string;
  protected unpack(document: any, data: any, path: string[], rootField?: string, isList?: boolean): any;
}


/**
 * Client
**/

export declare type Datasource = {
  url?: string
}

export type Datasources = {
  db?: Datasource
}

export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'

export interface PrismaClientOptions {
  /**
   * Overwrites the datasource url from your prisma.schema file
   */
  datasources?: Datasources

  /**
   * @default "colorless"
   */
  errorFormat?: ErrorFormat

  /**
   * @example
   * ```
   * // Defaults to stdout
   * log: ['query', 'info', 'warn', 'error']
   * 
   * // Emit as events
   * log: [
   *  { emit: 'stdout', level: 'query' },
   *  { emit: 'stdout', level: 'info' },
   *  { emit: 'stdout', level: 'warn' }
   *  { emit: 'stdout', level: 'error' }
   * ]
   * ```
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
   */
  log?: Array<LogLevel | LogDefinition>
}

export type Hooks = {
  beforeRequest?: (options: {query: string, path: string[], rootField?: string, typeName?: string, document: any}) => any
}

/* Types for Logging */
export type LogLevel = 'info' | 'query' | 'warn' | 'error'
export type LogDefinition = {
  level: LogLevel
  emit: 'stdout' | 'event'
}

export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
  GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
  : never

export type QueryEvent = {
  timestamp: Date
  query: string
  params: string
  duration: number
  target: string
}

export type LogEvent = {
  timestamp: Date
  message: string
  target: string
}
/* End Types for Logging */


export type PrismaAction =
  | 'findOne'
  | 'findMany'
  | 'findFirst'
  | 'create'
  | 'update'
  | 'updateMany'
  | 'upsert'
  | 'delete'
  | 'deleteMany'
  | 'executeRaw'
  | 'queryRaw'
  | 'aggregate'


/**
 * These options are being passed in to the middleware as "params"
 */
export type MiddlewareParams = {
  model?: ModelName
  action: PrismaAction
  args: any
  dataPath: string[]
  runInTransaction: boolean
}

/**
 * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
 */
export type Middleware<T = any> = (
  params: MiddlewareParams,
  next: (params: MiddlewareParams) => Promise<T>,
) => Promise<T>

// tested in getLogLevel.test.ts
export declare function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

/**
 * ##  Prisma Client ʲˢ
 * 
 * Type-safe database client for TypeScript & Node.js (ORM replacement)
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Centrodecustos
 * const centrodecustos = await prisma.centrodecustos.findMany()
 * ```
 *
 * 
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export declare class PrismaClient<
  T extends PrismaClientOptions = PrismaClientOptions,
  U = 'log' extends keyof T ? T['log'] extends Array<LogLevel | LogDefinition> ? GetEvents<T['log']> : never : never
> {
  /**
   * @private
   */
  private fetcher;
  /**
   * @private
   */
  private readonly dmmf;
  /**
   * @private
   */
  private connectionPromise?;
  /**
   * @private
   */
  private disconnectionPromise?;
  /**
   * @private
   */
  private readonly engineConfig;
  /**
   * @private
   */
  private readonly measurePerformance;
  /**
   * @private
   */
  private engine: Engine;
  /**
   * @private
   */
  private errorFormat: ErrorFormat;

  /**
   * ##  Prisma Client ʲˢ
   * 
   * Type-safe database client for TypeScript & Node.js (ORM replacement)
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Centrodecustos
   * const centrodecustos = await prisma.centrodecustos.findMany()
   * ```
   *
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */
  constructor(optionsArg?: T);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? QueryEvent : LogEvent) => void): void;
  /**
   * @deprecated renamed to `$on`
   */
  on<V extends U>(eventType: V, callback: (event: V extends 'query' ? QueryEvent : LogEvent) => void): void;
  /**
   * Connect with the database
   */
  $connect(): Promise<void>;
  /**
   * @deprecated renamed to `$connect`
   */
  connect(): Promise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): Promise<any>;
  /**
   * @deprecated renamed to `$disconnect`
   */
  disconnect(): Promise<any>;

  /**
   * Add a middleware
   */
  $use(cb: Middleware): void

  /**
   * Executes a raw query and returns the number of affected rows
   * @example
   * ```
   * // With parameters use prisma.executeRaw``, values will be escaped automatically
   * const result = await prisma.executeRaw`UPDATE User SET cool = ${true} WHERE id = ${1};`
   * // Or
   * const result = await prisma.executeRaw('UPDATE User SET cool = $1 WHERE id = $2 ;', true, 1)
  * ```
  * 
  * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
  */
  $executeRaw<T = any>(query: string | TemplateStringsArray | Sql, ...values: any[]): Promise<number>;

  /**
   * @deprecated renamed to `$executeRaw`
   */
  executeRaw<T = any>(query: string | TemplateStringsArray | Sql, ...values: any[]): Promise<number>;

  /**
   * Performs a raw query and returns the SELECT data
   * @example
   * ```
   * // With parameters use prisma.queryRaw``, values will be escaped automatically
   * const result = await prisma.queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'ema.il'};`
   * // Or
   * const result = await prisma.queryRaw('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'ema.il')
  * ```
  * 
  * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
  */
  $queryRaw<T = any>(query: string | TemplateStringsArray | Sql, ...values: any[]): Promise<T>;
 
  /**
   * @deprecated renamed to `$queryRaw`
   */
  queryRaw<T = any>(query: string | TemplateStringsArray | Sql, ...values: any[]): Promise<T>;
  /**
   * Execute queries in a transaction
   * @example
   * ```
   * const [george, bob, alice] = await prisma.transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   */
  $transaction: PromiseConstructor['all']
  /**
   * @deprecated renamed to `$transaction`
   */
  transaction: PromiseConstructor['all']

  /**
   * `prisma.centrodecustos`: Exposes CRUD operations for the **centrodecustos** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Centrodecustos
    * const centrodecustos = await prisma.centrodecustos.findMany()
    * ```
    */
  get centrodecustos(): centrodecustosDelegate;

  /**
   * `prisma.dados`: Exposes CRUD operations for the **dados** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Dados
    * const dados = await prisma.dados.findMany()
    * ```
    */
  get dados(): dadosDelegate;

  /**
   * `prisma.empresas`: Exposes CRUD operations for the **empresas** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Empresas
    * const empresas = await prisma.empresas.findMany()
    * ```
    */
  get empresas(): empresasDelegate;

  /**
   * `prisma.operadoras`: Exposes CRUD operations for the **operadoras** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Operadoras
    * const operadoras = await prisma.operadoras.findMany()
    * ```
    */
  get operadoras(): operadorasDelegate;

  /**
   * `prisma.passagens`: Exposes CRUD operations for the **passagens** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Passagens
    * const passagens = await prisma.passagens.findMany()
    * ```
    */
  get passagens(): passagensDelegate;

  /**
   * `prisma.usuarios`: Exposes CRUD operations for the **usuarios** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Usuarios
    * const usuarios = await prisma.usuarios.findMany()
    * ```
    */
  get usuarios(): usuariosDelegate;
}



/**
 * Enums
 */

// Based on
// https://github.com/microsoft/TypeScript/issues/3192#issuecomment-261720275

export declare const ModelName: {
  centrodecustos: 'centrodecustos',
  dados: 'dados',
  empresas: 'empresas',
  operadoras: 'operadoras',
  passagens: 'passagens',
  usuarios: 'usuarios'
};

export declare type ModelName = (typeof ModelName)[keyof typeof ModelName]


export declare const CentrodecustosDistinctFieldEnum: {
  Id: 'Id',
  NmCentroDeCusto: 'NmCentroDeCusto',
  IdEmpresa: 'IdEmpresa',
  Situacao: 'Situacao'
};

export declare type CentrodecustosDistinctFieldEnum = (typeof CentrodecustosDistinctFieldEnum)[keyof typeof CentrodecustosDistinctFieldEnum]


export declare const DadosDistinctFieldEnum: {
  Id: 'Id',
  NmColaborador: 'NmColaborador',
  CPF: 'CPF',
  IdEmpresa: 'IdEmpresa',
  DtNascimento: 'DtNascimento',
  IdCentroDeCusto: 'IdCentroDeCusto',
  Matricula: 'Matricula',
  Escala: 'Escala',
  Situacao: 'Situacao'
};

export declare type DadosDistinctFieldEnum = (typeof DadosDistinctFieldEnum)[keyof typeof DadosDistinctFieldEnum]


export declare const EmpresasDistinctFieldEnum: {
  Id: 'Id',
  CNPJ: 'CNPJ',
  NmEmpresa: 'NmEmpresa',
  NmFantasia: 'NmFantasia',
  Endereco: 'Endereco',
  CEP: 'CEP',
  Situacao: 'Situacao',
  Tipo: 'Tipo'
};

export declare type EmpresasDistinctFieldEnum = (typeof EmpresasDistinctFieldEnum)[keyof typeof EmpresasDistinctFieldEnum]


export declare const OperadorasDistinctFieldEnum: {
  Id: 'Id',
  NmOperadora: 'NmOperadora',
  IdEmpresa: 'IdEmpresa',
  UF: 'UF'
};

export declare type OperadorasDistinctFieldEnum = (typeof OperadorasDistinctFieldEnum)[keyof typeof OperadorasDistinctFieldEnum]


export declare const PassagensDistinctFieldEnum: {
  Id: 'Id',
  CPFUsuario: 'CPFUsuario',
  NrCartao: 'NrCartao',
  Valor: 'Valor',
  IdOperadora: 'IdOperadora',
  QtdDia: 'QtdDia'
};

export declare type PassagensDistinctFieldEnum = (typeof PassagensDistinctFieldEnum)[keyof typeof PassagensDistinctFieldEnum]


export declare const UsuariosDistinctFieldEnum: {
  Id: 'Id',
  CPF: 'CPF',
  Nome: 'Nome',
  Senha: 'Senha',
  Email: 'Email'
};

export declare type UsuariosDistinctFieldEnum = (typeof UsuariosDistinctFieldEnum)[keyof typeof UsuariosDistinctFieldEnum]


export declare const SortOrder: {
  asc: 'asc',
  desc: 'desc'
};

export declare type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]



/**
 * Model centrodecustos
 */

export type centrodecustos = {
  Id: number
  NmCentroDeCusto: string | null
  IdEmpresa: number | null
  Situacao: string | null
}


export type AggregateCentrodecustos = {
  count: number
  avg: CentrodecustosAvgAggregateOutputType | null
  sum: CentrodecustosSumAggregateOutputType | null
  min: CentrodecustosMinAggregateOutputType | null
  max: CentrodecustosMaxAggregateOutputType | null
}

export type CentrodecustosAvgAggregateOutputType = {
  Id: number
  IdEmpresa: number | null
}

export type CentrodecustosSumAggregateOutputType = {
  Id: number
  IdEmpresa: number | null
}

export type CentrodecustosMinAggregateOutputType = {
  Id: number
  IdEmpresa: number | null
}

export type CentrodecustosMaxAggregateOutputType = {
  Id: number
  IdEmpresa: number | null
}


export type CentrodecustosAvgAggregateInputType = {
  Id?: true
  IdEmpresa?: true
}

export type CentrodecustosSumAggregateInputType = {
  Id?: true
  IdEmpresa?: true
}

export type CentrodecustosMinAggregateInputType = {
  Id?: true
  IdEmpresa?: true
}

export type CentrodecustosMaxAggregateInputType = {
  Id?: true
  IdEmpresa?: true
}

export type AggregateCentrodecustosArgs = {
  where?: centrodecustosWhereInput
  orderBy?: XOR<Enumerable<centrodecustosOrderByInput>, centrodecustosOrderByInput>
  cursor?: centrodecustosWhereUniqueInput
  take?: number
  skip?: number
  distinct?: Enumerable<CentrodecustosDistinctFieldEnum>
  count?: true
  avg?: CentrodecustosAvgAggregateInputType
  sum?: CentrodecustosSumAggregateInputType
  min?: CentrodecustosMinAggregateInputType
  max?: CentrodecustosMaxAggregateInputType
}

export type GetCentrodecustosAggregateType<T extends AggregateCentrodecustosArgs> = {
  [P in keyof T]: P extends 'count' ? number : GetCentrodecustosAggregateScalarType<T[P]>
}

export type GetCentrodecustosAggregateScalarType<T extends any> = {
  [P in keyof T]: P extends keyof CentrodecustosAvgAggregateOutputType ? CentrodecustosAvgAggregateOutputType[P] : never
}
    
    

export type centrodecustosSelect = {
  Id?: boolean
  NmCentroDeCusto?: boolean
  IdEmpresa?: boolean
  Situacao?: boolean
  empresas?: boolean | empresasArgs
}

export type centrodecustosInclude = {
  empresas?: boolean | empresasArgs
}

export type centrodecustosGetPayload<
  S extends boolean | null | undefined | centrodecustosArgs,
  U = keyof S
> = S extends true
  ? centrodecustos
  : S extends undefined
  ? never
  : S extends centrodecustosArgs | FindManycentrodecustosArgs
  ? 'include' extends U
    ? centrodecustos  & {
      [P in TrueKeys<S['include']>]:
      P extends 'empresas'
      ? empresasGetPayload<S['include'][P]> | null : never
    }
  : 'select' extends U
    ? {
      [P in TrueKeys<S['select']>]:P extends keyof centrodecustos ? centrodecustos[P]
: 
      P extends 'empresas'
      ? empresasGetPayload<S['select'][P]> | null : never
    }
  : centrodecustos
: centrodecustos


export interface centrodecustosDelegate {
  /**
   * Find zero or one Centrodecustos that matches the filter.
   * @param {FindOnecentrodecustosArgs} args - Arguments to find a Centrodecustos
   * @example
   * // Get one Centrodecustos
   * const centrodecustos = await prisma.centrodecustos.findOne({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
  **/
  findOne<T extends FindOnecentrodecustosArgs>(
    args: Subset<T, FindOnecentrodecustosArgs>
  ): CheckSelect<T, Prisma__centrodecustosClient<centrodecustos | null>, Prisma__centrodecustosClient<centrodecustosGetPayload<T> | null>>
  /**
   * Find the first Centrodecustos that matches the filter.
   * @param {FindFirstcentrodecustosArgs} args - Arguments to find a Centrodecustos
   * @example
   * // Get one Centrodecustos
   * const centrodecustos = await prisma.centrodecustos.findFirst({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
  **/
  findFirst<T extends FindFirstcentrodecustosArgs>(
    args?: Subset<T, FindFirstcentrodecustosArgs>
  ): CheckSelect<T, Prisma__centrodecustosClient<centrodecustos | null>, Prisma__centrodecustosClient<centrodecustosGetPayload<T> | null>>
  /**
   * Find zero or more Centrodecustos that matches the filter.
   * @param {FindManycentrodecustosArgs=} args - Arguments to filter and select certain fields only.
   * @example
   * // Get all Centrodecustos
   * const centrodecustos = await prisma.centrodecustos.findMany()
   * 
   * // Get first 10 Centrodecustos
   * const centrodecustos = await prisma.centrodecustos.findMany({ take: 10 })
   * 
   * // Only select the `Id`
   * const centrodecustosWithIdOnly = await prisma.centrodecustos.findMany({ select: { Id: true } })
   * 
  **/
  findMany<T extends FindManycentrodecustosArgs>(
    args?: Subset<T, FindManycentrodecustosArgs>
  ): CheckSelect<T, Promise<Array<centrodecustos>>, Promise<Array<centrodecustosGetPayload<T>>>>
  /**
   * Create a Centrodecustos.
   * @param {centrodecustosCreateArgs} args - Arguments to create a Centrodecustos.
   * @example
   * // Create one Centrodecustos
   * const Centrodecustos = await prisma.centrodecustos.create({
   *   data: {
   *     // ... data to create a Centrodecustos
   *   }
   * })
   * 
  **/
  create<T extends centrodecustosCreateArgs>(
    args: Subset<T, centrodecustosCreateArgs>
  ): CheckSelect<T, Prisma__centrodecustosClient<centrodecustos>, Prisma__centrodecustosClient<centrodecustosGetPayload<T>>>
  /**
   * Delete a Centrodecustos.
   * @param {centrodecustosDeleteArgs} args - Arguments to delete one Centrodecustos.
   * @example
   * // Delete one Centrodecustos
   * const Centrodecustos = await prisma.centrodecustos.delete({
   *   where: {
   *     // ... filter to delete one Centrodecustos
   *   }
   * })
   * 
  **/
  delete<T extends centrodecustosDeleteArgs>(
    args: Subset<T, centrodecustosDeleteArgs>
  ): CheckSelect<T, Prisma__centrodecustosClient<centrodecustos>, Prisma__centrodecustosClient<centrodecustosGetPayload<T>>>
  /**
   * Update one Centrodecustos.
   * @param {centrodecustosUpdateArgs} args - Arguments to update one Centrodecustos.
   * @example
   * // Update one Centrodecustos
   * const centrodecustos = await prisma.centrodecustos.update({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  update<T extends centrodecustosUpdateArgs>(
    args: Subset<T, centrodecustosUpdateArgs>
  ): CheckSelect<T, Prisma__centrodecustosClient<centrodecustos>, Prisma__centrodecustosClient<centrodecustosGetPayload<T>>>
  /**
   * Delete zero or more Centrodecustos.
   * @param {centrodecustosDeleteManyArgs} args - Arguments to filter Centrodecustos to delete.
   * @example
   * // Delete a few Centrodecustos
   * const { count } = await prisma.centrodecustos.deleteMany({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
   * 
  **/
  deleteMany<T extends centrodecustosDeleteManyArgs>(
    args: Subset<T, centrodecustosDeleteManyArgs>
  ): Promise<BatchPayload>
  /**
   * Update zero or more Centrodecustos.
   * @param {centrodecustosUpdateManyArgs} args - Arguments to update one or more rows.
   * @example
   * // Update many Centrodecustos
   * const centrodecustos = await prisma.centrodecustos.updateMany({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  updateMany<T extends centrodecustosUpdateManyArgs>(
    args: Subset<T, centrodecustosUpdateManyArgs>
  ): Promise<BatchPayload>
  /**
   * Create or update one Centrodecustos.
   * @param {centrodecustosUpsertArgs} args - Arguments to update or create a Centrodecustos.
   * @example
   * // Update or create a Centrodecustos
   * const centrodecustos = await prisma.centrodecustos.upsert({
   *   create: {
   *     // ... data to create a Centrodecustos
   *   },
   *   update: {
   *     // ... in case it already exists, update
   *   },
   *   where: {
   *     // ... the filter for the Centrodecustos we want to update
   *   }
   * })
  **/
  upsert<T extends centrodecustosUpsertArgs>(
    args: Subset<T, centrodecustosUpsertArgs>
  ): CheckSelect<T, Prisma__centrodecustosClient<centrodecustos>, Prisma__centrodecustosClient<centrodecustosGetPayload<T>>>
  /**
   * Count
   */
  count(args?: Omit<FindManycentrodecustosArgs, 'select' | 'include'>): Promise<number>

  /**
   * Aggregate
   */
  aggregate<T extends AggregateCentrodecustosArgs>(args: Subset<T, AggregateCentrodecustosArgs>): Promise<GetCentrodecustosAggregateType<T>>
}

/**
 * The delegate class that acts as a "Promise-like" for centrodecustos.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in 
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export declare class Prisma__centrodecustosClient<T> implements Promise<T> {
  private readonly _dmmf;
  private readonly _fetcher;
  private readonly _queryType;
  private readonly _rootField;
  private readonly _clientMethod;
  private readonly _args;
  private readonly _dataPath;
  private readonly _errorFormat;
  private readonly _measurePerformance?;
  private _isList;
  private _callsite;
  private _requestPromise?;
  constructor(_dmmf: DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
  readonly [Symbol.toStringTag]: 'PrismaClientPromise';

  empresas<T extends empresasArgs = {}>(args?: Subset<T, empresasArgs>): CheckSelect<T, Prisma__empresasClient<empresas | null>, Prisma__empresasClient<empresasGetPayload<T> | null>>;

  private get _document();
  /**
   * Attaches callbacks for the resolution and/or rejection of the Promise.
   * @param onfulfilled The callback to execute when the Promise is resolved.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of which ever callback is executed.
   */
  then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | Promise<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | Promise<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
  /**
   * Attaches a callback for only the rejection of the Promise.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of the callback.
   */
  catch<TResult = never>(onrejected?: ((reason: any) => TResult | Promise<TResult>) | undefined | null): Promise<T | TResult>;
  /**
   * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
   * resolved value cannot be modified from the callback.
   * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
   * @returns A Promise for the completion of the callback.
   */
  finally(onfinally?: (() => void) | undefined | null): Promise<T>;
}

// Custom InputTypes

/**
 * centrodecustos findOne
 */
export type FindOnecentrodecustosArgs = {
  /**
   * Select specific fields to fetch from the centrodecustos
  **/
  select?: XOR<centrodecustosSelect, null>
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: XOR<centrodecustosInclude, null>
  /**
   * Filter, which centrodecustos to fetch.
  **/
  where: centrodecustosWhereUniqueInput
}


/**
 * centrodecustos findFirst
 */
export type FindFirstcentrodecustosArgs = {
  /**
   * Select specific fields to fetch from the centrodecustos
  **/
  select?: XOR<centrodecustosSelect, null>
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: XOR<centrodecustosInclude, null>
  /**
   * Filter, which centrodecustos to fetch.
  **/
  where?: centrodecustosWhereInput
  orderBy?: XOR<Enumerable<centrodecustosOrderByInput>, centrodecustosOrderByInput>
  cursor?: centrodecustosWhereUniqueInput
  take?: number
  skip?: number
  distinct?: Enumerable<CentrodecustosDistinctFieldEnum>
}


/**
 * centrodecustos findMany
 */
export type FindManycentrodecustosArgs = {
  /**
   * Select specific fields to fetch from the centrodecustos
  **/
  select?: XOR<centrodecustosSelect, null>
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: XOR<centrodecustosInclude, null>
  /**
   * Filter, which centrodecustos to fetch.
  **/
  where?: centrodecustosWhereInput
  /**
   * Determine the order of the centrodecustos to fetch.
  **/
  orderBy?: XOR<Enumerable<centrodecustosOrderByInput>, centrodecustosOrderByInput>
  /**
   * Sets the position for listing centrodecustos.
  **/
  cursor?: centrodecustosWhereUniqueInput
  /**
   * The number of centrodecustos to fetch. If negative number, it will take centrodecustos before the `cursor`.
  **/
  take?: number
  /**
   * Skip the first `n` centrodecustos.
  **/
  skip?: number
  distinct?: Enumerable<CentrodecustosDistinctFieldEnum>
}


/**
 * centrodecustos create
 */
export type centrodecustosCreateArgs = {
  /**
   * Select specific fields to fetch from the centrodecustos
  **/
  select?: XOR<centrodecustosSelect, null>
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: XOR<centrodecustosInclude, null>
  /**
   * The data needed to create a centrodecustos.
  **/
  data: centrodecustosCreateInput
}


/**
 * centrodecustos update
 */
export type centrodecustosUpdateArgs = {
  /**
   * Select specific fields to fetch from the centrodecustos
  **/
  select?: XOR<centrodecustosSelect, null>
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: XOR<centrodecustosInclude, null>
  /**
   * The data needed to update a centrodecustos.
  **/
  data: centrodecustosUpdateInput
  /**
   * Choose, which centrodecustos to update.
  **/
  where: centrodecustosWhereUniqueInput
}


/**
 * centrodecustos updateMany
 */
export type centrodecustosUpdateManyArgs = {
  data: centrodecustosUpdateManyMutationInput
  where?: centrodecustosWhereInput
}


/**
 * centrodecustos upsert
 */
export type centrodecustosUpsertArgs = {
  /**
   * Select specific fields to fetch from the centrodecustos
  **/
  select?: XOR<centrodecustosSelect, null>
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: XOR<centrodecustosInclude, null>
  /**
   * The filter to search for the centrodecustos to update in case it exists.
  **/
  where: centrodecustosWhereUniqueInput
  /**
   * In case the centrodecustos found by the `where` argument doesn't exist, create a new centrodecustos with this data.
  **/
  create: centrodecustosCreateInput
  /**
   * In case the centrodecustos was found with the provided `where` argument, update it with this data.
  **/
  update: centrodecustosUpdateInput
}


/**
 * centrodecustos delete
 */
export type centrodecustosDeleteArgs = {
  /**
   * Select specific fields to fetch from the centrodecustos
  **/
  select?: XOR<centrodecustosSelect, null>
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: XOR<centrodecustosInclude, null>
  /**
   * Filter which centrodecustos to delete.
  **/
  where: centrodecustosWhereUniqueInput
}


/**
 * centrodecustos deleteMany
 */
export type centrodecustosDeleteManyArgs = {
  where?: centrodecustosWhereInput
}


/**
 * centrodecustos without action
 */
export type centrodecustosArgs = {
  /**
   * Select specific fields to fetch from the centrodecustos
  **/
  select?: XOR<centrodecustosSelect, null>
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: XOR<centrodecustosInclude, null>
}



/**
 * Model dados
 */

export type dados = {
  Id: number
  NmColaborador: string | null
  CPF: string | null
  IdEmpresa: number | null
  DtNascimento: string | null
  IdCentroDeCusto: string | null
  Matricula: string | null
  Escala: string | null
  Situacao: string | null
}


export type AggregateDados = {
  count: number
  avg: DadosAvgAggregateOutputType | null
  sum: DadosSumAggregateOutputType | null
  min: DadosMinAggregateOutputType | null
  max: DadosMaxAggregateOutputType | null
}

export type DadosAvgAggregateOutputType = {
  Id: number
  IdEmpresa: number | null
}

export type DadosSumAggregateOutputType = {
  Id: number
  IdEmpresa: number | null
}

export type DadosMinAggregateOutputType = {
  Id: number
  IdEmpresa: number | null
}

export type DadosMaxAggregateOutputType = {
  Id: number
  IdEmpresa: number | null
}


export type DadosAvgAggregateInputType = {
  Id?: true
  IdEmpresa?: true
}

export type DadosSumAggregateInputType = {
  Id?: true
  IdEmpresa?: true
}

export type DadosMinAggregateInputType = {
  Id?: true
  IdEmpresa?: true
}

export type DadosMaxAggregateInputType = {
  Id?: true
  IdEmpresa?: true
}

export type AggregateDadosArgs = {
  where?: dadosWhereInput
  orderBy?: XOR<Enumerable<dadosOrderByInput>, dadosOrderByInput>
  cursor?: dadosWhereUniqueInput
  take?: number
  skip?: number
  distinct?: Enumerable<DadosDistinctFieldEnum>
  count?: true
  avg?: DadosAvgAggregateInputType
  sum?: DadosSumAggregateInputType
  min?: DadosMinAggregateInputType
  max?: DadosMaxAggregateInputType
}

export type GetDadosAggregateType<T extends AggregateDadosArgs> = {
  [P in keyof T]: P extends 'count' ? number : GetDadosAggregateScalarType<T[P]>
}

export type GetDadosAggregateScalarType<T extends any> = {
  [P in keyof T]: P extends keyof DadosAvgAggregateOutputType ? DadosAvgAggregateOutputType[P] : never
}
    
    

export type dadosSelect = {
  Id?: boolean
  NmColaborador?: boolean
  CPF?: boolean
  IdEmpresa?: boolean
  DtNascimento?: boolean
  IdCentroDeCusto?: boolean
  Matricula?: boolean
  Escala?: boolean
  Situacao?: boolean
  empresas?: boolean | empresasArgs
  passagens?: boolean | FindManypassagensArgs
}

export type dadosInclude = {
  empresas?: boolean | empresasArgs
  passagens?: boolean | FindManypassagensArgs
}

export type dadosGetPayload<
  S extends boolean | null | undefined | dadosArgs,
  U = keyof S
> = S extends true
  ? dados
  : S extends undefined
  ? never
  : S extends dadosArgs | FindManydadosArgs
  ? 'include' extends U
    ? dados  & {
      [P in TrueKeys<S['include']>]:
      P extends 'empresas'
      ? empresasGetPayload<S['include'][P]> | null :
      P extends 'passagens'
      ? Array<passagensGetPayload<S['include'][P]>> : never
    }
  : 'select' extends U
    ? {
      [P in TrueKeys<S['select']>]:P extends keyof dados ? dados[P]
: 
      P extends 'empresas'
      ? empresasGetPayload<S['select'][P]> | null :
      P extends 'passagens'
      ? Array<passagensGetPayload<S['select'][P]>> : never
    }
  : dados
: dados


export interface dadosDelegate {
  /**
   * Find zero or one Dados that matches the filter.
   * @param {FindOnedadosArgs} args - Arguments to find a Dados
   * @example
   * // Get one Dados
   * const dados = await prisma.dados.findOne({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
  **/
  findOne<T extends FindOnedadosArgs>(
    args: Subset<T, FindOnedadosArgs>
  ): CheckSelect<T, Prisma__dadosClient<dados | null>, Prisma__dadosClient<dadosGetPayload<T> | null>>
  /**
   * Find the first Dados that matches the filter.
   * @param {FindFirstdadosArgs} args - Arguments to find a Dados
   * @example
   * // Get one Dados
   * const dados = await prisma.dados.findFirst({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
  **/
  findFirst<T extends FindFirstdadosArgs>(
    args?: Subset<T, FindFirstdadosArgs>
  ): CheckSelect<T, Prisma__dadosClient<dados | null>, Prisma__dadosClient<dadosGetPayload<T> | null>>
  /**
   * Find zero or more Dados that matches the filter.
   * @param {FindManydadosArgs=} args - Arguments to filter and select certain fields only.
   * @example
   * // Get all Dados
   * const dados = await prisma.dados.findMany()
   * 
   * // Get first 10 Dados
   * const dados = await prisma.dados.findMany({ take: 10 })
   * 
   * // Only select the `Id`
   * const dadosWithIdOnly = await prisma.dados.findMany({ select: { Id: true } })
   * 
  **/
  findMany<T extends FindManydadosArgs>(
    args?: Subset<T, FindManydadosArgs>
  ): CheckSelect<T, Promise<Array<dados>>, Promise<Array<dadosGetPayload<T>>>>
  /**
   * Create a Dados.
   * @param {dadosCreateArgs} args - Arguments to create a Dados.
   * @example
   * // Create one Dados
   * const Dados = await prisma.dados.create({
   *   data: {
   *     // ... data to create a Dados
   *   }
   * })
   * 
  **/
  create<T extends dadosCreateArgs>(
    args: Subset<T, dadosCreateArgs>
  ): CheckSelect<T, Prisma__dadosClient<dados>, Prisma__dadosClient<dadosGetPayload<T>>>
  /**
   * Delete a Dados.
   * @param {dadosDeleteArgs} args - Arguments to delete one Dados.
   * @example
   * // Delete one Dados
   * const Dados = await prisma.dados.delete({
   *   where: {
   *     // ... filter to delete one Dados
   *   }
   * })
   * 
  **/
  delete<T extends dadosDeleteArgs>(
    args: Subset<T, dadosDeleteArgs>
  ): CheckSelect<T, Prisma__dadosClient<dados>, Prisma__dadosClient<dadosGetPayload<T>>>
  /**
   * Update one Dados.
   * @param {dadosUpdateArgs} args - Arguments to update one Dados.
   * @example
   * // Update one Dados
   * const dados = await prisma.dados.update({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  update<T extends dadosUpdateArgs>(
    args: Subset<T, dadosUpdateArgs>
  ): CheckSelect<T, Prisma__dadosClient<dados>, Prisma__dadosClient<dadosGetPayload<T>>>
  /**
   * Delete zero or more Dados.
   * @param {dadosDeleteManyArgs} args - Arguments to filter Dados to delete.
   * @example
   * // Delete a few Dados
   * const { count } = await prisma.dados.deleteMany({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
   * 
  **/
  deleteMany<T extends dadosDeleteManyArgs>(
    args: Subset<T, dadosDeleteManyArgs>
  ): Promise<BatchPayload>
  /**
   * Update zero or more Dados.
   * @param {dadosUpdateManyArgs} args - Arguments to update one or more rows.
   * @example
   * // Update many Dados
   * const dados = await prisma.dados.updateMany({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  updateMany<T extends dadosUpdateManyArgs>(
    args: Subset<T, dadosUpdateManyArgs>
  ): Promise<BatchPayload>
  /**
   * Create or update one Dados.
   * @param {dadosUpsertArgs} args - Arguments to update or create a Dados.
   * @example
   * // Update or create a Dados
   * const dados = await prisma.dados.upsert({
   *   create: {
   *     // ... data to create a Dados
   *   },
   *   update: {
   *     // ... in case it already exists, update
   *   },
   *   where: {
   *     // ... the filter for the Dados we want to update
   *   }
   * })
  **/
  upsert<T extends dadosUpsertArgs>(
    args: Subset<T, dadosUpsertArgs>
  ): CheckSelect<T, Prisma__dadosClient<dados>, Prisma__dadosClient<dadosGetPayload<T>>>
  /**
   * Count
   */
  count(args?: Omit<FindManydadosArgs, 'select' | 'include'>): Promise<number>

  /**
   * Aggregate
   */
  aggregate<T extends AggregateDadosArgs>(args: Subset<T, AggregateDadosArgs>): Promise<GetDadosAggregateType<T>>
}

/**
 * The delegate class that acts as a "Promise-like" for dados.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in 
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export declare class Prisma__dadosClient<T> implements Promise<T> {
  private readonly _dmmf;
  private readonly _fetcher;
  private readonly _queryType;
  private readonly _rootField;
  private readonly _clientMethod;
  private readonly _args;
  private readonly _dataPath;
  private readonly _errorFormat;
  private readonly _measurePerformance?;
  private _isList;
  private _callsite;
  private _requestPromise?;
  constructor(_dmmf: DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
  readonly [Symbol.toStringTag]: 'PrismaClientPromise';

  empresas<T extends empresasArgs = {}>(args?: Subset<T, empresasArgs>): CheckSelect<T, Prisma__empresasClient<empresas | null>, Prisma__empresasClient<empresasGetPayload<T> | null>>;

  passagens<T extends FindManypassagensArgs = {}>(args?: Subset<T, FindManypassagensArgs>): CheckSelect<T, Promise<Array<passagens>>, Promise<Array<passagensGetPayload<T>>>>;

  private get _document();
  /**
   * Attaches callbacks for the resolution and/or rejection of the Promise.
   * @param onfulfilled The callback to execute when the Promise is resolved.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of which ever callback is executed.
   */
  then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | Promise<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | Promise<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
  /**
   * Attaches a callback for only the rejection of the Promise.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of the callback.
   */
  catch<TResult = never>(onrejected?: ((reason: any) => TResult | Promise<TResult>) | undefined | null): Promise<T | TResult>;
  /**
   * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
   * resolved value cannot be modified from the callback.
   * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
   * @returns A Promise for the completion of the callback.
   */
  finally(onfinally?: (() => void) | undefined | null): Promise<T>;
}

// Custom InputTypes

/**
 * dados findOne
 */
export type FindOnedadosArgs = {
  /**
   * Select specific fields to fetch from the dados
  **/
  select?: XOR<dadosSelect, null>
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: XOR<dadosInclude, null>
  /**
   * Filter, which dados to fetch.
  **/
  where: dadosWhereUniqueInput
}


/**
 * dados findFirst
 */
export type FindFirstdadosArgs = {
  /**
   * Select specific fields to fetch from the dados
  **/
  select?: XOR<dadosSelect, null>
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: XOR<dadosInclude, null>
  /**
   * Filter, which dados to fetch.
  **/
  where?: dadosWhereInput
  orderBy?: XOR<Enumerable<dadosOrderByInput>, dadosOrderByInput>
  cursor?: dadosWhereUniqueInput
  take?: number
  skip?: number
  distinct?: Enumerable<DadosDistinctFieldEnum>
}


/**
 * dados findMany
 */
export type FindManydadosArgs = {
  /**
   * Select specific fields to fetch from the dados
  **/
  select?: XOR<dadosSelect, null>
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: XOR<dadosInclude, null>
  /**
   * Filter, which dados to fetch.
  **/
  where?: dadosWhereInput
  /**
   * Determine the order of the dados to fetch.
  **/
  orderBy?: XOR<Enumerable<dadosOrderByInput>, dadosOrderByInput>
  /**
   * Sets the position for listing dados.
  **/
  cursor?: dadosWhereUniqueInput
  /**
   * The number of dados to fetch. If negative number, it will take dados before the `cursor`.
  **/
  take?: number
  /**
   * Skip the first `n` dados.
  **/
  skip?: number
  distinct?: Enumerable<DadosDistinctFieldEnum>
}


/**
 * dados create
 */
export type dadosCreateArgs = {
  /**
   * Select specific fields to fetch from the dados
  **/
  select?: XOR<dadosSelect, null>
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: XOR<dadosInclude, null>
  /**
   * The data needed to create a dados.
  **/
  data: dadosCreateInput
}


/**
 * dados update
 */
export type dadosUpdateArgs = {
  /**
   * Select specific fields to fetch from the dados
  **/
  select?: XOR<dadosSelect, null>
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: XOR<dadosInclude, null>
  /**
   * The data needed to update a dados.
  **/
  data: dadosUpdateInput
  /**
   * Choose, which dados to update.
  **/
  where: dadosWhereUniqueInput
}


/**
 * dados updateMany
 */
export type dadosUpdateManyArgs = {
  data: dadosUpdateManyMutationInput
  where?: dadosWhereInput
}


/**
 * dados upsert
 */
export type dadosUpsertArgs = {
  /**
   * Select specific fields to fetch from the dados
  **/
  select?: XOR<dadosSelect, null>
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: XOR<dadosInclude, null>
  /**
   * The filter to search for the dados to update in case it exists.
  **/
  where: dadosWhereUniqueInput
  /**
   * In case the dados found by the `where` argument doesn't exist, create a new dados with this data.
  **/
  create: dadosCreateInput
  /**
   * In case the dados was found with the provided `where` argument, update it with this data.
  **/
  update: dadosUpdateInput
}


/**
 * dados delete
 */
export type dadosDeleteArgs = {
  /**
   * Select specific fields to fetch from the dados
  **/
  select?: XOR<dadosSelect, null>
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: XOR<dadosInclude, null>
  /**
   * Filter which dados to delete.
  **/
  where: dadosWhereUniqueInput
}


/**
 * dados deleteMany
 */
export type dadosDeleteManyArgs = {
  where?: dadosWhereInput
}


/**
 * dados without action
 */
export type dadosArgs = {
  /**
   * Select specific fields to fetch from the dados
  **/
  select?: XOR<dadosSelect, null>
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: XOR<dadosInclude, null>
}



/**
 * Model empresas
 */

export type empresas = {
  Id: number
  CNPJ: string | null
  NmEmpresa: string | null
  NmFantasia: string | null
  Endereco: string | null
  CEP: string | null
  Situacao: string | null
  Tipo: string | null
}


export type AggregateEmpresas = {
  count: number
  avg: EmpresasAvgAggregateOutputType | null
  sum: EmpresasSumAggregateOutputType | null
  min: EmpresasMinAggregateOutputType | null
  max: EmpresasMaxAggregateOutputType | null
}

export type EmpresasAvgAggregateOutputType = {
  Id: number
}

export type EmpresasSumAggregateOutputType = {
  Id: number
}

export type EmpresasMinAggregateOutputType = {
  Id: number
}

export type EmpresasMaxAggregateOutputType = {
  Id: number
}


export type EmpresasAvgAggregateInputType = {
  Id?: true
}

export type EmpresasSumAggregateInputType = {
  Id?: true
}

export type EmpresasMinAggregateInputType = {
  Id?: true
}

export type EmpresasMaxAggregateInputType = {
  Id?: true
}

export type AggregateEmpresasArgs = {
  where?: empresasWhereInput
  orderBy?: XOR<Enumerable<empresasOrderByInput>, empresasOrderByInput>
  cursor?: empresasWhereUniqueInput
  take?: number
  skip?: number
  distinct?: Enumerable<EmpresasDistinctFieldEnum>
  count?: true
  avg?: EmpresasAvgAggregateInputType
  sum?: EmpresasSumAggregateInputType
  min?: EmpresasMinAggregateInputType
  max?: EmpresasMaxAggregateInputType
}

export type GetEmpresasAggregateType<T extends AggregateEmpresasArgs> = {
  [P in keyof T]: P extends 'count' ? number : GetEmpresasAggregateScalarType<T[P]>
}

export type GetEmpresasAggregateScalarType<T extends any> = {
  [P in keyof T]: P extends keyof EmpresasAvgAggregateOutputType ? EmpresasAvgAggregateOutputType[P] : never
}
    
    

export type empresasSelect = {
  Id?: boolean
  CNPJ?: boolean
  NmEmpresa?: boolean
  NmFantasia?: boolean
  Endereco?: boolean
  CEP?: boolean
  Situacao?: boolean
  Tipo?: boolean
  centrodecustos?: boolean | FindManycentrodecustosArgs
  dados?: boolean | FindManydadosArgs
  operadoras?: boolean | FindManyoperadorasArgs
}

export type empresasInclude = {
  centrodecustos?: boolean | FindManycentrodecustosArgs
  dados?: boolean | FindManydadosArgs
  operadoras?: boolean | FindManyoperadorasArgs
}

export type empresasGetPayload<
  S extends boolean | null | undefined | empresasArgs,
  U = keyof S
> = S extends true
  ? empresas
  : S extends undefined
  ? never
  : S extends empresasArgs | FindManyempresasArgs
  ? 'include' extends U
    ? empresas  & {
      [P in TrueKeys<S['include']>]:
      P extends 'centrodecustos'
      ? Array<centrodecustosGetPayload<S['include'][P]>> :
      P extends 'dados'
      ? Array<dadosGetPayload<S['include'][P]>> :
      P extends 'operadoras'
      ? Array<operadorasGetPayload<S['include'][P]>> : never
    }
  : 'select' extends U
    ? {
      [P in TrueKeys<S['select']>]:P extends keyof empresas ? empresas[P]
: 
      P extends 'centrodecustos'
      ? Array<centrodecustosGetPayload<S['select'][P]>> :
      P extends 'dados'
      ? Array<dadosGetPayload<S['select'][P]>> :
      P extends 'operadoras'
      ? Array<operadorasGetPayload<S['select'][P]>> : never
    }
  : empresas
: empresas


export interface empresasDelegate {
  /**
   * Find zero or one Empresas that matches the filter.
   * @param {FindOneempresasArgs} args - Arguments to find a Empresas
   * @example
   * // Get one Empresas
   * const empresas = await prisma.empresas.findOne({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
  **/
  findOne<T extends FindOneempresasArgs>(
    args: Subset<T, FindOneempresasArgs>
  ): CheckSelect<T, Prisma__empresasClient<empresas | null>, Prisma__empresasClient<empresasGetPayload<T> | null>>
  /**
   * Find the first Empresas that matches the filter.
   * @param {FindFirstempresasArgs} args - Arguments to find a Empresas
   * @example
   * // Get one Empresas
   * const empresas = await prisma.empresas.findFirst({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
  **/
  findFirst<T extends FindFirstempresasArgs>(
    args?: Subset<T, FindFirstempresasArgs>
  ): CheckSelect<T, Prisma__empresasClient<empresas | null>, Prisma__empresasClient<empresasGetPayload<T> | null>>
  /**
   * Find zero or more Empresas that matches the filter.
   * @param {FindManyempresasArgs=} args - Arguments to filter and select certain fields only.
   * @example
   * // Get all Empresas
   * const empresas = await prisma.empresas.findMany()
   * 
   * // Get first 10 Empresas
   * const empresas = await prisma.empresas.findMany({ take: 10 })
   * 
   * // Only select the `Id`
   * const empresasWithIdOnly = await prisma.empresas.findMany({ select: { Id: true } })
   * 
  **/
  findMany<T extends FindManyempresasArgs>(
    args?: Subset<T, FindManyempresasArgs>
  ): CheckSelect<T, Promise<Array<empresas>>, Promise<Array<empresasGetPayload<T>>>>
  /**
   * Create a Empresas.
   * @param {empresasCreateArgs} args - Arguments to create a Empresas.
   * @example
   * // Create one Empresas
   * const Empresas = await prisma.empresas.create({
   *   data: {
   *     // ... data to create a Empresas
   *   }
   * })
   * 
  **/
  create<T extends empresasCreateArgs>(
    args: Subset<T, empresasCreateArgs>
  ): CheckSelect<T, Prisma__empresasClient<empresas>, Prisma__empresasClient<empresasGetPayload<T>>>
  /**
   * Delete a Empresas.
   * @param {empresasDeleteArgs} args - Arguments to delete one Empresas.
   * @example
   * // Delete one Empresas
   * const Empresas = await prisma.empresas.delete({
   *   where: {
   *     // ... filter to delete one Empresas
   *   }
   * })
   * 
  **/
  delete<T extends empresasDeleteArgs>(
    args: Subset<T, empresasDeleteArgs>
  ): CheckSelect<T, Prisma__empresasClient<empresas>, Prisma__empresasClient<empresasGetPayload<T>>>
  /**
   * Update one Empresas.
   * @param {empresasUpdateArgs} args - Arguments to update one Empresas.
   * @example
   * // Update one Empresas
   * const empresas = await prisma.empresas.update({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  update<T extends empresasUpdateArgs>(
    args: Subset<T, empresasUpdateArgs>
  ): CheckSelect<T, Prisma__empresasClient<empresas>, Prisma__empresasClient<empresasGetPayload<T>>>
  /**
   * Delete zero or more Empresas.
   * @param {empresasDeleteManyArgs} args - Arguments to filter Empresas to delete.
   * @example
   * // Delete a few Empresas
   * const { count } = await prisma.empresas.deleteMany({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
   * 
  **/
  deleteMany<T extends empresasDeleteManyArgs>(
    args: Subset<T, empresasDeleteManyArgs>
  ): Promise<BatchPayload>
  /**
   * Update zero or more Empresas.
   * @param {empresasUpdateManyArgs} args - Arguments to update one or more rows.
   * @example
   * // Update many Empresas
   * const empresas = await prisma.empresas.updateMany({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  updateMany<T extends empresasUpdateManyArgs>(
    args: Subset<T, empresasUpdateManyArgs>
  ): Promise<BatchPayload>
  /**
   * Create or update one Empresas.
   * @param {empresasUpsertArgs} args - Arguments to update or create a Empresas.
   * @example
   * // Update or create a Empresas
   * const empresas = await prisma.empresas.upsert({
   *   create: {
   *     // ... data to create a Empresas
   *   },
   *   update: {
   *     // ... in case it already exists, update
   *   },
   *   where: {
   *     // ... the filter for the Empresas we want to update
   *   }
   * })
  **/
  upsert<T extends empresasUpsertArgs>(
    args: Subset<T, empresasUpsertArgs>
  ): CheckSelect<T, Prisma__empresasClient<empresas>, Prisma__empresasClient<empresasGetPayload<T>>>
  /**
   * Count
   */
  count(args?: Omit<FindManyempresasArgs, 'select' | 'include'>): Promise<number>

  /**
   * Aggregate
   */
  aggregate<T extends AggregateEmpresasArgs>(args: Subset<T, AggregateEmpresasArgs>): Promise<GetEmpresasAggregateType<T>>
}

/**
 * The delegate class that acts as a "Promise-like" for empresas.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in 
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export declare class Prisma__empresasClient<T> implements Promise<T> {
  private readonly _dmmf;
  private readonly _fetcher;
  private readonly _queryType;
  private readonly _rootField;
  private readonly _clientMethod;
  private readonly _args;
  private readonly _dataPath;
  private readonly _errorFormat;
  private readonly _measurePerformance?;
  private _isList;
  private _callsite;
  private _requestPromise?;
  constructor(_dmmf: DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
  readonly [Symbol.toStringTag]: 'PrismaClientPromise';

  centrodecustos<T extends FindManycentrodecustosArgs = {}>(args?: Subset<T, FindManycentrodecustosArgs>): CheckSelect<T, Promise<Array<centrodecustos>>, Promise<Array<centrodecustosGetPayload<T>>>>;

  dados<T extends FindManydadosArgs = {}>(args?: Subset<T, FindManydadosArgs>): CheckSelect<T, Promise<Array<dados>>, Promise<Array<dadosGetPayload<T>>>>;

  operadoras<T extends FindManyoperadorasArgs = {}>(args?: Subset<T, FindManyoperadorasArgs>): CheckSelect<T, Promise<Array<operadoras>>, Promise<Array<operadorasGetPayload<T>>>>;

  private get _document();
  /**
   * Attaches callbacks for the resolution and/or rejection of the Promise.
   * @param onfulfilled The callback to execute when the Promise is resolved.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of which ever callback is executed.
   */
  then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | Promise<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | Promise<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
  /**
   * Attaches a callback for only the rejection of the Promise.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of the callback.
   */
  catch<TResult = never>(onrejected?: ((reason: any) => TResult | Promise<TResult>) | undefined | null): Promise<T | TResult>;
  /**
   * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
   * resolved value cannot be modified from the callback.
   * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
   * @returns A Promise for the completion of the callback.
   */
  finally(onfinally?: (() => void) | undefined | null): Promise<T>;
}

// Custom InputTypes

/**
 * empresas findOne
 */
export type FindOneempresasArgs = {
  /**
   * Select specific fields to fetch from the empresas
  **/
  select?: XOR<empresasSelect, null>
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: XOR<empresasInclude, null>
  /**
   * Filter, which empresas to fetch.
  **/
  where: empresasWhereUniqueInput
}


/**
 * empresas findFirst
 */
export type FindFirstempresasArgs = {
  /**
   * Select specific fields to fetch from the empresas
  **/
  select?: XOR<empresasSelect, null>
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: XOR<empresasInclude, null>
  /**
   * Filter, which empresas to fetch.
  **/
  where?: empresasWhereInput
  orderBy?: XOR<Enumerable<empresasOrderByInput>, empresasOrderByInput>
  cursor?: empresasWhereUniqueInput
  take?: number
  skip?: number
  distinct?: Enumerable<EmpresasDistinctFieldEnum>
}


/**
 * empresas findMany
 */
export type FindManyempresasArgs = {
  /**
   * Select specific fields to fetch from the empresas
  **/
  select?: XOR<empresasSelect, null>
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: XOR<empresasInclude, null>
  /**
   * Filter, which empresas to fetch.
  **/
  where?: empresasWhereInput
  /**
   * Determine the order of the empresas to fetch.
  **/
  orderBy?: XOR<Enumerable<empresasOrderByInput>, empresasOrderByInput>
  /**
   * Sets the position for listing empresas.
  **/
  cursor?: empresasWhereUniqueInput
  /**
   * The number of empresas to fetch. If negative number, it will take empresas before the `cursor`.
  **/
  take?: number
  /**
   * Skip the first `n` empresas.
  **/
  skip?: number
  distinct?: Enumerable<EmpresasDistinctFieldEnum>
}


/**
 * empresas create
 */
export type empresasCreateArgs = {
  /**
   * Select specific fields to fetch from the empresas
  **/
  select?: XOR<empresasSelect, null>
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: XOR<empresasInclude, null>
  /**
   * The data needed to create a empresas.
  **/
  data: empresasCreateInput
}


/**
 * empresas update
 */
export type empresasUpdateArgs = {
  /**
   * Select specific fields to fetch from the empresas
  **/
  select?: XOR<empresasSelect, null>
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: XOR<empresasInclude, null>
  /**
   * The data needed to update a empresas.
  **/
  data: empresasUpdateInput
  /**
   * Choose, which empresas to update.
  **/
  where: empresasWhereUniqueInput
}


/**
 * empresas updateMany
 */
export type empresasUpdateManyArgs = {
  data: empresasUpdateManyMutationInput
  where?: empresasWhereInput
}


/**
 * empresas upsert
 */
export type empresasUpsertArgs = {
  /**
   * Select specific fields to fetch from the empresas
  **/
  select?: XOR<empresasSelect, null>
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: XOR<empresasInclude, null>
  /**
   * The filter to search for the empresas to update in case it exists.
  **/
  where: empresasWhereUniqueInput
  /**
   * In case the empresas found by the `where` argument doesn't exist, create a new empresas with this data.
  **/
  create: empresasCreateInput
  /**
   * In case the empresas was found with the provided `where` argument, update it with this data.
  **/
  update: empresasUpdateInput
}


/**
 * empresas delete
 */
export type empresasDeleteArgs = {
  /**
   * Select specific fields to fetch from the empresas
  **/
  select?: XOR<empresasSelect, null>
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: XOR<empresasInclude, null>
  /**
   * Filter which empresas to delete.
  **/
  where: empresasWhereUniqueInput
}


/**
 * empresas deleteMany
 */
export type empresasDeleteManyArgs = {
  where?: empresasWhereInput
}


/**
 * empresas without action
 */
export type empresasArgs = {
  /**
   * Select specific fields to fetch from the empresas
  **/
  select?: XOR<empresasSelect, null>
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: XOR<empresasInclude, null>
}



/**
 * Model operadoras
 */

export type operadoras = {
  Id: number
  NmOperadora: string | null
  IdEmpresa: number | null
  UF: string | null
}


export type AggregateOperadoras = {
  count: number
  avg: OperadorasAvgAggregateOutputType | null
  sum: OperadorasSumAggregateOutputType | null
  min: OperadorasMinAggregateOutputType | null
  max: OperadorasMaxAggregateOutputType | null
}

export type OperadorasAvgAggregateOutputType = {
  Id: number
  IdEmpresa: number | null
}

export type OperadorasSumAggregateOutputType = {
  Id: number
  IdEmpresa: number | null
}

export type OperadorasMinAggregateOutputType = {
  Id: number
  IdEmpresa: number | null
}

export type OperadorasMaxAggregateOutputType = {
  Id: number
  IdEmpresa: number | null
}


export type OperadorasAvgAggregateInputType = {
  Id?: true
  IdEmpresa?: true
}

export type OperadorasSumAggregateInputType = {
  Id?: true
  IdEmpresa?: true
}

export type OperadorasMinAggregateInputType = {
  Id?: true
  IdEmpresa?: true
}

export type OperadorasMaxAggregateInputType = {
  Id?: true
  IdEmpresa?: true
}

export type AggregateOperadorasArgs = {
  where?: operadorasWhereInput
  orderBy?: XOR<Enumerable<operadorasOrderByInput>, operadorasOrderByInput>
  cursor?: operadorasWhereUniqueInput
  take?: number
  skip?: number
  distinct?: Enumerable<OperadorasDistinctFieldEnum>
  count?: true
  avg?: OperadorasAvgAggregateInputType
  sum?: OperadorasSumAggregateInputType
  min?: OperadorasMinAggregateInputType
  max?: OperadorasMaxAggregateInputType
}

export type GetOperadorasAggregateType<T extends AggregateOperadorasArgs> = {
  [P in keyof T]: P extends 'count' ? number : GetOperadorasAggregateScalarType<T[P]>
}

export type GetOperadorasAggregateScalarType<T extends any> = {
  [P in keyof T]: P extends keyof OperadorasAvgAggregateOutputType ? OperadorasAvgAggregateOutputType[P] : never
}
    
    

export type operadorasSelect = {
  Id?: boolean
  NmOperadora?: boolean
  IdEmpresa?: boolean
  UF?: boolean
  empresas?: boolean | empresasArgs
  passagens?: boolean | FindManypassagensArgs
}

export type operadorasInclude = {
  empresas?: boolean | empresasArgs
  passagens?: boolean | FindManypassagensArgs
}

export type operadorasGetPayload<
  S extends boolean | null | undefined | operadorasArgs,
  U = keyof S
> = S extends true
  ? operadoras
  : S extends undefined
  ? never
  : S extends operadorasArgs | FindManyoperadorasArgs
  ? 'include' extends U
    ? operadoras  & {
      [P in TrueKeys<S['include']>]:
      P extends 'empresas'
      ? empresasGetPayload<S['include'][P]> | null :
      P extends 'passagens'
      ? Array<passagensGetPayload<S['include'][P]>> : never
    }
  : 'select' extends U
    ? {
      [P in TrueKeys<S['select']>]:P extends keyof operadoras ? operadoras[P]
: 
      P extends 'empresas'
      ? empresasGetPayload<S['select'][P]> | null :
      P extends 'passagens'
      ? Array<passagensGetPayload<S['select'][P]>> : never
    }
  : operadoras
: operadoras


export interface operadorasDelegate {
  /**
   * Find zero or one Operadoras that matches the filter.
   * @param {FindOneoperadorasArgs} args - Arguments to find a Operadoras
   * @example
   * // Get one Operadoras
   * const operadoras = await prisma.operadoras.findOne({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
  **/
  findOne<T extends FindOneoperadorasArgs>(
    args: Subset<T, FindOneoperadorasArgs>
  ): CheckSelect<T, Prisma__operadorasClient<operadoras | null>, Prisma__operadorasClient<operadorasGetPayload<T> | null>>
  /**
   * Find the first Operadoras that matches the filter.
   * @param {FindFirstoperadorasArgs} args - Arguments to find a Operadoras
   * @example
   * // Get one Operadoras
   * const operadoras = await prisma.operadoras.findFirst({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
  **/
  findFirst<T extends FindFirstoperadorasArgs>(
    args?: Subset<T, FindFirstoperadorasArgs>
  ): CheckSelect<T, Prisma__operadorasClient<operadoras | null>, Prisma__operadorasClient<operadorasGetPayload<T> | null>>
  /**
   * Find zero or more Operadoras that matches the filter.
   * @param {FindManyoperadorasArgs=} args - Arguments to filter and select certain fields only.
   * @example
   * // Get all Operadoras
   * const operadoras = await prisma.operadoras.findMany()
   * 
   * // Get first 10 Operadoras
   * const operadoras = await prisma.operadoras.findMany({ take: 10 })
   * 
   * // Only select the `Id`
   * const operadorasWithIdOnly = await prisma.operadoras.findMany({ select: { Id: true } })
   * 
  **/
  findMany<T extends FindManyoperadorasArgs>(
    args?: Subset<T, FindManyoperadorasArgs>
  ): CheckSelect<T, Promise<Array<operadoras>>, Promise<Array<operadorasGetPayload<T>>>>
  /**
   * Create a Operadoras.
   * @param {operadorasCreateArgs} args - Arguments to create a Operadoras.
   * @example
   * // Create one Operadoras
   * const Operadoras = await prisma.operadoras.create({
   *   data: {
   *     // ... data to create a Operadoras
   *   }
   * })
   * 
  **/
  create<T extends operadorasCreateArgs>(
    args: Subset<T, operadorasCreateArgs>
  ): CheckSelect<T, Prisma__operadorasClient<operadoras>, Prisma__operadorasClient<operadorasGetPayload<T>>>
  /**
   * Delete a Operadoras.
   * @param {operadorasDeleteArgs} args - Arguments to delete one Operadoras.
   * @example
   * // Delete one Operadoras
   * const Operadoras = await prisma.operadoras.delete({
   *   where: {
   *     // ... filter to delete one Operadoras
   *   }
   * })
   * 
  **/
  delete<T extends operadorasDeleteArgs>(
    args: Subset<T, operadorasDeleteArgs>
  ): CheckSelect<T, Prisma__operadorasClient<operadoras>, Prisma__operadorasClient<operadorasGetPayload<T>>>
  /**
   * Update one Operadoras.
   * @param {operadorasUpdateArgs} args - Arguments to update one Operadoras.
   * @example
   * // Update one Operadoras
   * const operadoras = await prisma.operadoras.update({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  update<T extends operadorasUpdateArgs>(
    args: Subset<T, operadorasUpdateArgs>
  ): CheckSelect<T, Prisma__operadorasClient<operadoras>, Prisma__operadorasClient<operadorasGetPayload<T>>>
  /**
   * Delete zero or more Operadoras.
   * @param {operadorasDeleteManyArgs} args - Arguments to filter Operadoras to delete.
   * @example
   * // Delete a few Operadoras
   * const { count } = await prisma.operadoras.deleteMany({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
   * 
  **/
  deleteMany<T extends operadorasDeleteManyArgs>(
    args: Subset<T, operadorasDeleteManyArgs>
  ): Promise<BatchPayload>
  /**
   * Update zero or more Operadoras.
   * @param {operadorasUpdateManyArgs} args - Arguments to update one or more rows.
   * @example
   * // Update many Operadoras
   * const operadoras = await prisma.operadoras.updateMany({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  updateMany<T extends operadorasUpdateManyArgs>(
    args: Subset<T, operadorasUpdateManyArgs>
  ): Promise<BatchPayload>
  /**
   * Create or update one Operadoras.
   * @param {operadorasUpsertArgs} args - Arguments to update or create a Operadoras.
   * @example
   * // Update or create a Operadoras
   * const operadoras = await prisma.operadoras.upsert({
   *   create: {
   *     // ... data to create a Operadoras
   *   },
   *   update: {
   *     // ... in case it already exists, update
   *   },
   *   where: {
   *     // ... the filter for the Operadoras we want to update
   *   }
   * })
  **/
  upsert<T extends operadorasUpsertArgs>(
    args: Subset<T, operadorasUpsertArgs>
  ): CheckSelect<T, Prisma__operadorasClient<operadoras>, Prisma__operadorasClient<operadorasGetPayload<T>>>
  /**
   * Count
   */
  count(args?: Omit<FindManyoperadorasArgs, 'select' | 'include'>): Promise<number>

  /**
   * Aggregate
   */
  aggregate<T extends AggregateOperadorasArgs>(args: Subset<T, AggregateOperadorasArgs>): Promise<GetOperadorasAggregateType<T>>
}

/**
 * The delegate class that acts as a "Promise-like" for operadoras.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in 
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export declare class Prisma__operadorasClient<T> implements Promise<T> {
  private readonly _dmmf;
  private readonly _fetcher;
  private readonly _queryType;
  private readonly _rootField;
  private readonly _clientMethod;
  private readonly _args;
  private readonly _dataPath;
  private readonly _errorFormat;
  private readonly _measurePerformance?;
  private _isList;
  private _callsite;
  private _requestPromise?;
  constructor(_dmmf: DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
  readonly [Symbol.toStringTag]: 'PrismaClientPromise';

  empresas<T extends empresasArgs = {}>(args?: Subset<T, empresasArgs>): CheckSelect<T, Prisma__empresasClient<empresas | null>, Prisma__empresasClient<empresasGetPayload<T> | null>>;

  passagens<T extends FindManypassagensArgs = {}>(args?: Subset<T, FindManypassagensArgs>): CheckSelect<T, Promise<Array<passagens>>, Promise<Array<passagensGetPayload<T>>>>;

  private get _document();
  /**
   * Attaches callbacks for the resolution and/or rejection of the Promise.
   * @param onfulfilled The callback to execute when the Promise is resolved.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of which ever callback is executed.
   */
  then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | Promise<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | Promise<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
  /**
   * Attaches a callback for only the rejection of the Promise.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of the callback.
   */
  catch<TResult = never>(onrejected?: ((reason: any) => TResult | Promise<TResult>) | undefined | null): Promise<T | TResult>;
  /**
   * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
   * resolved value cannot be modified from the callback.
   * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
   * @returns A Promise for the completion of the callback.
   */
  finally(onfinally?: (() => void) | undefined | null): Promise<T>;
}

// Custom InputTypes

/**
 * operadoras findOne
 */
export type FindOneoperadorasArgs = {
  /**
   * Select specific fields to fetch from the operadoras
  **/
  select?: XOR<operadorasSelect, null>
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: XOR<operadorasInclude, null>
  /**
   * Filter, which operadoras to fetch.
  **/
  where: operadorasWhereUniqueInput
}


/**
 * operadoras findFirst
 */
export type FindFirstoperadorasArgs = {
  /**
   * Select specific fields to fetch from the operadoras
  **/
  select?: XOR<operadorasSelect, null>
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: XOR<operadorasInclude, null>
  /**
   * Filter, which operadoras to fetch.
  **/
  where?: operadorasWhereInput
  orderBy?: XOR<Enumerable<operadorasOrderByInput>, operadorasOrderByInput>
  cursor?: operadorasWhereUniqueInput
  take?: number
  skip?: number
  distinct?: Enumerable<OperadorasDistinctFieldEnum>
}


/**
 * operadoras findMany
 */
export type FindManyoperadorasArgs = {
  /**
   * Select specific fields to fetch from the operadoras
  **/
  select?: XOR<operadorasSelect, null>
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: XOR<operadorasInclude, null>
  /**
   * Filter, which operadoras to fetch.
  **/
  where?: operadorasWhereInput
  /**
   * Determine the order of the operadoras to fetch.
  **/
  orderBy?: XOR<Enumerable<operadorasOrderByInput>, operadorasOrderByInput>
  /**
   * Sets the position for listing operadoras.
  **/
  cursor?: operadorasWhereUniqueInput
  /**
   * The number of operadoras to fetch. If negative number, it will take operadoras before the `cursor`.
  **/
  take?: number
  /**
   * Skip the first `n` operadoras.
  **/
  skip?: number
  distinct?: Enumerable<OperadorasDistinctFieldEnum>
}


/**
 * operadoras create
 */
export type operadorasCreateArgs = {
  /**
   * Select specific fields to fetch from the operadoras
  **/
  select?: XOR<operadorasSelect, null>
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: XOR<operadorasInclude, null>
  /**
   * The data needed to create a operadoras.
  **/
  data: operadorasCreateInput
}


/**
 * operadoras update
 */
export type operadorasUpdateArgs = {
  /**
   * Select specific fields to fetch from the operadoras
  **/
  select?: XOR<operadorasSelect, null>
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: XOR<operadorasInclude, null>
  /**
   * The data needed to update a operadoras.
  **/
  data: operadorasUpdateInput
  /**
   * Choose, which operadoras to update.
  **/
  where: operadorasWhereUniqueInput
}


/**
 * operadoras updateMany
 */
export type operadorasUpdateManyArgs = {
  data: operadorasUpdateManyMutationInput
  where?: operadorasWhereInput
}


/**
 * operadoras upsert
 */
export type operadorasUpsertArgs = {
  /**
   * Select specific fields to fetch from the operadoras
  **/
  select?: XOR<operadorasSelect, null>
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: XOR<operadorasInclude, null>
  /**
   * The filter to search for the operadoras to update in case it exists.
  **/
  where: operadorasWhereUniqueInput
  /**
   * In case the operadoras found by the `where` argument doesn't exist, create a new operadoras with this data.
  **/
  create: operadorasCreateInput
  /**
   * In case the operadoras was found with the provided `where` argument, update it with this data.
  **/
  update: operadorasUpdateInput
}


/**
 * operadoras delete
 */
export type operadorasDeleteArgs = {
  /**
   * Select specific fields to fetch from the operadoras
  **/
  select?: XOR<operadorasSelect, null>
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: XOR<operadorasInclude, null>
  /**
   * Filter which operadoras to delete.
  **/
  where: operadorasWhereUniqueInput
}


/**
 * operadoras deleteMany
 */
export type operadorasDeleteManyArgs = {
  where?: operadorasWhereInput
}


/**
 * operadoras without action
 */
export type operadorasArgs = {
  /**
   * Select specific fields to fetch from the operadoras
  **/
  select?: XOR<operadorasSelect, null>
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: XOR<operadorasInclude, null>
}



/**
 * Model passagens
 */

export type passagens = {
  Id: number
  CPFUsuario: string | null
  NrCartao: string | null
  Valor: number | null
  IdOperadora: number | null
  QtdDia: number | null
}


export type AggregatePassagens = {
  count: number
  avg: PassagensAvgAggregateOutputType | null
  sum: PassagensSumAggregateOutputType | null
  min: PassagensMinAggregateOutputType | null
  max: PassagensMaxAggregateOutputType | null
}

export type PassagensAvgAggregateOutputType = {
  Id: number
  Valor: number | null
  IdOperadora: number | null
  QtdDia: number | null
}

export type PassagensSumAggregateOutputType = {
  Id: number
  Valor: number | null
  IdOperadora: number | null
  QtdDia: number | null
}

export type PassagensMinAggregateOutputType = {
  Id: number
  Valor: number | null
  IdOperadora: number | null
  QtdDia: number | null
}

export type PassagensMaxAggregateOutputType = {
  Id: number
  Valor: number | null
  IdOperadora: number | null
  QtdDia: number | null
}


export type PassagensAvgAggregateInputType = {
  Id?: true
  Valor?: true
  IdOperadora?: true
  QtdDia?: true
}

export type PassagensSumAggregateInputType = {
  Id?: true
  Valor?: true
  IdOperadora?: true
  QtdDia?: true
}

export type PassagensMinAggregateInputType = {
  Id?: true
  Valor?: true
  IdOperadora?: true
  QtdDia?: true
}

export type PassagensMaxAggregateInputType = {
  Id?: true
  Valor?: true
  IdOperadora?: true
  QtdDia?: true
}

export type AggregatePassagensArgs = {
  where?: passagensWhereInput
  orderBy?: XOR<Enumerable<passagensOrderByInput>, passagensOrderByInput>
  cursor?: passagensWhereUniqueInput
  take?: number
  skip?: number
  distinct?: Enumerable<PassagensDistinctFieldEnum>
  count?: true
  avg?: PassagensAvgAggregateInputType
  sum?: PassagensSumAggregateInputType
  min?: PassagensMinAggregateInputType
  max?: PassagensMaxAggregateInputType
}

export type GetPassagensAggregateType<T extends AggregatePassagensArgs> = {
  [P in keyof T]: P extends 'count' ? number : GetPassagensAggregateScalarType<T[P]>
}

export type GetPassagensAggregateScalarType<T extends any> = {
  [P in keyof T]: P extends keyof PassagensAvgAggregateOutputType ? PassagensAvgAggregateOutputType[P] : never
}
    
    

export type passagensSelect = {
  Id?: boolean
  CPFUsuario?: boolean
  NrCartao?: boolean
  Valor?: boolean
  IdOperadora?: boolean
  QtdDia?: boolean
  dados?: boolean | dadosArgs
  operadoras?: boolean | operadorasArgs
}

export type passagensInclude = {
  dados?: boolean | dadosArgs
  operadoras?: boolean | operadorasArgs
}

export type passagensGetPayload<
  S extends boolean | null | undefined | passagensArgs,
  U = keyof S
> = S extends true
  ? passagens
  : S extends undefined
  ? never
  : S extends passagensArgs | FindManypassagensArgs
  ? 'include' extends U
    ? passagens  & {
      [P in TrueKeys<S['include']>]:
      P extends 'dados'
      ? dadosGetPayload<S['include'][P]> | null :
      P extends 'operadoras'
      ? operadorasGetPayload<S['include'][P]> | null : never
    }
  : 'select' extends U
    ? {
      [P in TrueKeys<S['select']>]:P extends keyof passagens ? passagens[P]
: 
      P extends 'dados'
      ? dadosGetPayload<S['select'][P]> | null :
      P extends 'operadoras'
      ? operadorasGetPayload<S['select'][P]> | null : never
    }
  : passagens
: passagens


export interface passagensDelegate {
  /**
   * Find zero or one Passagens that matches the filter.
   * @param {FindOnepassagensArgs} args - Arguments to find a Passagens
   * @example
   * // Get one Passagens
   * const passagens = await prisma.passagens.findOne({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
  **/
  findOne<T extends FindOnepassagensArgs>(
    args: Subset<T, FindOnepassagensArgs>
  ): CheckSelect<T, Prisma__passagensClient<passagens | null>, Prisma__passagensClient<passagensGetPayload<T> | null>>
  /**
   * Find the first Passagens that matches the filter.
   * @param {FindFirstpassagensArgs} args - Arguments to find a Passagens
   * @example
   * // Get one Passagens
   * const passagens = await prisma.passagens.findFirst({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
  **/
  findFirst<T extends FindFirstpassagensArgs>(
    args?: Subset<T, FindFirstpassagensArgs>
  ): CheckSelect<T, Prisma__passagensClient<passagens | null>, Prisma__passagensClient<passagensGetPayload<T> | null>>
  /**
   * Find zero or more Passagens that matches the filter.
   * @param {FindManypassagensArgs=} args - Arguments to filter and select certain fields only.
   * @example
   * // Get all Passagens
   * const passagens = await prisma.passagens.findMany()
   * 
   * // Get first 10 Passagens
   * const passagens = await prisma.passagens.findMany({ take: 10 })
   * 
   * // Only select the `Id`
   * const passagensWithIdOnly = await prisma.passagens.findMany({ select: { Id: true } })
   * 
  **/
  findMany<T extends FindManypassagensArgs>(
    args?: Subset<T, FindManypassagensArgs>
  ): CheckSelect<T, Promise<Array<passagens>>, Promise<Array<passagensGetPayload<T>>>>
  /**
   * Create a Passagens.
   * @param {passagensCreateArgs} args - Arguments to create a Passagens.
   * @example
   * // Create one Passagens
   * const Passagens = await prisma.passagens.create({
   *   data: {
   *     // ... data to create a Passagens
   *   }
   * })
   * 
  **/
  create<T extends passagensCreateArgs>(
    args: Subset<T, passagensCreateArgs>
  ): CheckSelect<T, Prisma__passagensClient<passagens>, Prisma__passagensClient<passagensGetPayload<T>>>
  /**
   * Delete a Passagens.
   * @param {passagensDeleteArgs} args - Arguments to delete one Passagens.
   * @example
   * // Delete one Passagens
   * const Passagens = await prisma.passagens.delete({
   *   where: {
   *     // ... filter to delete one Passagens
   *   }
   * })
   * 
  **/
  delete<T extends passagensDeleteArgs>(
    args: Subset<T, passagensDeleteArgs>
  ): CheckSelect<T, Prisma__passagensClient<passagens>, Prisma__passagensClient<passagensGetPayload<T>>>
  /**
   * Update one Passagens.
   * @param {passagensUpdateArgs} args - Arguments to update one Passagens.
   * @example
   * // Update one Passagens
   * const passagens = await prisma.passagens.update({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  update<T extends passagensUpdateArgs>(
    args: Subset<T, passagensUpdateArgs>
  ): CheckSelect<T, Prisma__passagensClient<passagens>, Prisma__passagensClient<passagensGetPayload<T>>>
  /**
   * Delete zero or more Passagens.
   * @param {passagensDeleteManyArgs} args - Arguments to filter Passagens to delete.
   * @example
   * // Delete a few Passagens
   * const { count } = await prisma.passagens.deleteMany({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
   * 
  **/
  deleteMany<T extends passagensDeleteManyArgs>(
    args: Subset<T, passagensDeleteManyArgs>
  ): Promise<BatchPayload>
  /**
   * Update zero or more Passagens.
   * @param {passagensUpdateManyArgs} args - Arguments to update one or more rows.
   * @example
   * // Update many Passagens
   * const passagens = await prisma.passagens.updateMany({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  updateMany<T extends passagensUpdateManyArgs>(
    args: Subset<T, passagensUpdateManyArgs>
  ): Promise<BatchPayload>
  /**
   * Create or update one Passagens.
   * @param {passagensUpsertArgs} args - Arguments to update or create a Passagens.
   * @example
   * // Update or create a Passagens
   * const passagens = await prisma.passagens.upsert({
   *   create: {
   *     // ... data to create a Passagens
   *   },
   *   update: {
   *     // ... in case it already exists, update
   *   },
   *   where: {
   *     // ... the filter for the Passagens we want to update
   *   }
   * })
  **/
  upsert<T extends passagensUpsertArgs>(
    args: Subset<T, passagensUpsertArgs>
  ): CheckSelect<T, Prisma__passagensClient<passagens>, Prisma__passagensClient<passagensGetPayload<T>>>
  /**
   * Count
   */
  count(args?: Omit<FindManypassagensArgs, 'select' | 'include'>): Promise<number>

  /**
   * Aggregate
   */
  aggregate<T extends AggregatePassagensArgs>(args: Subset<T, AggregatePassagensArgs>): Promise<GetPassagensAggregateType<T>>
}

/**
 * The delegate class that acts as a "Promise-like" for passagens.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in 
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export declare class Prisma__passagensClient<T> implements Promise<T> {
  private readonly _dmmf;
  private readonly _fetcher;
  private readonly _queryType;
  private readonly _rootField;
  private readonly _clientMethod;
  private readonly _args;
  private readonly _dataPath;
  private readonly _errorFormat;
  private readonly _measurePerformance?;
  private _isList;
  private _callsite;
  private _requestPromise?;
  constructor(_dmmf: DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
  readonly [Symbol.toStringTag]: 'PrismaClientPromise';

  dados<T extends dadosArgs = {}>(args?: Subset<T, dadosArgs>): CheckSelect<T, Prisma__dadosClient<dados | null>, Prisma__dadosClient<dadosGetPayload<T> | null>>;

  operadoras<T extends operadorasArgs = {}>(args?: Subset<T, operadorasArgs>): CheckSelect<T, Prisma__operadorasClient<operadoras | null>, Prisma__operadorasClient<operadorasGetPayload<T> | null>>;

  private get _document();
  /**
   * Attaches callbacks for the resolution and/or rejection of the Promise.
   * @param onfulfilled The callback to execute when the Promise is resolved.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of which ever callback is executed.
   */
  then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | Promise<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | Promise<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
  /**
   * Attaches a callback for only the rejection of the Promise.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of the callback.
   */
  catch<TResult = never>(onrejected?: ((reason: any) => TResult | Promise<TResult>) | undefined | null): Promise<T | TResult>;
  /**
   * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
   * resolved value cannot be modified from the callback.
   * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
   * @returns A Promise for the completion of the callback.
   */
  finally(onfinally?: (() => void) | undefined | null): Promise<T>;
}

// Custom InputTypes

/**
 * passagens findOne
 */
export type FindOnepassagensArgs = {
  /**
   * Select specific fields to fetch from the passagens
  **/
  select?: XOR<passagensSelect, null>
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: XOR<passagensInclude, null>
  /**
   * Filter, which passagens to fetch.
  **/
  where: passagensWhereUniqueInput
}


/**
 * passagens findFirst
 */
export type FindFirstpassagensArgs = {
  /**
   * Select specific fields to fetch from the passagens
  **/
  select?: XOR<passagensSelect, null>
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: XOR<passagensInclude, null>
  /**
   * Filter, which passagens to fetch.
  **/
  where?: passagensWhereInput
  orderBy?: XOR<Enumerable<passagensOrderByInput>, passagensOrderByInput>
  cursor?: passagensWhereUniqueInput
  take?: number
  skip?: number
  distinct?: Enumerable<PassagensDistinctFieldEnum>
}


/**
 * passagens findMany
 */
export type FindManypassagensArgs = {
  /**
   * Select specific fields to fetch from the passagens
  **/
  select?: XOR<passagensSelect, null>
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: XOR<passagensInclude, null>
  /**
   * Filter, which passagens to fetch.
  **/
  where?: passagensWhereInput
  /**
   * Determine the order of the passagens to fetch.
  **/
  orderBy?: XOR<Enumerable<passagensOrderByInput>, passagensOrderByInput>
  /**
   * Sets the position for listing passagens.
  **/
  cursor?: passagensWhereUniqueInput
  /**
   * The number of passagens to fetch. If negative number, it will take passagens before the `cursor`.
  **/
  take?: number
  /**
   * Skip the first `n` passagens.
  **/
  skip?: number
  distinct?: Enumerable<PassagensDistinctFieldEnum>
}


/**
 * passagens create
 */
export type passagensCreateArgs = {
  /**
   * Select specific fields to fetch from the passagens
  **/
  select?: XOR<passagensSelect, null>
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: XOR<passagensInclude, null>
  /**
   * The data needed to create a passagens.
  **/
  data: passagensCreateInput
}


/**
 * passagens update
 */
export type passagensUpdateArgs = {
  /**
   * Select specific fields to fetch from the passagens
  **/
  select?: XOR<passagensSelect, null>
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: XOR<passagensInclude, null>
  /**
   * The data needed to update a passagens.
  **/
  data: passagensUpdateInput
  /**
   * Choose, which passagens to update.
  **/
  where: passagensWhereUniqueInput
}


/**
 * passagens updateMany
 */
export type passagensUpdateManyArgs = {
  data: passagensUpdateManyMutationInput
  where?: passagensWhereInput
}


/**
 * passagens upsert
 */
export type passagensUpsertArgs = {
  /**
   * Select specific fields to fetch from the passagens
  **/
  select?: XOR<passagensSelect, null>
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: XOR<passagensInclude, null>
  /**
   * The filter to search for the passagens to update in case it exists.
  **/
  where: passagensWhereUniqueInput
  /**
   * In case the passagens found by the `where` argument doesn't exist, create a new passagens with this data.
  **/
  create: passagensCreateInput
  /**
   * In case the passagens was found with the provided `where` argument, update it with this data.
  **/
  update: passagensUpdateInput
}


/**
 * passagens delete
 */
export type passagensDeleteArgs = {
  /**
   * Select specific fields to fetch from the passagens
  **/
  select?: XOR<passagensSelect, null>
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: XOR<passagensInclude, null>
  /**
   * Filter which passagens to delete.
  **/
  where: passagensWhereUniqueInput
}


/**
 * passagens deleteMany
 */
export type passagensDeleteManyArgs = {
  where?: passagensWhereInput
}


/**
 * passagens without action
 */
export type passagensArgs = {
  /**
   * Select specific fields to fetch from the passagens
  **/
  select?: XOR<passagensSelect, null>
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: XOR<passagensInclude, null>
}



/**
 * Model usuarios
 */

export type usuarios = {
  Id: number
  CPF: string | null
  Nome: string | null
  Senha: string | null
  Email: string | null
}


export type AggregateUsuarios = {
  count: number
  avg: UsuariosAvgAggregateOutputType | null
  sum: UsuariosSumAggregateOutputType | null
  min: UsuariosMinAggregateOutputType | null
  max: UsuariosMaxAggregateOutputType | null
}

export type UsuariosAvgAggregateOutputType = {
  Id: number
}

export type UsuariosSumAggregateOutputType = {
  Id: number
}

export type UsuariosMinAggregateOutputType = {
  Id: number
}

export type UsuariosMaxAggregateOutputType = {
  Id: number
}


export type UsuariosAvgAggregateInputType = {
  Id?: true
}

export type UsuariosSumAggregateInputType = {
  Id?: true
}

export type UsuariosMinAggregateInputType = {
  Id?: true
}

export type UsuariosMaxAggregateInputType = {
  Id?: true
}

export type AggregateUsuariosArgs = {
  where?: usuariosWhereInput
  orderBy?: XOR<Enumerable<usuariosOrderByInput>, usuariosOrderByInput>
  cursor?: usuariosWhereUniqueInput
  take?: number
  skip?: number
  distinct?: Enumerable<UsuariosDistinctFieldEnum>
  count?: true
  avg?: UsuariosAvgAggregateInputType
  sum?: UsuariosSumAggregateInputType
  min?: UsuariosMinAggregateInputType
  max?: UsuariosMaxAggregateInputType
}

export type GetUsuariosAggregateType<T extends AggregateUsuariosArgs> = {
  [P in keyof T]: P extends 'count' ? number : GetUsuariosAggregateScalarType<T[P]>
}

export type GetUsuariosAggregateScalarType<T extends any> = {
  [P in keyof T]: P extends keyof UsuariosAvgAggregateOutputType ? UsuariosAvgAggregateOutputType[P] : never
}
    
    

export type usuariosSelect = {
  Id?: boolean
  CPF?: boolean
  Nome?: boolean
  Senha?: boolean
  Email?: boolean
}

export type usuariosGetPayload<
  S extends boolean | null | undefined | usuariosArgs,
  U = keyof S
> = S extends true
  ? usuarios
  : S extends undefined
  ? never
  : S extends usuariosArgs | FindManyusuariosArgs
  ? 'include' extends U
    ? usuarios 
  : 'select' extends U
    ? {
      [P in TrueKeys<S['select']>]:P extends keyof usuarios ? usuarios[P]
: 
 never
    }
  : usuarios
: usuarios


export interface usuariosDelegate {
  /**
   * Find zero or one Usuarios that matches the filter.
   * @param {FindOneusuariosArgs} args - Arguments to find a Usuarios
   * @example
   * // Get one Usuarios
   * const usuarios = await prisma.usuarios.findOne({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
  **/
  findOne<T extends FindOneusuariosArgs>(
    args: Subset<T, FindOneusuariosArgs>
  ): CheckSelect<T, Prisma__usuariosClient<usuarios | null>, Prisma__usuariosClient<usuariosGetPayload<T> | null>>
  /**
   * Find the first Usuarios that matches the filter.
   * @param {FindFirstusuariosArgs} args - Arguments to find a Usuarios
   * @example
   * // Get one Usuarios
   * const usuarios = await prisma.usuarios.findFirst({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
  **/
  findFirst<T extends FindFirstusuariosArgs>(
    args?: Subset<T, FindFirstusuariosArgs>
  ): CheckSelect<T, Prisma__usuariosClient<usuarios | null>, Prisma__usuariosClient<usuariosGetPayload<T> | null>>
  /**
   * Find zero or more Usuarios that matches the filter.
   * @param {FindManyusuariosArgs=} args - Arguments to filter and select certain fields only.
   * @example
   * // Get all Usuarios
   * const usuarios = await prisma.usuarios.findMany()
   * 
   * // Get first 10 Usuarios
   * const usuarios = await prisma.usuarios.findMany({ take: 10 })
   * 
   * // Only select the `Id`
   * const usuariosWithIdOnly = await prisma.usuarios.findMany({ select: { Id: true } })
   * 
  **/
  findMany<T extends FindManyusuariosArgs>(
    args?: Subset<T, FindManyusuariosArgs>
  ): CheckSelect<T, Promise<Array<usuarios>>, Promise<Array<usuariosGetPayload<T>>>>
  /**
   * Create a Usuarios.
   * @param {usuariosCreateArgs} args - Arguments to create a Usuarios.
   * @example
   * // Create one Usuarios
   * const Usuarios = await prisma.usuarios.create({
   *   data: {
   *     // ... data to create a Usuarios
   *   }
   * })
   * 
  **/
  create<T extends usuariosCreateArgs>(
    args: Subset<T, usuariosCreateArgs>
  ): CheckSelect<T, Prisma__usuariosClient<usuarios>, Prisma__usuariosClient<usuariosGetPayload<T>>>
  /**
   * Delete a Usuarios.
   * @param {usuariosDeleteArgs} args - Arguments to delete one Usuarios.
   * @example
   * // Delete one Usuarios
   * const Usuarios = await prisma.usuarios.delete({
   *   where: {
   *     // ... filter to delete one Usuarios
   *   }
   * })
   * 
  **/
  delete<T extends usuariosDeleteArgs>(
    args: Subset<T, usuariosDeleteArgs>
  ): CheckSelect<T, Prisma__usuariosClient<usuarios>, Prisma__usuariosClient<usuariosGetPayload<T>>>
  /**
   * Update one Usuarios.
   * @param {usuariosUpdateArgs} args - Arguments to update one Usuarios.
   * @example
   * // Update one Usuarios
   * const usuarios = await prisma.usuarios.update({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  update<T extends usuariosUpdateArgs>(
    args: Subset<T, usuariosUpdateArgs>
  ): CheckSelect<T, Prisma__usuariosClient<usuarios>, Prisma__usuariosClient<usuariosGetPayload<T>>>
  /**
   * Delete zero or more Usuarios.
   * @param {usuariosDeleteManyArgs} args - Arguments to filter Usuarios to delete.
   * @example
   * // Delete a few Usuarios
   * const { count } = await prisma.usuarios.deleteMany({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
   * 
  **/
  deleteMany<T extends usuariosDeleteManyArgs>(
    args: Subset<T, usuariosDeleteManyArgs>
  ): Promise<BatchPayload>
  /**
   * Update zero or more Usuarios.
   * @param {usuariosUpdateManyArgs} args - Arguments to update one or more rows.
   * @example
   * // Update many Usuarios
   * const usuarios = await prisma.usuarios.updateMany({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  updateMany<T extends usuariosUpdateManyArgs>(
    args: Subset<T, usuariosUpdateManyArgs>
  ): Promise<BatchPayload>
  /**
   * Create or update one Usuarios.
   * @param {usuariosUpsertArgs} args - Arguments to update or create a Usuarios.
   * @example
   * // Update or create a Usuarios
   * const usuarios = await prisma.usuarios.upsert({
   *   create: {
   *     // ... data to create a Usuarios
   *   },
   *   update: {
   *     // ... in case it already exists, update
   *   },
   *   where: {
   *     // ... the filter for the Usuarios we want to update
   *   }
   * })
  **/
  upsert<T extends usuariosUpsertArgs>(
    args: Subset<T, usuariosUpsertArgs>
  ): CheckSelect<T, Prisma__usuariosClient<usuarios>, Prisma__usuariosClient<usuariosGetPayload<T>>>
  /**
   * Count
   */
  count(args?: Omit<FindManyusuariosArgs, 'select' | 'include'>): Promise<number>

  /**
   * Aggregate
   */
  aggregate<T extends AggregateUsuariosArgs>(args: Subset<T, AggregateUsuariosArgs>): Promise<GetUsuariosAggregateType<T>>
}

/**
 * The delegate class that acts as a "Promise-like" for usuarios.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in 
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export declare class Prisma__usuariosClient<T> implements Promise<T> {
  private readonly _dmmf;
  private readonly _fetcher;
  private readonly _queryType;
  private readonly _rootField;
  private readonly _clientMethod;
  private readonly _args;
  private readonly _dataPath;
  private readonly _errorFormat;
  private readonly _measurePerformance?;
  private _isList;
  private _callsite;
  private _requestPromise?;
  constructor(_dmmf: DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
  readonly [Symbol.toStringTag]: 'PrismaClientPromise';


  private get _document();
  /**
   * Attaches callbacks for the resolution and/or rejection of the Promise.
   * @param onfulfilled The callback to execute when the Promise is resolved.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of which ever callback is executed.
   */
  then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | Promise<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | Promise<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
  /**
   * Attaches a callback for only the rejection of the Promise.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of the callback.
   */
  catch<TResult = never>(onrejected?: ((reason: any) => TResult | Promise<TResult>) | undefined | null): Promise<T | TResult>;
  /**
   * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
   * resolved value cannot be modified from the callback.
   * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
   * @returns A Promise for the completion of the callback.
   */
  finally(onfinally?: (() => void) | undefined | null): Promise<T>;
}

// Custom InputTypes

/**
 * usuarios findOne
 */
export type FindOneusuariosArgs = {
  /**
   * Select specific fields to fetch from the usuarios
  **/
  select?: XOR<usuariosSelect, null>
  /**
   * Filter, which usuarios to fetch.
  **/
  where: usuariosWhereUniqueInput
}


/**
 * usuarios findFirst
 */
export type FindFirstusuariosArgs = {
  /**
   * Select specific fields to fetch from the usuarios
  **/
  select?: XOR<usuariosSelect, null>
  /**
   * Filter, which usuarios to fetch.
  **/
  where?: usuariosWhereInput
  orderBy?: XOR<Enumerable<usuariosOrderByInput>, usuariosOrderByInput>
  cursor?: usuariosWhereUniqueInput
  take?: number
  skip?: number
  distinct?: Enumerable<UsuariosDistinctFieldEnum>
}


/**
 * usuarios findMany
 */
export type FindManyusuariosArgs = {
  /**
   * Select specific fields to fetch from the usuarios
  **/
  select?: XOR<usuariosSelect, null>
  /**
   * Filter, which usuarios to fetch.
  **/
  where?: usuariosWhereInput
  /**
   * Determine the order of the usuarios to fetch.
  **/
  orderBy?: XOR<Enumerable<usuariosOrderByInput>, usuariosOrderByInput>
  /**
   * Sets the position for listing usuarios.
  **/
  cursor?: usuariosWhereUniqueInput
  /**
   * The number of usuarios to fetch. If negative number, it will take usuarios before the `cursor`.
  **/
  take?: number
  /**
   * Skip the first `n` usuarios.
  **/
  skip?: number
  distinct?: Enumerable<UsuariosDistinctFieldEnum>
}


/**
 * usuarios create
 */
export type usuariosCreateArgs = {
  /**
   * Select specific fields to fetch from the usuarios
  **/
  select?: XOR<usuariosSelect, null>
  /**
   * The data needed to create a usuarios.
  **/
  data: usuariosCreateInput
}


/**
 * usuarios update
 */
export type usuariosUpdateArgs = {
  /**
   * Select specific fields to fetch from the usuarios
  **/
  select?: XOR<usuariosSelect, null>
  /**
   * The data needed to update a usuarios.
  **/
  data: usuariosUpdateInput
  /**
   * Choose, which usuarios to update.
  **/
  where: usuariosWhereUniqueInput
}


/**
 * usuarios updateMany
 */
export type usuariosUpdateManyArgs = {
  data: usuariosUpdateManyMutationInput
  where?: usuariosWhereInput
}


/**
 * usuarios upsert
 */
export type usuariosUpsertArgs = {
  /**
   * Select specific fields to fetch from the usuarios
  **/
  select?: XOR<usuariosSelect, null>
  /**
   * The filter to search for the usuarios to update in case it exists.
  **/
  where: usuariosWhereUniqueInput
  /**
   * In case the usuarios found by the `where` argument doesn't exist, create a new usuarios with this data.
  **/
  create: usuariosCreateInput
  /**
   * In case the usuarios was found with the provided `where` argument, update it with this data.
  **/
  update: usuariosUpdateInput
}


/**
 * usuarios delete
 */
export type usuariosDeleteArgs = {
  /**
   * Select specific fields to fetch from the usuarios
  **/
  select?: XOR<usuariosSelect, null>
  /**
   * Filter which usuarios to delete.
  **/
  where: usuariosWhereUniqueInput
}


/**
 * usuarios deleteMany
 */
export type usuariosDeleteManyArgs = {
  where?: usuariosWhereInput
}


/**
 * usuarios without action
 */
export type usuariosArgs = {
  /**
   * Select specific fields to fetch from the usuarios
  **/
  select?: XOR<usuariosSelect, null>
}



/**
 * Deep Input Types
 */


export type centrodecustosWhereInput = {
  AND?: XOR<centrodecustosWhereInput, Enumerable<centrodecustosWhereInput>>
  OR?: XOR<centrodecustosWhereInput, Enumerable<centrodecustosWhereInput>>
  NOT?: XOR<centrodecustosWhereInput, Enumerable<centrodecustosWhereInput>>
  Id?: XOR<IntFilter, number>
  NmCentroDeCusto?: StringNullableFilter | string | null
  IdEmpresa?: IntNullableFilter | number | null
  Situacao?: StringNullableFilter | string | null
  empresas?: EmpresasRelationFilter | empresasWhereInput | null
}

export type centrodecustosOrderByInput = {
  Id?: SortOrder
  NmCentroDeCusto?: SortOrder
  IdEmpresa?: SortOrder
  Situacao?: SortOrder
}

export type centrodecustosWhereUniqueInput = {
  Id?: number
}

export type dadosWhereInput = {
  AND?: XOR<dadosWhereInput, Enumerable<dadosWhereInput>>
  OR?: XOR<dadosWhereInput, Enumerable<dadosWhereInput>>
  NOT?: XOR<dadosWhereInput, Enumerable<dadosWhereInput>>
  Id?: XOR<IntFilter, number>
  NmColaborador?: StringNullableFilter | string | null
  CPF?: StringNullableFilter | string | null
  IdEmpresa?: IntNullableFilter | number | null
  DtNascimento?: StringNullableFilter | string | null
  IdCentroDeCusto?: StringNullableFilter | string | null
  Matricula?: StringNullableFilter | string | null
  Escala?: StringNullableFilter | string | null
  Situacao?: StringNullableFilter | string | null
  empresas?: EmpresasRelationFilter | empresasWhereInput | null
  passagens?: PassagensListRelationFilter
}

export type dadosOrderByInput = {
  Id?: SortOrder
  NmColaborador?: SortOrder
  CPF?: SortOrder
  IdEmpresa?: SortOrder
  DtNascimento?: SortOrder
  IdCentroDeCusto?: SortOrder
  Matricula?: SortOrder
  Escala?: SortOrder
  Situacao?: SortOrder
}

export type dadosWhereUniqueInput = {
  Id?: number
  CPF?: string
}

export type empresasWhereInput = {
  AND?: XOR<empresasWhereInput, Enumerable<empresasWhereInput>>
  OR?: XOR<empresasWhereInput, Enumerable<empresasWhereInput>>
  NOT?: XOR<empresasWhereInput, Enumerable<empresasWhereInput>>
  Id?: XOR<IntFilter, number>
  CNPJ?: StringNullableFilter | string | null
  NmEmpresa?: StringNullableFilter | string | null
  NmFantasia?: StringNullableFilter | string | null
  Endereco?: StringNullableFilter | string | null
  CEP?: StringNullableFilter | string | null
  Situacao?: StringNullableFilter | string | null
  Tipo?: StringNullableFilter | string | null
  centrodecustos?: CentrodecustosListRelationFilter
  dados?: DadosListRelationFilter
  operadoras?: OperadorasListRelationFilter
}

export type empresasOrderByInput = {
  Id?: SortOrder
  CNPJ?: SortOrder
  NmEmpresa?: SortOrder
  NmFantasia?: SortOrder
  Endereco?: SortOrder
  CEP?: SortOrder
  Situacao?: SortOrder
  Tipo?: SortOrder
}

export type empresasWhereUniqueInput = {
  Id?: number
  CNPJ?: string
}

export type operadorasWhereInput = {
  AND?: XOR<operadorasWhereInput, Enumerable<operadorasWhereInput>>
  OR?: XOR<operadorasWhereInput, Enumerable<operadorasWhereInput>>
  NOT?: XOR<operadorasWhereInput, Enumerable<operadorasWhereInput>>
  Id?: XOR<IntFilter, number>
  NmOperadora?: StringNullableFilter | string | null
  IdEmpresa?: IntNullableFilter | number | null
  UF?: StringNullableFilter | string | null
  empresas?: EmpresasRelationFilter | empresasWhereInput | null
  passagens?: PassagensListRelationFilter
}

export type operadorasOrderByInput = {
  Id?: SortOrder
  NmOperadora?: SortOrder
  IdEmpresa?: SortOrder
  UF?: SortOrder
}

export type operadorasWhereUniqueInput = {
  Id?: number
}

export type passagensWhereInput = {
  AND?: XOR<passagensWhereInput, Enumerable<passagensWhereInput>>
  OR?: XOR<passagensWhereInput, Enumerable<passagensWhereInput>>
  NOT?: XOR<passagensWhereInput, Enumerable<passagensWhereInput>>
  Id?: XOR<IntFilter, number>
  CPFUsuario?: StringNullableFilter | string | null
  NrCartao?: StringNullableFilter | string | null
  Valor?: FloatNullableFilter | number | null
  IdOperadora?: IntNullableFilter | number | null
  QtdDia?: IntNullableFilter | number | null
  dados?: DadosRelationFilter | dadosWhereInput | null
  operadoras?: OperadorasRelationFilter | operadorasWhereInput | null
}

export type passagensOrderByInput = {
  Id?: SortOrder
  CPFUsuario?: SortOrder
  NrCartao?: SortOrder
  Valor?: SortOrder
  IdOperadora?: SortOrder
  QtdDia?: SortOrder
}

export type passagensWhereUniqueInput = {
  Id?: number
}

export type usuariosWhereInput = {
  AND?: XOR<usuariosWhereInput, Enumerable<usuariosWhereInput>>
  OR?: XOR<usuariosWhereInput, Enumerable<usuariosWhereInput>>
  NOT?: XOR<usuariosWhereInput, Enumerable<usuariosWhereInput>>
  Id?: XOR<IntFilter, number>
  CPF?: StringNullableFilter | string | null
  Nome?: StringNullableFilter | string | null
  Senha?: StringNullableFilter | string | null
  Email?: StringNullableFilter | string | null
}

export type usuariosOrderByInput = {
  Id?: SortOrder
  CPF?: SortOrder
  Nome?: SortOrder
  Senha?: SortOrder
  Email?: SortOrder
}

export type usuariosWhereUniqueInput = {
  Id?: number
}

export type centrodecustosCreateInput = {
  NmCentroDeCusto?: XOR<string, null>
  Situacao?: XOR<string, null>
  empresas?: empresasCreateOneWithoutCentrodecustosInput
}

export type centrodecustosUpdateInput = {
  NmCentroDeCusto?: string | NullableStringFieldUpdateOperationsInput | null
  Situacao?: string | NullableStringFieldUpdateOperationsInput | null
  empresas?: empresasUpdateOneWithoutCentrodecustosInput
}

export type centrodecustosUpdateManyMutationInput = {
  NmCentroDeCusto?: string | NullableStringFieldUpdateOperationsInput | null
  Situacao?: string | NullableStringFieldUpdateOperationsInput | null
}

export type dadosCreateInput = {
  NmColaborador?: XOR<string, null>
  CPF?: XOR<string, null>
  DtNascimento?: XOR<string, null>
  IdCentroDeCusto?: XOR<string, null>
  Matricula?: XOR<string, null>
  Escala?: XOR<string, null>
  Situacao?: XOR<string, null>
  empresas?: empresasCreateOneWithoutDadosInput
  passagens?: passagensCreateManyWithoutDadosInput
}

export type dadosUpdateInput = {
  NmColaborador?: string | NullableStringFieldUpdateOperationsInput | null
  CPF?: string | NullableStringFieldUpdateOperationsInput | null
  DtNascimento?: string | NullableStringFieldUpdateOperationsInput | null
  IdCentroDeCusto?: string | NullableStringFieldUpdateOperationsInput | null
  Matricula?: string | NullableStringFieldUpdateOperationsInput | null
  Escala?: string | NullableStringFieldUpdateOperationsInput | null
  Situacao?: string | NullableStringFieldUpdateOperationsInput | null
  empresas?: empresasUpdateOneWithoutDadosInput
  passagens?: passagensUpdateManyWithoutDadosInput
}

export type dadosUpdateManyMutationInput = {
  NmColaborador?: string | NullableStringFieldUpdateOperationsInput | null
  CPF?: string | NullableStringFieldUpdateOperationsInput | null
  DtNascimento?: string | NullableStringFieldUpdateOperationsInput | null
  IdCentroDeCusto?: string | NullableStringFieldUpdateOperationsInput | null
  Matricula?: string | NullableStringFieldUpdateOperationsInput | null
  Escala?: string | NullableStringFieldUpdateOperationsInput | null
  Situacao?: string | NullableStringFieldUpdateOperationsInput | null
}

export type empresasCreateInput = {
  CNPJ?: XOR<string, null>
  NmEmpresa?: XOR<string, null>
  NmFantasia?: XOR<string, null>
  Endereco?: XOR<string, null>
  CEP?: XOR<string, null>
  Situacao?: XOR<string, null>
  Tipo?: XOR<string, null>
  centrodecustos?: centrodecustosCreateManyWithoutEmpresasInput
  dados?: dadosCreateManyWithoutEmpresasInput
  operadoras?: operadorasCreateManyWithoutEmpresasInput
}

export type empresasUpdateInput = {
  CNPJ?: string | NullableStringFieldUpdateOperationsInput | null
  NmEmpresa?: string | NullableStringFieldUpdateOperationsInput | null
  NmFantasia?: string | NullableStringFieldUpdateOperationsInput | null
  Endereco?: string | NullableStringFieldUpdateOperationsInput | null
  CEP?: string | NullableStringFieldUpdateOperationsInput | null
  Situacao?: string | NullableStringFieldUpdateOperationsInput | null
  Tipo?: string | NullableStringFieldUpdateOperationsInput | null
  centrodecustos?: centrodecustosUpdateManyWithoutEmpresasInput
  dados?: dadosUpdateManyWithoutEmpresasInput
  operadoras?: operadorasUpdateManyWithoutEmpresasInput
}

export type empresasUpdateManyMutationInput = {
  CNPJ?: string | NullableStringFieldUpdateOperationsInput | null
  NmEmpresa?: string | NullableStringFieldUpdateOperationsInput | null
  NmFantasia?: string | NullableStringFieldUpdateOperationsInput | null
  Endereco?: string | NullableStringFieldUpdateOperationsInput | null
  CEP?: string | NullableStringFieldUpdateOperationsInput | null
  Situacao?: string | NullableStringFieldUpdateOperationsInput | null
  Tipo?: string | NullableStringFieldUpdateOperationsInput | null
}

export type operadorasCreateInput = {
  NmOperadora?: XOR<string, null>
  UF?: XOR<string, null>
  empresas?: empresasCreateOneWithoutOperadorasInput
  passagens?: passagensCreateManyWithoutOperadorasInput
}

export type operadorasUpdateInput = {
  NmOperadora?: string | NullableStringFieldUpdateOperationsInput | null
  UF?: string | NullableStringFieldUpdateOperationsInput | null
  empresas?: empresasUpdateOneWithoutOperadorasInput
  passagens?: passagensUpdateManyWithoutOperadorasInput
}

export type operadorasUpdateManyMutationInput = {
  NmOperadora?: string | NullableStringFieldUpdateOperationsInput | null
  UF?: string | NullableStringFieldUpdateOperationsInput | null
}

export type passagensCreateInput = {
  NrCartao?: XOR<string, null>
  Valor?: XOR<number, null>
  QtdDia?: XOR<number, null>
  dados?: dadosCreateOneWithoutPassagensInput
  operadoras?: operadorasCreateOneWithoutPassagensInput
}

export type passagensUpdateInput = {
  NrCartao?: string | NullableStringFieldUpdateOperationsInput | null
  Valor?: number | NullableFloatFieldUpdateOperationsInput | null
  QtdDia?: number | NullableIntFieldUpdateOperationsInput | null
  dados?: dadosUpdateOneWithoutPassagensInput
  operadoras?: operadorasUpdateOneWithoutPassagensInput
}

export type passagensUpdateManyMutationInput = {
  NrCartao?: string | NullableStringFieldUpdateOperationsInput | null
  Valor?: number | NullableFloatFieldUpdateOperationsInput | null
  QtdDia?: number | NullableIntFieldUpdateOperationsInput | null
}

export type usuariosCreateInput = {
  CPF?: XOR<string, null>
  Nome?: XOR<string, null>
  Senha?: XOR<string, null>
  Email?: XOR<string, null>
}

export type usuariosUpdateInput = {
  CPF?: string | NullableStringFieldUpdateOperationsInput | null
  Nome?: string | NullableStringFieldUpdateOperationsInput | null
  Senha?: string | NullableStringFieldUpdateOperationsInput | null
  Email?: string | NullableStringFieldUpdateOperationsInput | null
}

export type usuariosUpdateManyMutationInput = {
  CPF?: string | NullableStringFieldUpdateOperationsInput | null
  Nome?: string | NullableStringFieldUpdateOperationsInput | null
  Senha?: string | NullableStringFieldUpdateOperationsInput | null
  Email?: string | NullableStringFieldUpdateOperationsInput | null
}

export type IntFilter = {
  equals?: number
  in?: Enumerable<number>
  notIn?: Enumerable<number>
  lt?: number
  lte?: number
  gt?: number
  gte?: number
  not?: XOR<number, NestedIntFilter>
}

export type StringNullableFilter = {
  equals?: XOR<string, null>
  in?: XOR<Enumerable<string>, null>
  notIn?: XOR<Enumerable<string>, null>
  lt?: string
  lte?: string
  gt?: string
  gte?: string
  contains?: string
  startsWith?: string
  endsWith?: string
  not?: string | NestedStringNullableFilter | null
}

export type IntNullableFilter = {
  equals?: XOR<number, null>
  in?: XOR<Enumerable<number>, null>
  notIn?: XOR<Enumerable<number>, null>
  lt?: number
  lte?: number
  gt?: number
  gte?: number
  not?: number | NestedIntNullableFilter | null
}

export type EmpresasRelationFilter = {
  is?: XOR<empresasWhereInput, null>
  isNot?: XOR<empresasWhereInput, null>
}

export type PassagensListRelationFilter = {
  every?: passagensWhereInput
  some?: passagensWhereInput
  none?: passagensWhereInput
}

export type CentrodecustosListRelationFilter = {
  every?: centrodecustosWhereInput
  some?: centrodecustosWhereInput
  none?: centrodecustosWhereInput
}

export type DadosListRelationFilter = {
  every?: dadosWhereInput
  some?: dadosWhereInput
  none?: dadosWhereInput
}

export type OperadorasListRelationFilter = {
  every?: operadorasWhereInput
  some?: operadorasWhereInput
  none?: operadorasWhereInput
}

export type FloatNullableFilter = {
  equals?: XOR<number, null>
  in?: XOR<Enumerable<number>, null>
  notIn?: XOR<Enumerable<number>, null>
  lt?: number
  lte?: number
  gt?: number
  gte?: number
  not?: number | NestedFloatNullableFilter | null
}

export type DadosRelationFilter = {
  is?: XOR<dadosWhereInput, null>
  isNot?: XOR<dadosWhereInput, null>
}

export type OperadorasRelationFilter = {
  is?: XOR<operadorasWhereInput, null>
  isNot?: XOR<operadorasWhereInput, null>
}

export type empresasCreateOneWithoutCentrodecustosInput = {
  create?: empresasCreateWithoutCentrodecustosInput
  connect?: empresasWhereUniqueInput
  connectOrCreate?: empresasCreateOrConnectWithoutcentrodecustosInput
}

export type NullableStringFieldUpdateOperationsInput = {
  set?: XOR<string, null>
}

export type empresasUpdateOneWithoutCentrodecustosInput = {
  create?: empresasCreateWithoutCentrodecustosInput
  connect?: empresasWhereUniqueInput
  disconnect?: boolean
  delete?: boolean
  update?: empresasUpdateWithoutCentrodecustosInput
  upsert?: empresasUpsertWithoutCentrodecustosInput
  connectOrCreate?: empresasCreateOrConnectWithoutcentrodecustosInput
}

export type empresasCreateOneWithoutDadosInput = {
  create?: empresasCreateWithoutDadosInput
  connect?: empresasWhereUniqueInput
  connectOrCreate?: empresasCreateOrConnectWithoutdadosInput
}

export type passagensCreateManyWithoutDadosInput = {
  create?: XOR<passagensCreateWithoutDadosInput, Enumerable<passagensCreateWithoutDadosInput>>
  connect?: XOR<passagensWhereUniqueInput, Enumerable<passagensWhereUniqueInput>>
  connectOrCreate?: XOR<passagensCreateOrConnectWithoutdadosInput, Enumerable<passagensCreateOrConnectWithoutdadosInput>>
}

export type empresasUpdateOneWithoutDadosInput = {
  create?: empresasCreateWithoutDadosInput
  connect?: empresasWhereUniqueInput
  disconnect?: boolean
  delete?: boolean
  update?: empresasUpdateWithoutDadosInput
  upsert?: empresasUpsertWithoutDadosInput
  connectOrCreate?: empresasCreateOrConnectWithoutdadosInput
}

export type passagensUpdateManyWithoutDadosInput = {
  create?: XOR<passagensCreateWithoutDadosInput, Enumerable<passagensCreateWithoutDadosInput>>
  connect?: XOR<passagensWhereUniqueInput, Enumerable<passagensWhereUniqueInput>>
  set?: XOR<passagensWhereUniqueInput, Enumerable<passagensWhereUniqueInput>>
  disconnect?: XOR<passagensWhereUniqueInput, Enumerable<passagensWhereUniqueInput>>
  delete?: XOR<passagensWhereUniqueInput, Enumerable<passagensWhereUniqueInput>>
  update?: XOR<passagensUpdateWithWhereUniqueWithoutDadosInput, Enumerable<passagensUpdateWithWhereUniqueWithoutDadosInput>>
  updateMany?: XOR<passagensUpdateManyWithWhereWithoutDadosInput, Enumerable<passagensUpdateManyWithWhereWithoutDadosInput>>
  deleteMany?: XOR<passagensScalarWhereInput, Enumerable<passagensScalarWhereInput>>
  upsert?: XOR<passagensUpsertWithWhereUniqueWithoutDadosInput, Enumerable<passagensUpsertWithWhereUniqueWithoutDadosInput>>
  connectOrCreate?: XOR<passagensCreateOrConnectWithoutdadosInput, Enumerable<passagensCreateOrConnectWithoutdadosInput>>
}

export type centrodecustosCreateManyWithoutEmpresasInput = {
  create?: XOR<centrodecustosCreateWithoutEmpresasInput, Enumerable<centrodecustosCreateWithoutEmpresasInput>>
  connect?: XOR<centrodecustosWhereUniqueInput, Enumerable<centrodecustosWhereUniqueInput>>
  connectOrCreate?: XOR<centrodecustosCreateOrConnectWithoutempresasInput, Enumerable<centrodecustosCreateOrConnectWithoutempresasInput>>
}

export type dadosCreateManyWithoutEmpresasInput = {
  create?: XOR<dadosCreateWithoutEmpresasInput, Enumerable<dadosCreateWithoutEmpresasInput>>
  connect?: XOR<dadosWhereUniqueInput, Enumerable<dadosWhereUniqueInput>>
  connectOrCreate?: XOR<dadosCreateOrConnectWithoutempresasInput, Enumerable<dadosCreateOrConnectWithoutempresasInput>>
}

export type operadorasCreateManyWithoutEmpresasInput = {
  create?: XOR<operadorasCreateWithoutEmpresasInput, Enumerable<operadorasCreateWithoutEmpresasInput>>
  connect?: XOR<operadorasWhereUniqueInput, Enumerable<operadorasWhereUniqueInput>>
  connectOrCreate?: XOR<operadorasCreateOrConnectWithoutempresasInput, Enumerable<operadorasCreateOrConnectWithoutempresasInput>>
}

export type centrodecustosUpdateManyWithoutEmpresasInput = {
  create?: XOR<centrodecustosCreateWithoutEmpresasInput, Enumerable<centrodecustosCreateWithoutEmpresasInput>>
  connect?: XOR<centrodecustosWhereUniqueInput, Enumerable<centrodecustosWhereUniqueInput>>
  set?: XOR<centrodecustosWhereUniqueInput, Enumerable<centrodecustosWhereUniqueInput>>
  disconnect?: XOR<centrodecustosWhereUniqueInput, Enumerable<centrodecustosWhereUniqueInput>>
  delete?: XOR<centrodecustosWhereUniqueInput, Enumerable<centrodecustosWhereUniqueInput>>
  update?: XOR<centrodecustosUpdateWithWhereUniqueWithoutEmpresasInput, Enumerable<centrodecustosUpdateWithWhereUniqueWithoutEmpresasInput>>
  updateMany?: XOR<centrodecustosUpdateManyWithWhereWithoutEmpresasInput, Enumerable<centrodecustosUpdateManyWithWhereWithoutEmpresasInput>>
  deleteMany?: XOR<centrodecustosScalarWhereInput, Enumerable<centrodecustosScalarWhereInput>>
  upsert?: XOR<centrodecustosUpsertWithWhereUniqueWithoutEmpresasInput, Enumerable<centrodecustosUpsertWithWhereUniqueWithoutEmpresasInput>>
  connectOrCreate?: XOR<centrodecustosCreateOrConnectWithoutempresasInput, Enumerable<centrodecustosCreateOrConnectWithoutempresasInput>>
}

export type dadosUpdateManyWithoutEmpresasInput = {
  create?: XOR<dadosCreateWithoutEmpresasInput, Enumerable<dadosCreateWithoutEmpresasInput>>
  connect?: XOR<dadosWhereUniqueInput, Enumerable<dadosWhereUniqueInput>>
  set?: XOR<dadosWhereUniqueInput, Enumerable<dadosWhereUniqueInput>>
  disconnect?: XOR<dadosWhereUniqueInput, Enumerable<dadosWhereUniqueInput>>
  delete?: XOR<dadosWhereUniqueInput, Enumerable<dadosWhereUniqueInput>>
  update?: XOR<dadosUpdateWithWhereUniqueWithoutEmpresasInput, Enumerable<dadosUpdateWithWhereUniqueWithoutEmpresasInput>>
  updateMany?: XOR<dadosUpdateManyWithWhereWithoutEmpresasInput, Enumerable<dadosUpdateManyWithWhereWithoutEmpresasInput>>
  deleteMany?: XOR<dadosScalarWhereInput, Enumerable<dadosScalarWhereInput>>
  upsert?: XOR<dadosUpsertWithWhereUniqueWithoutEmpresasInput, Enumerable<dadosUpsertWithWhereUniqueWithoutEmpresasInput>>
  connectOrCreate?: XOR<dadosCreateOrConnectWithoutempresasInput, Enumerable<dadosCreateOrConnectWithoutempresasInput>>
}

export type operadorasUpdateManyWithoutEmpresasInput = {
  create?: XOR<operadorasCreateWithoutEmpresasInput, Enumerable<operadorasCreateWithoutEmpresasInput>>
  connect?: XOR<operadorasWhereUniqueInput, Enumerable<operadorasWhereUniqueInput>>
  set?: XOR<operadorasWhereUniqueInput, Enumerable<operadorasWhereUniqueInput>>
  disconnect?: XOR<operadorasWhereUniqueInput, Enumerable<operadorasWhereUniqueInput>>
  delete?: XOR<operadorasWhereUniqueInput, Enumerable<operadorasWhereUniqueInput>>
  update?: XOR<operadorasUpdateWithWhereUniqueWithoutEmpresasInput, Enumerable<operadorasUpdateWithWhereUniqueWithoutEmpresasInput>>
  updateMany?: XOR<operadorasUpdateManyWithWhereWithoutEmpresasInput, Enumerable<operadorasUpdateManyWithWhereWithoutEmpresasInput>>
  deleteMany?: XOR<operadorasScalarWhereInput, Enumerable<operadorasScalarWhereInput>>
  upsert?: XOR<operadorasUpsertWithWhereUniqueWithoutEmpresasInput, Enumerable<operadorasUpsertWithWhereUniqueWithoutEmpresasInput>>
  connectOrCreate?: XOR<operadorasCreateOrConnectWithoutempresasInput, Enumerable<operadorasCreateOrConnectWithoutempresasInput>>
}

export type empresasCreateOneWithoutOperadorasInput = {
  create?: empresasCreateWithoutOperadorasInput
  connect?: empresasWhereUniqueInput
  connectOrCreate?: empresasCreateOrConnectWithoutoperadorasInput
}

export type passagensCreateManyWithoutOperadorasInput = {
  create?: XOR<passagensCreateWithoutOperadorasInput, Enumerable<passagensCreateWithoutOperadorasInput>>
  connect?: XOR<passagensWhereUniqueInput, Enumerable<passagensWhereUniqueInput>>
  connectOrCreate?: XOR<passagensCreateOrConnectWithoutoperadorasInput, Enumerable<passagensCreateOrConnectWithoutoperadorasInput>>
}

export type empresasUpdateOneWithoutOperadorasInput = {
  create?: empresasCreateWithoutOperadorasInput
  connect?: empresasWhereUniqueInput
  disconnect?: boolean
  delete?: boolean
  update?: empresasUpdateWithoutOperadorasInput
  upsert?: empresasUpsertWithoutOperadorasInput
  connectOrCreate?: empresasCreateOrConnectWithoutoperadorasInput
}

export type passagensUpdateManyWithoutOperadorasInput = {
  create?: XOR<passagensCreateWithoutOperadorasInput, Enumerable<passagensCreateWithoutOperadorasInput>>
  connect?: XOR<passagensWhereUniqueInput, Enumerable<passagensWhereUniqueInput>>
  set?: XOR<passagensWhereUniqueInput, Enumerable<passagensWhereUniqueInput>>
  disconnect?: XOR<passagensWhereUniqueInput, Enumerable<passagensWhereUniqueInput>>
  delete?: XOR<passagensWhereUniqueInput, Enumerable<passagensWhereUniqueInput>>
  update?: XOR<passagensUpdateWithWhereUniqueWithoutOperadorasInput, Enumerable<passagensUpdateWithWhereUniqueWithoutOperadorasInput>>
  updateMany?: XOR<passagensUpdateManyWithWhereWithoutOperadorasInput, Enumerable<passagensUpdateManyWithWhereWithoutOperadorasInput>>
  deleteMany?: XOR<passagensScalarWhereInput, Enumerable<passagensScalarWhereInput>>
  upsert?: XOR<passagensUpsertWithWhereUniqueWithoutOperadorasInput, Enumerable<passagensUpsertWithWhereUniqueWithoutOperadorasInput>>
  connectOrCreate?: XOR<passagensCreateOrConnectWithoutoperadorasInput, Enumerable<passagensCreateOrConnectWithoutoperadorasInput>>
}

export type dadosCreateOneWithoutPassagensInput = {
  create?: dadosCreateWithoutPassagensInput
  connect?: dadosWhereUniqueInput
  connectOrCreate?: dadosCreateOrConnectWithoutpassagensInput
}

export type operadorasCreateOneWithoutPassagensInput = {
  create?: operadorasCreateWithoutPassagensInput
  connect?: operadorasWhereUniqueInput
  connectOrCreate?: operadorasCreateOrConnectWithoutpassagensInput
}

export type NullableFloatFieldUpdateOperationsInput = {
  set?: XOR<number, null>
  increment?: number
  decrement?: number
  multiply?: number
  divide?: number
}

export type NullableIntFieldUpdateOperationsInput = {
  set?: XOR<number, null>
  increment?: number
  decrement?: number
  multiply?: number
  divide?: number
}

export type dadosUpdateOneWithoutPassagensInput = {
  create?: dadosCreateWithoutPassagensInput
  connect?: dadosWhereUniqueInput
  disconnect?: boolean
  delete?: boolean
  update?: dadosUpdateWithoutPassagensInput
  upsert?: dadosUpsertWithoutPassagensInput
  connectOrCreate?: dadosCreateOrConnectWithoutpassagensInput
}

export type operadorasUpdateOneWithoutPassagensInput = {
  create?: operadorasCreateWithoutPassagensInput
  connect?: operadorasWhereUniqueInput
  disconnect?: boolean
  delete?: boolean
  update?: operadorasUpdateWithoutPassagensInput
  upsert?: operadorasUpsertWithoutPassagensInput
  connectOrCreate?: operadorasCreateOrConnectWithoutpassagensInput
}

export type NestedIntFilter = {
  equals?: number
  in?: Enumerable<number>
  notIn?: Enumerable<number>
  lt?: number
  lte?: number
  gt?: number
  gte?: number
  not?: XOR<number, NestedIntFilter>
}

export type NestedStringNullableFilter = {
  equals?: XOR<string, null>
  in?: XOR<Enumerable<string>, null>
  notIn?: XOR<Enumerable<string>, null>
  lt?: string
  lte?: string
  gt?: string
  gte?: string
  contains?: string
  startsWith?: string
  endsWith?: string
  not?: string | NestedStringNullableFilter | null
}

export type NestedIntNullableFilter = {
  equals?: XOR<number, null>
  in?: XOR<Enumerable<number>, null>
  notIn?: XOR<Enumerable<number>, null>
  lt?: number
  lte?: number
  gt?: number
  gte?: number
  not?: number | NestedIntNullableFilter | null
}

export type NestedFloatNullableFilter = {
  equals?: XOR<number, null>
  in?: XOR<Enumerable<number>, null>
  notIn?: XOR<Enumerable<number>, null>
  lt?: number
  lte?: number
  gt?: number
  gte?: number
  not?: number | NestedFloatNullableFilter | null
}

export type empresasCreateWithoutCentrodecustosInput = {
  CNPJ?: XOR<string, null>
  NmEmpresa?: XOR<string, null>
  NmFantasia?: XOR<string, null>
  Endereco?: XOR<string, null>
  CEP?: XOR<string, null>
  Situacao?: XOR<string, null>
  Tipo?: XOR<string, null>
  dados?: dadosCreateManyWithoutEmpresasInput
  operadoras?: operadorasCreateManyWithoutEmpresasInput
}

export type empresasCreateOrConnectWithoutcentrodecustosInput = {
  where: empresasWhereUniqueInput
  create: empresasCreateWithoutCentrodecustosInput
}

export type empresasUpdateWithoutCentrodecustosInput = {
  CNPJ?: string | NullableStringFieldUpdateOperationsInput | null
  NmEmpresa?: string | NullableStringFieldUpdateOperationsInput | null
  NmFantasia?: string | NullableStringFieldUpdateOperationsInput | null
  Endereco?: string | NullableStringFieldUpdateOperationsInput | null
  CEP?: string | NullableStringFieldUpdateOperationsInput | null
  Situacao?: string | NullableStringFieldUpdateOperationsInput | null
  Tipo?: string | NullableStringFieldUpdateOperationsInput | null
  dados?: dadosUpdateManyWithoutEmpresasInput
  operadoras?: operadorasUpdateManyWithoutEmpresasInput
}

export type empresasUpsertWithoutCentrodecustosInput = {
  update: empresasUpdateWithoutCentrodecustosInput
  create: empresasCreateWithoutCentrodecustosInput
}

export type empresasCreateWithoutDadosInput = {
  CNPJ?: XOR<string, null>
  NmEmpresa?: XOR<string, null>
  NmFantasia?: XOR<string, null>
  Endereco?: XOR<string, null>
  CEP?: XOR<string, null>
  Situacao?: XOR<string, null>
  Tipo?: XOR<string, null>
  centrodecustos?: centrodecustosCreateManyWithoutEmpresasInput
  operadoras?: operadorasCreateManyWithoutEmpresasInput
}

export type empresasCreateOrConnectWithoutdadosInput = {
  where: empresasWhereUniqueInput
  create: empresasCreateWithoutDadosInput
}

export type passagensCreateWithoutDadosInput = {
  NrCartao?: XOR<string, null>
  Valor?: XOR<number, null>
  QtdDia?: XOR<number, null>
  operadoras?: operadorasCreateOneWithoutPassagensInput
}

export type passagensCreateOrConnectWithoutdadosInput = {
  where: passagensWhereUniqueInput
  create: passagensCreateWithoutDadosInput
}

export type empresasUpdateWithoutDadosInput = {
  CNPJ?: string | NullableStringFieldUpdateOperationsInput | null
  NmEmpresa?: string | NullableStringFieldUpdateOperationsInput | null
  NmFantasia?: string | NullableStringFieldUpdateOperationsInput | null
  Endereco?: string | NullableStringFieldUpdateOperationsInput | null
  CEP?: string | NullableStringFieldUpdateOperationsInput | null
  Situacao?: string | NullableStringFieldUpdateOperationsInput | null
  Tipo?: string | NullableStringFieldUpdateOperationsInput | null
  centrodecustos?: centrodecustosUpdateManyWithoutEmpresasInput
  operadoras?: operadorasUpdateManyWithoutEmpresasInput
}

export type empresasUpsertWithoutDadosInput = {
  update: empresasUpdateWithoutDadosInput
  create: empresasCreateWithoutDadosInput
}

export type passagensUpdateWithWhereUniqueWithoutDadosInput = {
  where: passagensWhereUniqueInput
  data: passagensUpdateWithoutDadosInput
}

export type passagensUpdateManyWithWhereWithoutDadosInput = {
  where: passagensScalarWhereInput
  data: passagensUpdateManyMutationInput
}

export type passagensScalarWhereInput = {
  AND?: XOR<passagensScalarWhereInput, Enumerable<passagensScalarWhereInput>>
  OR?: XOR<passagensScalarWhereInput, Enumerable<passagensScalarWhereInput>>
  NOT?: XOR<passagensScalarWhereInput, Enumerable<passagensScalarWhereInput>>
  Id?: XOR<IntFilter, number>
  CPFUsuario?: StringNullableFilter | string | null
  NrCartao?: StringNullableFilter | string | null
  Valor?: FloatNullableFilter | number | null
  IdOperadora?: IntNullableFilter | number | null
  QtdDia?: IntNullableFilter | number | null
}

export type passagensUpsertWithWhereUniqueWithoutDadosInput = {
  where: passagensWhereUniqueInput
  update: passagensUpdateWithoutDadosInput
  create: passagensCreateWithoutDadosInput
}

export type centrodecustosCreateWithoutEmpresasInput = {
  NmCentroDeCusto?: XOR<string, null>
  Situacao?: XOR<string, null>
}

export type centrodecustosCreateOrConnectWithoutempresasInput = {
  where: centrodecustosWhereUniqueInput
  create: centrodecustosCreateWithoutEmpresasInput
}

export type dadosCreateWithoutEmpresasInput = {
  NmColaborador?: XOR<string, null>
  CPF?: XOR<string, null>
  DtNascimento?: XOR<string, null>
  IdCentroDeCusto?: XOR<string, null>
  Matricula?: XOR<string, null>
  Escala?: XOR<string, null>
  Situacao?: XOR<string, null>
  passagens?: passagensCreateManyWithoutDadosInput
}

export type dadosCreateOrConnectWithoutempresasInput = {
  where: dadosWhereUniqueInput
  create: dadosCreateWithoutEmpresasInput
}

export type operadorasCreateWithoutEmpresasInput = {
  NmOperadora?: XOR<string, null>
  UF?: XOR<string, null>
  passagens?: passagensCreateManyWithoutOperadorasInput
}

export type operadorasCreateOrConnectWithoutempresasInput = {
  where: operadorasWhereUniqueInput
  create: operadorasCreateWithoutEmpresasInput
}

export type centrodecustosUpdateWithWhereUniqueWithoutEmpresasInput = {
  where: centrodecustosWhereUniqueInput
  data: centrodecustosUpdateWithoutEmpresasInput
}

export type centrodecustosUpdateManyWithWhereWithoutEmpresasInput = {
  where: centrodecustosScalarWhereInput
  data: centrodecustosUpdateManyMutationInput
}

export type centrodecustosScalarWhereInput = {
  AND?: XOR<centrodecustosScalarWhereInput, Enumerable<centrodecustosScalarWhereInput>>
  OR?: XOR<centrodecustosScalarWhereInput, Enumerable<centrodecustosScalarWhereInput>>
  NOT?: XOR<centrodecustosScalarWhereInput, Enumerable<centrodecustosScalarWhereInput>>
  Id?: XOR<IntFilter, number>
  NmCentroDeCusto?: StringNullableFilter | string | null
  IdEmpresa?: IntNullableFilter | number | null
  Situacao?: StringNullableFilter | string | null
}

export type centrodecustosUpsertWithWhereUniqueWithoutEmpresasInput = {
  where: centrodecustosWhereUniqueInput
  update: centrodecustosUpdateWithoutEmpresasInput
  create: centrodecustosCreateWithoutEmpresasInput
}

export type dadosUpdateWithWhereUniqueWithoutEmpresasInput = {
  where: dadosWhereUniqueInput
  data: dadosUpdateWithoutEmpresasInput
}

export type dadosUpdateManyWithWhereWithoutEmpresasInput = {
  where: dadosScalarWhereInput
  data: dadosUpdateManyMutationInput
}

export type dadosScalarWhereInput = {
  AND?: XOR<dadosScalarWhereInput, Enumerable<dadosScalarWhereInput>>
  OR?: XOR<dadosScalarWhereInput, Enumerable<dadosScalarWhereInput>>
  NOT?: XOR<dadosScalarWhereInput, Enumerable<dadosScalarWhereInput>>
  Id?: XOR<IntFilter, number>
  NmColaborador?: StringNullableFilter | string | null
  CPF?: StringNullableFilter | string | null
  IdEmpresa?: IntNullableFilter | number | null
  DtNascimento?: StringNullableFilter | string | null
  IdCentroDeCusto?: StringNullableFilter | string | null
  Matricula?: StringNullableFilter | string | null
  Escala?: StringNullableFilter | string | null
  Situacao?: StringNullableFilter | string | null
}

export type dadosUpsertWithWhereUniqueWithoutEmpresasInput = {
  where: dadosWhereUniqueInput
  update: dadosUpdateWithoutEmpresasInput
  create: dadosCreateWithoutEmpresasInput
}

export type operadorasUpdateWithWhereUniqueWithoutEmpresasInput = {
  where: operadorasWhereUniqueInput
  data: operadorasUpdateWithoutEmpresasInput
}

export type operadorasUpdateManyWithWhereWithoutEmpresasInput = {
  where: operadorasScalarWhereInput
  data: operadorasUpdateManyMutationInput
}

export type operadorasScalarWhereInput = {
  AND?: XOR<operadorasScalarWhereInput, Enumerable<operadorasScalarWhereInput>>
  OR?: XOR<operadorasScalarWhereInput, Enumerable<operadorasScalarWhereInput>>
  NOT?: XOR<operadorasScalarWhereInput, Enumerable<operadorasScalarWhereInput>>
  Id?: XOR<IntFilter, number>
  NmOperadora?: StringNullableFilter | string | null
  IdEmpresa?: IntNullableFilter | number | null
  UF?: StringNullableFilter | string | null
}

export type operadorasUpsertWithWhereUniqueWithoutEmpresasInput = {
  where: operadorasWhereUniqueInput
  update: operadorasUpdateWithoutEmpresasInput
  create: operadorasCreateWithoutEmpresasInput
}

export type empresasCreateWithoutOperadorasInput = {
  CNPJ?: XOR<string, null>
  NmEmpresa?: XOR<string, null>
  NmFantasia?: XOR<string, null>
  Endereco?: XOR<string, null>
  CEP?: XOR<string, null>
  Situacao?: XOR<string, null>
  Tipo?: XOR<string, null>
  centrodecustos?: centrodecustosCreateManyWithoutEmpresasInput
  dados?: dadosCreateManyWithoutEmpresasInput
}

export type empresasCreateOrConnectWithoutoperadorasInput = {
  where: empresasWhereUniqueInput
  create: empresasCreateWithoutOperadorasInput
}

export type passagensCreateWithoutOperadorasInput = {
  NrCartao?: XOR<string, null>
  Valor?: XOR<number, null>
  QtdDia?: XOR<number, null>
  dados?: dadosCreateOneWithoutPassagensInput
}

export type passagensCreateOrConnectWithoutoperadorasInput = {
  where: passagensWhereUniqueInput
  create: passagensCreateWithoutOperadorasInput
}

export type empresasUpdateWithoutOperadorasInput = {
  CNPJ?: string | NullableStringFieldUpdateOperationsInput | null
  NmEmpresa?: string | NullableStringFieldUpdateOperationsInput | null
  NmFantasia?: string | NullableStringFieldUpdateOperationsInput | null
  Endereco?: string | NullableStringFieldUpdateOperationsInput | null
  CEP?: string | NullableStringFieldUpdateOperationsInput | null
  Situacao?: string | NullableStringFieldUpdateOperationsInput | null
  Tipo?: string | NullableStringFieldUpdateOperationsInput | null
  centrodecustos?: centrodecustosUpdateManyWithoutEmpresasInput
  dados?: dadosUpdateManyWithoutEmpresasInput
}

export type empresasUpsertWithoutOperadorasInput = {
  update: empresasUpdateWithoutOperadorasInput
  create: empresasCreateWithoutOperadorasInput
}

export type passagensUpdateWithWhereUniqueWithoutOperadorasInput = {
  where: passagensWhereUniqueInput
  data: passagensUpdateWithoutOperadorasInput
}

export type passagensUpdateManyWithWhereWithoutOperadorasInput = {
  where: passagensScalarWhereInput
  data: passagensUpdateManyMutationInput
}

export type passagensUpsertWithWhereUniqueWithoutOperadorasInput = {
  where: passagensWhereUniqueInput
  update: passagensUpdateWithoutOperadorasInput
  create: passagensCreateWithoutOperadorasInput
}

export type dadosCreateWithoutPassagensInput = {
  NmColaborador?: XOR<string, null>
  CPF?: XOR<string, null>
  DtNascimento?: XOR<string, null>
  IdCentroDeCusto?: XOR<string, null>
  Matricula?: XOR<string, null>
  Escala?: XOR<string, null>
  Situacao?: XOR<string, null>
  empresas?: empresasCreateOneWithoutDadosInput
}

export type dadosCreateOrConnectWithoutpassagensInput = {
  where: dadosWhereUniqueInput
  create: dadosCreateWithoutPassagensInput
}

export type operadorasCreateWithoutPassagensInput = {
  NmOperadora?: XOR<string, null>
  UF?: XOR<string, null>
  empresas?: empresasCreateOneWithoutOperadorasInput
}

export type operadorasCreateOrConnectWithoutpassagensInput = {
  where: operadorasWhereUniqueInput
  create: operadorasCreateWithoutPassagensInput
}

export type dadosUpdateWithoutPassagensInput = {
  NmColaborador?: string | NullableStringFieldUpdateOperationsInput | null
  CPF?: string | NullableStringFieldUpdateOperationsInput | null
  DtNascimento?: string | NullableStringFieldUpdateOperationsInput | null
  IdCentroDeCusto?: string | NullableStringFieldUpdateOperationsInput | null
  Matricula?: string | NullableStringFieldUpdateOperationsInput | null
  Escala?: string | NullableStringFieldUpdateOperationsInput | null
  Situacao?: string | NullableStringFieldUpdateOperationsInput | null
  empresas?: empresasUpdateOneWithoutDadosInput
}

export type dadosUpsertWithoutPassagensInput = {
  update: dadosUpdateWithoutPassagensInput
  create: dadosCreateWithoutPassagensInput
}

export type operadorasUpdateWithoutPassagensInput = {
  NmOperadora?: string | NullableStringFieldUpdateOperationsInput | null
  UF?: string | NullableStringFieldUpdateOperationsInput | null
  empresas?: empresasUpdateOneWithoutOperadorasInput
}

export type operadorasUpsertWithoutPassagensInput = {
  update: operadorasUpdateWithoutPassagensInput
  create: operadorasCreateWithoutPassagensInput
}

export type passagensUpdateWithoutDadosInput = {
  NrCartao?: string | NullableStringFieldUpdateOperationsInput | null
  Valor?: number | NullableFloatFieldUpdateOperationsInput | null
  QtdDia?: number | NullableIntFieldUpdateOperationsInput | null
  operadoras?: operadorasUpdateOneWithoutPassagensInput
}

export type centrodecustosUpdateWithoutEmpresasInput = {
  NmCentroDeCusto?: string | NullableStringFieldUpdateOperationsInput | null
  Situacao?: string | NullableStringFieldUpdateOperationsInput | null
}

export type dadosUpdateWithoutEmpresasInput = {
  NmColaborador?: string | NullableStringFieldUpdateOperationsInput | null
  CPF?: string | NullableStringFieldUpdateOperationsInput | null
  DtNascimento?: string | NullableStringFieldUpdateOperationsInput | null
  IdCentroDeCusto?: string | NullableStringFieldUpdateOperationsInput | null
  Matricula?: string | NullableStringFieldUpdateOperationsInput | null
  Escala?: string | NullableStringFieldUpdateOperationsInput | null
  Situacao?: string | NullableStringFieldUpdateOperationsInput | null
  passagens?: passagensUpdateManyWithoutDadosInput
}

export type operadorasUpdateWithoutEmpresasInput = {
  NmOperadora?: string | NullableStringFieldUpdateOperationsInput | null
  UF?: string | NullableStringFieldUpdateOperationsInput | null
  passagens?: passagensUpdateManyWithoutOperadorasInput
}

export type passagensUpdateWithoutOperadorasInput = {
  NrCartao?: string | NullableStringFieldUpdateOperationsInput | null
  Valor?: number | NullableFloatFieldUpdateOperationsInput | null
  QtdDia?: number | NullableIntFieldUpdateOperationsInput | null
  dados?: dadosUpdateOneWithoutPassagensInput
}

/**
 * Batch Payload for updateMany & deleteMany
 */

export type BatchPayload = {
  count: number
}

/**
 * DMMF
 */
export declare const dmmf: DMMF.Document;
export {};
