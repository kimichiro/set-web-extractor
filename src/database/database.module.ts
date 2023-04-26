import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'
import { APP_INTERCEPTOR } from '@nestjs/core'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AsyncLocalStorage } from 'async_hooks'
import { SnakeNamingStrategy } from 'typeorm-naming-strategies'
import { ConfigProviderService } from '../core/config/service/config-provider.service'
import { ConfigProviderServiceDto } from '../core/config/service/config-provider.service.dto'
import { CoreModule } from '../core/core.module'
import entities from './entity'
import { DbContextInterceptor } from './interceptor/db-context.interceptor'
import { DbContextMiddleware } from './middleware/db-context.middleware'
import { SetApiRawDataRepository } from './repository/set-api-raw-data.repository'
import { DbContextService } from './service/db-context.service'

@Module({
    imports: [
        CoreModule,
        TypeOrmModule.forRootAsync({
            name: 'default',
            imports: [CoreModule],
            useFactory: (configProviderService: ConfigProviderService) => ({
                type: 'postgres',
                host: configProviderService.getString(
                    ConfigProviderServiceDto.ConfigKey.PostgresHost,
                ),
                port: configProviderService.getString(
                    ConfigProviderServiceDto.ConfigKey.PostgresPort,
                ),
                username: configProviderService.getString(
                    ConfigProviderServiceDto.ConfigKey.PostgresUser,
                ),
                password: configProviderService.getString(
                    ConfigProviderServiceDto.ConfigKey.PostgresPassword,
                ),
                database: configProviderService.getString(
                    ConfigProviderServiceDto.ConfigKey.PostgresDb,
                ),
                synchronize: false,
                logging: false,
                entities: [...entities],
                namingStrategy: new SnakeNamingStrategy(),
                ssl:
                    configProviderService.getString(
                        ConfigProviderServiceDto.ConfigKey.NodeEnv,
                    ) === 'production',
                subscribers: [],
            }),
            inject: [ConfigProviderService],
        }),
        TypeOrmModule.forFeature([...entities]),
    ],
    providers: [
        AsyncLocalStorage,
        DbContextService,
        {
            provide: APP_INTERCEPTOR,
            useClass: DbContextInterceptor,
        },
        SetApiRawDataRepository,
    ],
    exports: [DbContextService, SetApiRawDataRepository],
})
export class DatabaseModule implements NestModule {
    configure(consumer: MiddlewareConsumer): void {
        consumer.apply(DbContextMiddleware).forRoutes('*')
    }
}
