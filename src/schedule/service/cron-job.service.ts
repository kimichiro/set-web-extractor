import { Injectable } from '@nestjs/common'
import { Cron } from '@nestjs/schedule'
import { LogService } from '../../core/log/service/log.service'
import { CronJobServiceDto as Dto } from './cron-job.service.dto'
import { SetWebScrapeService } from 'src/extract/service/set-web-scrape.service'

@Injectable()
export class CronJobService {
    constructor(
        private readonly logService: LogService,
        private readonly setWebScrapeService: SetWebScrapeService,
    ) {}

    @Cron(Dto.Job.CronExpression)
    async job(): Promise<Dto.Job.Result> {
        this.logService.info(this.job.name, CronJobService.name)

        const result = await this.setWebScrapeService.scrapeFinancialHighlight()
        this.logService.info(
            `Result length: ${result.length}`,
            CronJobService.name,
        )
    }
}
