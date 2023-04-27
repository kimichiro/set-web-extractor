import { Module } from '@nestjs/common'
import { CollectionController } from './controller/collection.controller'
import { EtlModule } from 'src/etl/etl.module'
import { JobController } from './controller/job.controller'
import { ScheduleModule } from '@nestjs/schedule'

@Module({
    imports: [EtlModule, ScheduleModule],
    controllers: [CollectionController, JobController],
})
export class ApiModule {}
