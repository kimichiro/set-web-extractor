import { Process, Processor } from '@nestjs/bull'
import { Job } from 'bull'
import { LogService } from '../../core/log/service/log.service'
import { QueueServiceDto } from './queue.service.dto'
import { SetApiProcessorDto as Dto } from './set-api.processor.dto'
import { SetApiExtractService } from './set-api-extract.service'
import { SetApiExtractServiceDto } from './set-api-extract.service.dto'
import { SetApiLoadService } from './set-api-load.service'
import { SetApiLoadServiceDto } from './set-api-load.service.dto'
import { SetApiTransformService } from './set-api-transform.service'
import { SetApiTransformServiceDto } from './set-api-transform.service.dto'

@Processor(Dto.Name)
export class SetApiProcessor {
    constructor(
        private readonly logService: LogService,
        private readonly setApiLoadService: SetApiLoadService,
        private readonly setApiExtractService: SetApiExtractService,
        private readonly setApiTransformService: SetApiTransformService,
    ) {}

    @Process()
    async processMessage(
        job: Job<Dto.ProcessMessage.Params>,
    ): Promise<Dto.ProcessMessage.Result> {
        const { type, data } = job.data

        try {
            this.logService.info(
                `Job:${job.id} ${type} begin`,
                SetApiProcessor.name,
            )

            switch (type) {
                case QueueServiceDto.MessageType.SetApiLoadListSymbol: {
                    await this.setApiLoadService.listSymbol()
                    break
                }
                case QueueServiceDto.MessageType.SetApiLoadFetchSymbolData: {
                    const params =
                        data as SetApiLoadServiceDto.FetchSymbolData.Params

                    await this.setApiLoadService.fetchSymbolData(params)
                    break
                }
                case QueueServiceDto.MessageType
                    .SetApiExtractUpsertSymbolList: {
                    await this.setApiExtractService.upsertSymbolList()
                    break
                }
                case QueueServiceDto.MessageType.SetApiExtractUpdateSymbol: {
                    const params =
                        data as SetApiExtractServiceDto.UpdateSymbol.Params

                    await this.setApiExtractService.updateSymbol(params)
                    break
                }
                case QueueServiceDto.MessageType
                    .SetApiExtractInsertFinancialStatement: {
                    const params =
                        data as SetApiExtractServiceDto.InsertFinancialStatement.Params

                    await this.setApiExtractService.insertFinancialStatement(
                        params,
                    )
                    break
                }
                case QueueServiceDto.MessageType
                    .SetApiExtractInsertTradingStat: {
                    const params =
                        data as SetApiExtractServiceDto.InsertTradingStat.Params

                    await this.setApiExtractService.insertTradingStat(params)
                    break
                }
                case QueueServiceDto.MessageType
                    .SetApiTransformEnqueueSymbolList: {
                    await this.setApiTransformService.enqueueSymbolList()
                    break
                }
                case QueueServiceDto.MessageType
                    .SetApiTransformUpsertBasicInfo: {
                    const params =
                        data as SetApiTransformServiceDto.UpsertBasicInfo.Params

                    await this.setApiTransformService.upsertBasicInfo(params)
                    break
                }
            }

            this.logService.info(
                `Job:${job.id} ${type} success`,
                SetApiProcessor.name,
            )
        } catch (error) {
            this.logService.error(
                `Job:${job.id} ${type} error - [${error?.response?.status}] ${error.message}`,
                SetApiProcessor.name,
            )
        }
    }
}
