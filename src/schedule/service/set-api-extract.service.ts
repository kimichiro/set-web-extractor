import { Injectable } from '@nestjs/common'
import { SetExtractService } from '../../etl/service/set-extract.service'
import { QueueService } from './queue.service'
import { SetApiExtractServiceDto as Dto } from './set-api-extract.service.dto'
import { QueueServiceDto } from './queue.service.dto'

@Injectable()
export class SetApiExtractService {
    constructor(
        private readonly queueService: QueueService,
        private readonly setExtractService: SetExtractService,
    ) {}

    async upsertSymbolList(): Promise<Dto.UpsertSymbolList.Result> {
        const symbolList = await this.setExtractService.upsertSymbolList()

        symbolList
            .filter((_, index) => index < 50)
            .forEach(({ symbol }) => {
                this.queueService.pushMessage({
                    type: QueueServiceDto.MessageType.SetApiExtractUpdateSymbol,
                    data: { symbol },
                })
            })
    }

    async updateSymbol(
        params: Dto.UpdateSymbol.Params,
    ): Promise<Dto.UpdateSymbol.Result> {
        const { symbol } = params

        await this.setExtractService.updateSymbol({ symbol })
    }
}
