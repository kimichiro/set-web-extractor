import { Module } from '@nestjs/common'
import { RouterModule } from '@nestjs/core'
import { ApiModule } from './api/api.module'
import { CoreModule } from './core/core.module'
import { ScheduleModule } from './schedule/schedule.module'

@Module({
    imports: [
        CoreModule,
        ApiModule,
        ScheduleModule,
        RouterModule.register([
            {
                path: 'api',
                module: ApiModule,
            },
        ]),
    ],
})
export class AppModule {}
