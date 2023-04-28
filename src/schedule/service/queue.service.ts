import { InjectQueue } from '@nestjs/bull'
import { Injectable } from '@nestjs/common'
import { Queue } from 'bull'
import { LogService } from '../../core/log/service/log.service'
import { SetApiLoadProcessorDto } from './set-api-load.processor.dto'
import { QueueServiceDto as Dto } from './queue.service.dto'
import { ConfigProviderService } from '../../core/config/service/config-provider.service'
import { ConfigProviderServiceDto } from '../../core/config/service/config-provider.service.dto'

@Injectable()
export class QueueService {
    constructor(
        private readonly logService: LogService,
        private readonly configProviderService: ConfigProviderService,
        @InjectQueue(SetApiLoadProcessorDto.Name)
        private setApiLoadQueue: Queue<SetApiLoadProcessorDto.ProcessMessage.Params>,
    ) {}

    async pushMessage(
        params: Dto.PushMessage.Params,
    ): Promise<Dto.PushMessage.Result> {
        const { type, data } = params

        switch (type) {
            case Dto.MessageType.SetApiLoadListSymbol:
            case Dto.MessageType.SetApiLoadFetchSymbolData:
                return await this.pushSetApiLoadQueue(type, data)
            default: {
                this.logService.info('Queue name not supported')
                return null
            }
        }
    }

    private async pushSetApiLoadQueue(
        type: Dto.MessageType,
        data?: object,
    ): Promise<Dto.PushMessage.Result> {
        const job = await this.setApiLoadQueue.add(
            { type, data },
            {
                delay: this.configProviderService.getNumber(
                    ConfigProviderServiceDto.ConfigKey.BullDelay,
                ),
                timeout: this.configProviderService.getNumber(
                    ConfigProviderServiceDto.ConfigKey.BullTimeout,
                ),
                removeOnComplete: true,
            },
        )
        return job.id
    }
}
