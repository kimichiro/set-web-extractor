import { Module } from '@nestjs/common'
import { ScheduleModule as NestScheduleModule } from '@nestjs/schedule'
import { CoreModule } from '../core/core.module'
import { CronJobService } from './service/cron-job.service'

@Module({
    imports: [
        CoreModule,
        NestScheduleModule.forRoot(),
    ],
    providers: [
        CronJobService,
    ],
    exports: [
        CronJobService,
    ],
})
export class ScheduleModule {}
