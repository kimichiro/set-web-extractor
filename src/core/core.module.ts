import { Module } from '@nestjs/common'
import { LogModule } from './log/log.module'
import { HttpModule } from '@nestjs/axios'
import { ExceptionModule } from './exception/exception.module'

@Module({
    imports: [LogModule, ExceptionModule, HttpModule],
    exports: [LogModule, ExceptionModule, HttpModule],
})
export class CoreModule {}
