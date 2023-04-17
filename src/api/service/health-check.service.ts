import { Injectable } from '@nestjs/common'
import packageJson from '../../../package.json'
import { HealthCheckServiceDto } from './health-check.service.dto'

@Injectable()
export class HealthCheckService {
    serverInfo(): HealthCheckServiceDto.ServerInfo.Result {
        return {
            version: packageJson?.version?.toString(),
        }
    }
}
