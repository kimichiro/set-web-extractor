import { Module } from '@nestjs/common'
import { LogModule } from './log/log.module'

@Module({
    imports: [LogModule],
    exports: [LogModule],
})
export class CoreModule {}
