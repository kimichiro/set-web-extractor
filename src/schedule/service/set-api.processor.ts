import { Process, Processor } from '@nestjs/bull'
import { Job } from 'bull'
import { LogService } from '../../core/log/service/log.service'
import { QueueServiceDto } from './queue.service.dto'
import { SetApiProcessorDto as Dto } from './set-api.processor.dto'
import { SetApiExtractService } from './set-api-extract.service'
import { SetApiExtractServiceDto } from './set-api-extract.service.dto'
import { SetApiLoadService } from './set-api-load.service'
import { SetApiLoadServiceDto } from './set-api-load.service.dto'

@Processor(Dto.Name)
export class SetApiProcessor {
    constructor(
        private readonly logService: LogService,
        private readonly setApiLoadService: SetApiLoadService,
        private readonly setApiExtractService: SetApiExtractService,
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
