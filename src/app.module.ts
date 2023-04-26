import { Module } from '@nestjs/common'
import { RouterModule } from '@nestjs/core'
import { ApiModule } from './api/api.module'
import { CoreModule } from './core/core.module'
import { HealthModule } from './core/health/health.module'
import { DatabaseModule } from './database/database.module'
import { EtlModule } from './etl/etl.module'
import { ScheduleModule } from './schedule/schedule.module'

@Module({
    imports: [
        CoreModule,
        DatabaseModule,
        EtlModule,
        ApiModule,
        ScheduleModule,
        RouterModule.register([
            {
                path: '',
                module: HealthModule,
            },
            {
                path: 'api',
                module: ApiModule,
            },
        ]),
    ],
})
export class AppModule {}
