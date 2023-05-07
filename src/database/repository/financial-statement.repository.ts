import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { BaseRepository } from './base.repository'
import { FinancialStatementEntity } from '../entity/financial-statement.entity'

@Injectable()
export class FinancialStatementRepository extends BaseRepository<FinancialStatementEntity> {
    constructor(
        @InjectRepository(FinancialStatementEntity)
        financialStatementRepository: Repository<FinancialStatementEntity>,
    ) {
        super(financialStatementRepository)
    }
}
