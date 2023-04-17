import { Module } from '@nestjs/common'
import { HealthCheckController } from './controller/health-check-controller'
import { HealthCheckService } from './service/health-check.service'

@Module({
    imports: [],
    controllers: [HealthCheckController],
    providers: [HealthCheckService],
})
export class ApiModule {}
