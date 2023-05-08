import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { ReportBasicInfoEntity } from '../entity/report-basic-info.entity'
import { BaseRepository } from './base.repository'

@Injectable()
export class ReportBasicInfoRepository extends BaseRepository<ReportBasicInfoEntity> {
    constructor(
        @InjectRepository(ReportBasicInfoEntity)
        reportBasicInfoRepository: Repository<ReportBasicInfoEntity>,
    ) {
        super(reportBasicInfoRepository)
    }
}
