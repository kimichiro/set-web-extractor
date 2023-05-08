import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { FinancialStatementEntity } from '../entity/financial-statement.entity'
import { BaseRepository } from './base.repository'

@Injectable()
export class FinancialStatementRepository extends BaseRepository<FinancialStatementEntity> {
    constructor(
        @InjectRepository(FinancialStatementEntity)
        financialStatementRepository: Repository<FinancialStatementEntity>,
    ) {
        super(financialStatementRepository)
    }
}
