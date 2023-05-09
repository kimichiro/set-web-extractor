import { Injectable } from '@nestjs/common'
import { ConfigProviderService } from '../../core/config/service/config-provider.service'
import { SetExtractService } from '../../etl/service/set-extract.service'
import { QueueService } from './queue.service'
import { SetApiExtractServiceDto as Dto } from './set-api-extract.service.dto'
import { QueueServiceDto } from './queue.service.dto'

@Injectable()
export class SetApiExtractService {
    constructor(
        private readonly configProviderService: ConfigProviderService,
        private readonly queueService: QueueService,
        private readonly setExtractService: SetExtractService,
    ) {}

    async upsertSymbolList(): Promise<Dto.UpsertSymbolList.Result> {
        let symbolList = await this.setExtractService.upsertSymbolList()

        if (this.configProviderService.isDebug()) {
            symbolList = symbolList.filter((_, index) => index < 50)
        }

        await Promise.all(
            symbolList.map(({ symbol }) =>
                this.queueService.pushMessage({
                    type: QueueServiceDto.MessageType.SetApiExtractUpdateSymbol,
                    data: { symbol },
                }),
            ),
        )

        await Promise.all(
            symbolList
                .filter(
                    ({ market, securityType }) =>
                        market.toUpperCase() === 'SET' &&
                        securityType.toUpperCase() === 'S',
                )
                .flatMap(symbol => [
                    this.queueService.pushMessage({
                        type: QueueServiceDto.MessageType
                            .SetApiExtractInsertFinancialStatement,
                        data: { symbol },
                    }),
                    this.queueService.pushMessage({
                        type: QueueServiceDto.MessageType
                            .SetApiExtractInsertTradingStat,
                        data: { symbol },
                    }),
                ]),
        )
    }

    async updateSymbol(
        params: Dto.UpdateSymbol.Params,
    ): Promise<Dto.UpdateSymbol.Result> {
        const { symbol } = params

        await this.setExtractService.updateSymbol({ symbol })
    }

    async insertFinancialStatement(
        params: Dto.InsertFinancialStatement.Params,
    ): Promise<Dto.InsertFinancialStatement.Result> {
        const { symbol } = params

        await this.setExtractService.insertFinancialStatement({ symbol })
    }

    async insertTradingStat(
        params: Dto.InsertTradingStat.Params,
    ): Promise<Dto.InsertTradingStat.Result> {
        const { symbol } = params

        await this.setExtractService.insertTradingStat({ symbol })
    }
}
