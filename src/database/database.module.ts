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
import { SymbolRepository } from './repository/symbol.repository'
import { FinancialStatementRepository } from './repository/financial-statement.repository'
import { TradingStatRepository } from './repository/trading-stat.repository'
import { FinancialRatioRepository } from './repository/financial-ratio.repository'
import { ReportBasicInfoRepository } from './repository/report-basic-info.repository'

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
                logging: true,
                entities: [...entities],
                namingStrategy: new SnakeNamingStrategy(),
                ssl: configProviderService.isProduction(),
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
        SymbolRepository,
        FinancialStatementRepository,
        FinancialRatioRepository,
        TradingStatRepository,
        ReportBasicInfoRepository,
    ],
    exports: [
        DbContextService,
        SetApiRawDataRepository,
        SymbolRepository,
        FinancialStatementRepository,
        FinancialRatioRepository,
        TradingStatRepository,
        ReportBasicInfoRepository,
    ],
})
export class DatabaseModule implements NestModule {
    configure(consumer: MiddlewareConsumer): void {
        consumer.apply(DbContextMiddleware).forRoutes('*')
    }
}
