import { Injectable } from '@nestjs/common'
import { Cron } from '@nestjs/schedule'
import { LogService } from '../../core/log/service/log.service'
import { ProjectRepository } from '../../database/repository/project.repository'
import { DbContextService } from '../../database/service/db-context.service'
import { CronJobServiceDto as Dto } from './cron-job.service.dto'

@Injectable()
export class CronJobService {
    constructor(
        private readonly logService: LogService,
        private readonly dbContextService: DbContextService,
        private readonly projectRepository: ProjectRepository,
    ) {}

    @Cron(Dto.Job.CronExpression)
    async job(): Promise<Dto.Job.Result> {
        this.logService.info(this.job.name, CronJobService.name)

        let resolve
        const waiting = new Promise((r) => resolve = r)
        this.dbContextService.run(async () => {
            const defaultTransaction = this.dbContextService.getDefaultTransaction()
    
            await defaultTransaction.begin()
    
            await this.projectRepository.insert({
                repositoryAccessToken: '555',
                releaseCandidateNumber: 555,
                releaseCandidateNumber2: 555,
            })
    
            await defaultTransaction.commit()
    
            await defaultTransaction.begin()

            await this.projectRepository.insert({
                repositoryAccessToken: '666',
                releaseCandidateNumber: 666,
                releaseCandidateNumber2: 666,
            })
    
            await defaultTransaction.commit()
        })

        await waiting
    }
}
