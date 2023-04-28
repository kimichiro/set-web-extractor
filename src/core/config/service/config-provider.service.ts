import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { ConfigProviderServiceDto as Dto } from './config-provider.service.dto'

@Injectable()
export class ConfigProviderService {
    constructor(private readonly configService: ConfigService) {}

    isProduction(): boolean {
        return this.getString(Dto.ConfigKey.NodeEnv) === 'production'
    }

    getString<TKey extends Dto.ConfigKey>(
        key: Dto.GetString.Params<TKey>,
    ): Dto.GetString.Result<TKey> {
        const defaultValue = Dto.ConfigDefaultValue[key]

        const rawValue = this.configService.get<string>(
            key,
            defaultValue as string,
        )

        return `${rawValue}` as Dto.GetString.Result<TKey>
    }

    getNumber<TKey extends Dto.ConfigKey>(
        key: Dto.GetNumber.Params<TKey>,
    ): Dto.GetNumber.Result<TKey> {
        const defaultValue = Dto.ConfigDefaultValue[key]

        const rawValue = this.configService.get<number>(
            key,
            defaultValue as number,
        )

        return parseFloat(`${rawValue}`) as Dto.GetNumber.Result<TKey>
    }

    getBoolean<TKey extends Dto.ConfigKey>(
        key: Dto.GetBoolean.Params<TKey>,
    ): Dto.GetBoolean.Result<TKey> {
        const defaultValue = Dto.ConfigDefaultValue[key]

        const rawValue = this.configService.get<string>(key, '')

        return (
            rawValue != null && rawValue.toLowerCase() === 'true'
                ? true
                : defaultValue
        ) as Dto.GetBoolean.Result<TKey>
    }
}
