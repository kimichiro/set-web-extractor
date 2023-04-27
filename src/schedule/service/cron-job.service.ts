import { Injectable } from '@nestjs/common'
import { Cron } from '@nestjs/schedule'
import { LogService } from '../../core/log/service/log.service'
import { CronJobServiceDto as Dto } from './cron-job.service.dto'
import { TaskService } from './task.service'

@Injectable()
export class CronJobService {
    constructor(
        private readonly logService: LogService,
        private readonly taskService: TaskService,
    ) {}

    @Cron(Dto.TriggerLoadSetApiRawData.CronExpression)
    async triggerLoadSetApiRawData(): Promise<Dto.TriggerLoadSetApiRawData.Result> {
        this.logService.info(
            `Begin job ${this.triggerLoadSetApiRawData.name}`,
            CronJobService.name,
        )

        await this.taskService.loadSetApiRawData()

        this.logService.info(
            `End job ${this.triggerLoadSetApiRawData.name}`,
            CronJobService.name,
        )
    }
}
