import { Controller, Get } from '@nestjs/common'
import { HealthCheckService } from '../service/health-check.service'
import { HealthCheckControllerDto as Dto } from './health-check-controller.dto'
import { SetExtractService } from 'src/etl/service/set-extract.service'

@Controller(Dto.Name)
export class HealthCheckController {
    constructor(
        private readonly healthCheckService: HealthCheckService,
        private readonly setExtractService: SetExtractService,
    ) {}

    @Get(Dto.HttpGet.Endpoint)
    httpGet(): Dto.HttpGet.Response {
        return this.healthCheckService.serverInfo()
    }

    @Get(Dto.HttpGetTrigger.Endpoint)
    httpGetTrigger(): Promise<Dto.HttpGetTrigger.Response> {
        return this.setExtractService.retreiveData()
    }
}
