import { Module } from '@nestjs/common'
import { LogModule } from './log/log.module'
import { HttpModule } from '@nestjs/axios'
import { ConfigModule } from './config/config.module'
import { ExceptionModule } from './exception/exception.module'

@Module({
    imports: [LogModule, ConfigModule, ExceptionModule, HttpModule],
    exports: [LogModule, ConfigModule, ExceptionModule, HttpModule],
})
export class CoreModule {}
