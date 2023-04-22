import { Injectable } from '@nestjs/common'
import packageJson from '../../../package.json'
import { HealthCheckServiceDto as Dto } from './health-check.service.dto'

@Injectable()
export class HealthCheckService {
    serverInfo(): Dto.ServerInfo.Result {
        return {
            version: packageJson?.version?.toString(),
        }
    }
}
