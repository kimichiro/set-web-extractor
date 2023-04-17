import { Module } from '@nestjs/common'
import { HealthCheckController } from './controller/health-check-controller'
import { HealthCheckService } from './service/health-check.service'
import { ExtractModule } from 'src/extract/extract.module'

@Module({
    imports: [
        ExtractModule,
    ],
    controllers: [
        HealthCheckController,
    ],
    providers: [
        HealthCheckService,
    ],
})
export class ApiModule {}
