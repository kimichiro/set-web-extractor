import { Module } from '@nestjs/common'
import { HttpModule } from '@nestjs/axios'
import { ConfigModule } from './config/config.module'
import { ExceptionModule } from './exception/exception.module'
import { HealthModule } from './health/health.module'
import { LogModule } from './log/log.module'

@Module({
    imports: [
        HealthModule,
        LogModule,
        ConfigModule,
        ExceptionModule,
        HttpModule,
    ],
    exports: [
        HealthModule,
        LogModule,
        ConfigModule,
        ExceptionModule,
        HttpModule,
    ],
})
export class CoreModule {}
