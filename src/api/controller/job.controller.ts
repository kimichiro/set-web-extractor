import {
    Controller,
    Get,
    HttpCode,
    Param,
    NotFoundException,
} from '@nestjs/common'
import { QueueService } from '../../schedule/service/queue.service'
import { QueueServiceDto } from '../../schedule/service/queue.service.dto'
import { JobControllerDto as Dto } from './job.controller.dto'

@Controller(Dto.Name)
export class JobController {
    constructor(private readonly queueService: QueueService) {}

    @Get(Dto.HttpGetQueue.Endpoint)
    @HttpCode(Dto.HttpGetQueue.StatusCode)
    async httpGetQueue(
        @Param(Dto.HttpGetQueue.Param.Queue) queue: string,
        @Param(Dto.HttpGetQueue.Param.Action) action: string,
    ): Promise<Dto.HttpGetQueue.Response> {
        const type = Object.values(QueueServiceDto.MessageType).find(
            value => value === `${queue}.${action}`,
        )
        if (type == null) {
            throw new NotFoundException('Unsupported message type')
        }

        const jobId = await this.queueService.pushMessage({
            type,
        })

        if (jobId == null) {
            throw new NotFoundException('Unknown queue')
        }

        return {
            jobId: jobId.toString(),
        }
    }
}
