import { Injectable } from '@nestjs/common'
import { SetApiLoadServiceDto as Dto } from './set-api-load.service.dto'
import { SetCollectionService } from '../../etl/service/set-collection.service'
import { QueueService } from './queue.service'
import { QueueServiceDto } from './queue.service.dto'

@Injectable()
export class SetApiLoadService {
    constructor(
        private readonly queueService: QueueService,
        private readonly setCollectionService: SetCollectionService,
    ) {}

    async listSymbol(): Promise<Dto.ListSymbol.Result> {
        const symbolList = await this.setCollectionService.loadSymbolList()

        await Promise.all(
            symbolList.securitySymbols
                .filter(
                    ({ market, securityType }) =>
                        market.toUpperCase() === 'SET' &&
                        securityType.toUpperCase() === 'S',
                )
                .map(({ symbol }) =>
                    this.queueService.pushMessage({
                        type: QueueServiceDto.MessageType.SetApiLoadFetchSymbolData,
                        data: { symbol },
                    }),
                ),
        )
    }

    async fetchSymbolData(
        params: Dto.FetchSymbolData.Params,
    ): Promise<Dto.FetchSymbolData.Result> {
        const { symbol } = params

        await this.setCollectionService.loadSymbolRawData({ symbol })
    }
}
