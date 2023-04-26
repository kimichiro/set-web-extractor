import { Injectable } from '@nestjs/common'
import packageJson from '../../../../package.json'
import { HealthServiceDto as Dto } from './health.service.dto'

@Injectable()
export class HealthService {
    serverInfo(): Dto.ServerInfo.Result {
        return {
            version: packageJson?.version?.toString(),
        }
    }
}
