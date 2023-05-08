import { BullModule } from '@nestjs/bull'
import { Module } from '@nestjs/common'
import { ScheduleModule as NestScheduleModule } from '@nestjs/schedule'
import { CoreModule } from '../core/core.module'
import { ConfigProviderService } from '../core/config/service/config-provider.service'
import { ConfigProviderServiceDto } from '../core/config/service/config-provider.service.dto'
import { DatabaseModule } from '../database/database.module'
import { EtlModule } from '../etl/etl.module'
import { CronJobService } from './service/cron-job.service'
import { SetApiProcessor } from './service/set-api.processor'
import { SetApiProcessorDto } from './service/set-api.processor.dto'
import { SetApiLoadService } from './service/set-api-load.service'
import { SetApiExtractService } from './service/set-api-extract.service'
import { QueueService } from './service/queue.service'
import { SetApiTransformService } from './service/set-api-transform.service'

@Module({
    imports: [
        CoreModule,
        DatabaseModule,
        EtlModule,
        NestScheduleModule.forRoot(),
        BullModule.registerQueue({
            name: SetApiProcessorDto.Name,
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
        SetApiExtractService,
        SetApiTransformService,
        SetApiProcessor,
        QueueService,
        CronJobService,
    ],
    exports: [QueueService],
})
export class ScheduleModule {}
