import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { BaseRepository } from './base.repository'
import { SymbolEntity } from '../entity/symbol.entity'
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity'

@Injectable()
export class SymbolRepository extends BaseRepository<SymbolEntity> {
    constructor(
        @InjectRepository(SymbolEntity)
        symbolRepository: Repository<SymbolEntity>,
    ) {
        super(symbolRepository)
    }

    async getSymbol(symbol: string): Promise<SymbolEntity | null> {
        return await this.findOne({
            where: {
                symbol,
            },
        })
    }

    async upsertSymbols(
        entityOrEntities:
            | QueryDeepPartialEntity<SymbolEntity>
            | QueryDeepPartialEntity<SymbolEntity>[],
    ): Promise<SymbolEntity[]> {
        await this.upsert(entityOrEntities, {
            conflictPaths: {
                market: true,
                symbol: true,
            },
        })

        return await this.find()
    }
}
