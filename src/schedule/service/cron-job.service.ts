import { Injectable } from '@nestjs/common'
import { Cron } from '@nestjs/schedule'
import { LogService } from '../../core/log/service/log.service'
import { CronJobServiceDto as Dto } from './cron-job.service.dto'
import { DbContextService } from '../../database/service/db-context.service'
import { SetCollectionService } from '../../etl/service/set-collection.service'

@Injectable()
export class CronJobService {
    constructor(
        private readonly logService: LogService,
        private readonly dbContextService: DbContextService,
        private readonly setCollectionService: SetCollectionService,
    ) {}

    @Cron(Dto.JobLoadSetApiRawData.CronExpression)
    async jobLoadSetApiRawData(): Promise<Dto.JobLoadSetApiRawData.Result> {
        this.logService.info(
            this.jobLoadSetApiRawData.name,
            CronJobService.name,
        )

        await new Promise(resolve => {
            this.dbContextService.run(async () => {
                const defaultTransaction =
                    this.dbContextService.getDefaultTransaction()

                await defaultTransaction.begin()

                const symbolList =
                    await this.setCollectionService.loadSymbolList()

                await defaultTransaction.commit()

                const symbols = symbolList.securitySymbols
                    .filter(
                        s =>
                            s.market.toUpperCase() === 'SET' &&
                            s.securityType.toUpperCase() === 'S',
                    )
                    .map(s => s.symbol)
                    .slice(0, 4)

                for (const symbol in symbols) {
                    await defaultTransaction.begin()

                    await this.setCollectionService.loadSymbolRawData({
                        symbol,
                    })

                    await defaultTransaction.commit()
                }

                resolve(true)
            })
        })
    }
}
