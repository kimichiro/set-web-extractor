import { Injectable } from '@nestjs/common'
import { TaskServiceDto as Dto } from './task.service.dto'
import { DbContextService } from '../../database/service/db-context.service'
import { SetCollectionService } from '../../etl/service/set-collection.service'

@Injectable()
export class TaskService {
    constructor(
        private readonly dbContextService: DbContextService,
        private readonly setCollectionService: SetCollectionService,
    ) {}

    async loadSetApiRawData(): Promise<Dto.LoadSetApiRawData.Result> {
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
                    .slice(0, 400)

                for (const symbol of symbols) {
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
