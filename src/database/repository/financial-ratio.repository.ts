import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { FinancialRatioEntity } from '../entity/financial-ratio.entity'
import { BaseRepository } from './base.repository'

@Injectable()
export class FinancialRatioRepository extends BaseRepository<FinancialRatioEntity> {
    constructor(
        @InjectRepository(FinancialRatioEntity)
        tradingStatRepository: Repository<FinancialRatioEntity>,
    ) {
        super(tradingStatRepository)
    }
}
