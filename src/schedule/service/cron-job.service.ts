import { Injectable } from '@nestjs/common'
import { Cron } from '@nestjs/schedule'
import { LogService } from '../../core/log/service/log.service'
import { CronJobServiceDto } from './cron-job.service.dto'

@Injectable()
export class CronJobService {
    constructor(
        private readonly logService: LogService,
    ) {}

    @Cron(CronJobServiceDto.Job.CronExpression)
    job(): CronJobServiceDto.Job.Result {
        this.logService.info(this.job.name, CronJobService.name)
    }
}
