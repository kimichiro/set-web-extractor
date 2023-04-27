import { Module } from '@nestjs/common'
import { ScheduleModule as NestScheduleModule } from '@nestjs/schedule'
import { CoreModule } from '../core/core.module'
import { DatabaseModule } from '../database/database.module'
import { EtlModule } from '../etl/etl.module'
import { CronJobService } from './service/cron-job.service'
import { TaskService } from './service/task.service'

@Module({
    imports: [
        CoreModule,
        DatabaseModule,
        EtlModule,
        NestScheduleModule.forRoot(),
    ],
    providers: [TaskService, CronJobService],
    exports: [TaskService, CronJobService],
})
export class ScheduleModule {}
