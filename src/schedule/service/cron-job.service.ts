import { Injectable } from '@nestjs/common'
import { Cron } from '@nestjs/schedule'
import { LogService } from '../../core/log/service/log.service'
import { CronJobServiceDto as Dto } from './cron-job.service.dto'
import { SetApiLoadService } from './set-api-load.service'

@Injectable()
export class CronJobService {
    constructor(
        private readonly logService: LogService,
        private readonly setWebLoadService: SetApiLoadService,
    ) {}

    @Cron(Dto.TriggerLoadSetApiRawData.CronExpression)
    async triggerLoadSetApiRawData(): Promise<Dto.TriggerLoadSetApiRawData.Result> {
        this.logService.info(
            `Cron begin ${this.triggerLoadSetApiRawData.name}`,
            CronJobService.name,
        )

        await this.setWebLoadService.listSymbol()

        this.logService.info(
            `Cron success ${this.triggerLoadSetApiRawData.name}`,
            CronJobService.name,
        )
    }
}
