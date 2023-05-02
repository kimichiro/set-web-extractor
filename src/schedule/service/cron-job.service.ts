import { Injectable } from '@nestjs/common'
import { Cron } from '@nestjs/schedule'
import { LogService } from '../../core/log/service/log.service'
import { CronJobServiceDto as Dto } from './cron-job.service.dto'
import { SetApiLoadService } from './set-api-load.service'
import { SetApiExtractService } from './set-api-extract.service'

@Injectable()
export class CronJobService {
    constructor(
        private readonly logService: LogService,
        private readonly setWebLoadService: SetApiLoadService,
        private readonly setApiExtractService: SetApiExtractService,
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

    @Cron(Dto.TriggerExtractSetApiRawData.CronExpression)
    async triggerExtractSetApiRawData(): Promise<Dto.TriggerExtractSetApiRawData.Result> {
        this.logService.info(
            `Cron begin ${this.triggerExtractSetApiRawData.name}`,
            CronJobService.name,
        )

        await this.setApiExtractService.upsertSymbolList()

        this.logService.info(
            `Cron success ${this.triggerExtractSetApiRawData.name}`,
            CronJobService.name,
        )
    }
}
