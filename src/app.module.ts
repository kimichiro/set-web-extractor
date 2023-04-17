import { Module } from '@nestjs/common'
import { RouterModule } from '@nestjs/core'
import { ApiModule } from './api/api.module'

@Module({
    imports: [
        ApiModule,
        RouterModule.register([
            {
                path: 'api',
                module: ApiModule,
            },
        ]),
    ],
})
export class AppModule {}
