export namespace ConfigProviderServiceDto {
    export enum ConfigKey {
        NodeEnv = 'NODE_ENV',

        AppDebug = 'APP_DEBUG',

        BullDelay = 'BULL_DELAY',
        BullTimeout = 'BULL_TIMEOUT',

        PostgresHost = 'POSTGRES_HOST',
        PostgresPort = 'POSTGRES_PORT',
        PostgresDb = 'POSTGRES_DB',
        PostgresUser = 'POSTGRES_USER',
        PostgresPassword = 'POSTGRES_PASSWORD',
        PostgresDialect = 'POSTGRES_DIALECT',

        RedisHost = 'REDIS_HOST',
        RedisPort = 'REDIS_PORT',
        RedisUser = 'REDIS_USER',
        RedisPassword = 'REDIS_PASSWORD',
    }

    export interface ConfigValueType {
        [ConfigKey.NodeEnv]: string

        [ConfigKey.AppDebug]: boolean

        [ConfigKey.BullDelay]: number
        [ConfigKey.BullTimeout]: number

        [ConfigKey.PostgresHost]: string
        [ConfigKey.PostgresPort]: number
        [ConfigKey.PostgresDb]: string
        [ConfigKey.PostgresUser]: string
        [ConfigKey.PostgresPassword]: string
        [ConfigKey.PostgresDialect]: string

        [ConfigKey.RedisHost]: string
        [ConfigKey.RedisPort]: number
        [ConfigKey.RedisUser]: string
        [ConfigKey.RedisPassword]: string
    }

    export const ConfigDefaultValue: ConfigValueType = {
        [ConfigKey.NodeEnv]: 'development',

        [ConfigKey.AppDebug]: false,

        [ConfigKey.BullDelay]: 1000,
        [ConfigKey.BullTimeout]: 60000,

        [ConfigKey.PostgresHost]: 'postgres',
        [ConfigKey.PostgresPort]: 19999,
        [ConfigKey.PostgresDb]: 'postgres',
        [ConfigKey.PostgresUser]: 'postgres',
        [ConfigKey.PostgresPassword]: 'postgres',
        [ConfigKey.PostgresDialect]: 'postgres',

        [ConfigKey.RedisHost]: 'localhost',
        [ConfigKey.RedisPort]: 16666,
        [ConfigKey.RedisUser]: '',
        [ConfigKey.RedisPassword]: '',
    }

    export namespace GetString {
        export type Params<TKey extends ConfigKey> = TKey

        export type Result<TKey extends ConfigKey> = ConfigValueType[TKey] &
            string
    }

    export namespace GetNumber {
        export type Params<TKey extends ConfigKey> = TKey

        export type Result<TKey extends ConfigKey> = ConfigValueType[TKey] &
            number
    }

    export namespace GetBoolean {
        export type Params<TKey extends ConfigKey> = TKey

        export type Result<TKey extends ConfigKey> = ConfigValueType[TKey] &
            boolean
    }
}
