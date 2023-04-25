import { Module } from '@nestjs/common'
import { ConfigModule as NestJsConfigModule } from '@nestjs/config'
import { ConfigProviderService } from './service/config-provider.service'

@Module({
    imports: [
        NestJsConfigModule.forRoot({
            cache: true,
        }),
    ],
    providers: [ConfigProviderService],
    exports: [ConfigProviderService],
})
export class ConfigModule {}
