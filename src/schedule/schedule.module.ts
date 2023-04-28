import { BullModule } from '@nestjs/bull'
import { Module } from '@nestjs/common'
import { ScheduleModule as NestScheduleModule } from '@nestjs/schedule'
import { CoreModule } from '../core/core.module'
import { ConfigProviderService } from '../core/config/service/config-provider.service'
import { ConfigProviderServiceDto } from '../core/config/service/config-provider.service.dto'
import { DatabaseModule } from '../database/database.module'
import { EtlModule } from '../etl/etl.module'
import { CronJobService } from './service/cron-job.service'
import { SetApiLoadService } from './service/set-api-load.service'
import { QueueService } from './service/queue.service'
import { SetApiLoadProcessor } from './service/set-api-load.processor'
import { SetApiLoadProcessorDto } from './service/set-api-load.processor.dto'

@Module({
    imports: [
        CoreModule,
        DatabaseModule,
        EtlModule,
        NestScheduleModule.forRoot(),
        BullModule.registerQueue({
            name: SetApiLoadProcessorDto.Name,
        }),
        BullModule.forRootAsync({
            imports: [CoreModule],
            useFactory: async (
                configProviderService: ConfigProviderService,
            ) => ({
                redis: {
                    ...(configProviderService.isProduction()
                        ? {
                              username: configProviderService.getString(
                                  ConfigProviderServiceDto.ConfigKey.RedisUser,
                              ),
                              password: configProviderService.getString(
                                  ConfigProviderServiceDto.ConfigKey
                                      .RedisPassword,
                              ),
                              tls: {
                                  host: configProviderService.getString(
                                      ConfigProviderServiceDto.ConfigKey
                                          .RedisHost,
                                  ),
                                  port: configProviderService.getNumber(
                                      ConfigProviderServiceDto.ConfigKey
                                          .RedisPort,
                                  ),
                              },
                          }
                        : {
                              host: configProviderService.getString(
                                  ConfigProviderServiceDto.ConfigKey.RedisHost,
                              ),
                              port: configProviderService.getNumber(
                                  ConfigProviderServiceDto.ConfigKey.RedisPort,
                              ),
                          }),
                },
            }),
            inject: [ConfigProviderService],
        }),
    ],
    providers: [
        SetApiLoadService,
        SetApiLoadProcessor,
        QueueService,
        CronJobService,
    ],
    exports: [QueueService],
})
export class ScheduleModule {}
