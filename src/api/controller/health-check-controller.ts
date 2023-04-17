import { Controller, Get } from '@nestjs/common'
import { HealthCheckService } from '../service/health-check.service'
import { HealthCheckControllerDto } from './health-check-controller.dto'

@Controller(HealthCheckControllerDto.Name)
export class HealthCheckController {
    constructor(private readonly healthCheckService: HealthCheckService) {}

    @Get(HealthCheckControllerDto.HttpGet.Endpoint)
    httpGet(): HealthCheckControllerDto.HttpGet.Response {
        return this.healthCheckService.serverInfo()
    }
}
