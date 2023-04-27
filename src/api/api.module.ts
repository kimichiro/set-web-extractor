import { Module } from '@nestjs/common'
import { EtlModule } from '../etl/etl.module'
import { ScheduleModule } from '../schedule/schedule.module'
import { CollectionController } from './controller/collection.controller'
import { JobController } from './controller/job.controller'

@Module({
    imports: [EtlModule, ScheduleModule],
    controllers: [CollectionController, JobController],
})
export class ApiModule {}
