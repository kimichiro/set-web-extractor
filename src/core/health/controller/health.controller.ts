import { Controller, Get } from '@nestjs/common'
import { HealthService } from '../service/health.service'
import { HealthControllerDto as Dto } from './health.controller.dto'

@Controller(Dto.Name)
export class HealthController {
    constructor(private readonly healthService: HealthService) {}

    @Get(Dto.HttpGet.Endpoint)
    httpGet(): Dto.HttpGet.Response {
        return this.healthService.serverInfo()
    }
}
