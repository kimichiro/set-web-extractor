import { Process, Processor } from '@nestjs/bull'
import { Job } from 'bull'
import { LogService } from '../../core/log/service/log.service'
import { QueueServiceDto } from './queue.service.dto'
import { SetApiLoadProcessorDto as Dto } from './set-api-load.processor.dto'
import { SetApiLoadService } from './set-api-load.service'
import { SetApiLoadServiceDto } from './set-api-load.service.dto'

@Processor(Dto.Name)
export class SetApiLoadProcessor {
    constructor(
        private readonly logService: LogService,
        private readonly setApiLoadService: SetApiLoadService,
    ) {}

    @Process()
    async processMessage(
        job: Job<Dto.ProcessMessage.Params>,
    ): Promise<Dto.ProcessMessage.Result> {
        const { type, data } = job.data

        try {
            this.logService.info(
                `Job:${job.id} ${type} begin`,
                SetApiLoadProcessor.name,
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
            }

            this.logService.info(
                `Job:${job.id} ${type} success`,
                SetApiLoadProcessor.name,
            )
        } catch (error) {
            this.logService.error(
                `Job:${job.id} ${type} error - [${error?.response?.status}] ${error.message}`,
                SetApiLoadProcessor.name,
            )
        }
    }
}
