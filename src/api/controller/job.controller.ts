import { Controller, Get, HttpCode } from '@nestjs/common'
import { JobControllerDto as Dto } from './job.controller.dto'
import { TaskService } from '../../schedule/service/task.service'

@Controller(Dto.Name)
export class JobController {
    constructor(private readonly taskService: TaskService) {}

    @Get(Dto.HttpGetLoadSetApiRawData.Endpoint)
    @HttpCode(Dto.HttpGetLoadSetApiRawData.StatusCode)
    async httpGetLoadSetApiRawData(): Promise<Dto.HttpGetLoadSetApiRawData.Response> {
        await this.taskService.loadSetApiRawData()
    }
}
