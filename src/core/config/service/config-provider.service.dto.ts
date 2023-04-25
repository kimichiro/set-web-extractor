export namespace ConfigProviderServiceDto {
    export enum ConfigKey {
        PostgresHost = 'POSTGRES_HOST',
        PostgresPort = 'POSTGRES_PORT',
        PostgresDb = 'POSTGRES_DB',
        PostgresUser = 'POSTGRES_USER',
        PostgresPassword = 'POSTGRES_PASSWORD',
        PostgresDialect = 'POSTGRES_DIALECT',
    }

    export interface ConfigValueType {
        [ConfigKey.PostgresHost]: string
        [ConfigKey.PostgresPort]: number
        [ConfigKey.PostgresDb]: string
        [ConfigKey.PostgresUser]: string
        [ConfigKey.PostgresPassword]: string
        [ConfigKey.PostgresDialect]: string
    }

    export const ConfigDefaultValue: ConfigValueType = {
        [ConfigKey.PostgresHost]: 'postgres',
        [ConfigKey.PostgresPort]: 19999,
        [ConfigKey.PostgresDb]: 'postgres',
        [ConfigKey.PostgresUser]: 'postgres',
        [ConfigKey.PostgresPassword]: 'postgres',
        [ConfigKey.PostgresDialect]: 'postgres',
    }

    export namespace GetString {
        export type Params<TKey extends ConfigKey> = TKey

        export type Result<TKey extends ConfigKey> = ConfigValueType[TKey] & string
    }

    export namespace GetNumber {
        export type Params<TKey extends ConfigKey> = TKey

        export type Result<TKey extends ConfigKey> = ConfigValueType[TKey] & number
    }

    export namespace GetBoolean {
        export type Params<TKey extends ConfigKey> = TKey

        export type Result<TKey extends ConfigKey> = ConfigValueType[TKey] & boolean
    }
}
