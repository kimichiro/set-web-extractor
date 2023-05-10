import { Injectable } from '@nestjs/common'
import { SetTransformService } from '../../etl/service/set-transform.service'
import { QueueServiceDto } from './queue.service.dto'
import { QueueService } from './queue.service'
import { SetApiTransformServiceDto as Dto } from './set-api-transform.service.dto'

@Injectable()
export class SetApiTransformService {
    constructor(
        private readonly queueService: QueueService,
        private readonly setTransformService: SetTransformService,
    ) {}

    async enqueueSymbolList(): Promise<Dto.EnqueueSymbolList.Result> {
        const symbolList = await this.setTransformService.getPendingSymbolList()

        // await Promise.all(
        //     symbolList.map(({ symbol }) =>
        //         this.queueService.pushMessage({
        //             type: QueueServiceDto.MessageType
        //                 .SetApiTransformUpsertBasicInfo,
        //             data: { symbol },
        //         }),
        //     ),
        // )
    }

    async upsertBasicInfo(
        params: Dto.UpsertBasicInfo.Params,
    ): Promise<Dto.UpsertBasicInfo.Result> {
        const { symbol } = params

        await this.setTransformService.upsertBasicInfo({ symbol })
    }
}
