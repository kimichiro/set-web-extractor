import { Module } from '@nestjs/common'
import { ScheduleModule as NestScheduleModule } from '@nestjs/schedule'
import { CoreModule } from '../core/core.module'
import { CronJobService } from './service/cron-job.service'
import { EtlModule } from 'src/etl/etl.module'
import { DatabaseModule } from '../database/database.module'

@Module({
    imports: [
        CoreModule,
        DatabaseModule,
        EtlModule,
        NestScheduleModule.forRoot(),
    ],
    providers: [CronJobService],
    exports: [CronJobService],
})
export class ScheduleModule {}
