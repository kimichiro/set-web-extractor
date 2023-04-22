import { Module } from '@nestjs/common'
import { HealthCheckController } from './controller/health-check-controller'
import { HealthCheckService } from './service/health-check.service'
import { EtlModule } from 'src/etl/etl.module'

@Module({
    imports: [EtlModule],
    controllers: [HealthCheckController],
    providers: [HealthCheckService],
})
export class ApiModule {}
