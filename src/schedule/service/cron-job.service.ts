import { Injectable } from '@nestjs/common'
import { Cron } from '@nestjs/schedule'
import { LogService } from '../../core/log/service/log.service'
import { CronJobServiceDto as Dto } from './cron-job.service.dto'

@Injectable()
export class CronJobService {
    constructor(
        private readonly logService: LogService,
    ) {}

    @Cron(Dto.Job.CronExpression)
    async job(): Promise<Dto.Job.Result> {
        this.logService.info(this.job.name, CronJobService.name)

        // let resolve
        // const waiting = new Promise((r) => resolve = r)
        // this.dbContextService.run(async () => {
        //     const defaultTransaction = this.dbContextService.getDefaultTransaction()

        //     await defaultTransaction.begin()

        //     this.setApiRawDataRepository.insert({
        //         url: 'asd',
        //         data: {
        //             foo: 1,
        //             bar: 2,
        //         },
        //     })

        //     await defaultTransaction.commit()

        //     await defaultTransaction.begin()

        //     this.setApiRawDataRepository.insert({
        //         url: 'qwe',
        //         data: {
        //             foo: 11,
        //             bar: 22,
        //         },
        //     })

        //     await defaultTransaction.commit()
        // })

        // await waiting
    }
}
