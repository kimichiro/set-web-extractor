import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { TradingStatEntity } from '../entity/trading-stat.entity'
import { BaseRepository } from './base.repository'

@Injectable()
export class TradingStatRepository extends BaseRepository<TradingStatEntity> {
    constructor(
        @InjectRepository(TradingStatEntity)
        tradingStatRepository: Repository<TradingStatEntity>,
    ) {
        super(tradingStatRepository)
    }
}
