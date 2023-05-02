import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { BaseRepository } from './base.repository'
import { SymbolEntity } from '../entity/symbol.entity'

@Injectable()
export class SymbolRepository extends BaseRepository<SymbolEntity> {
    constructor(
        @InjectRepository(SymbolEntity)
        symbolRepository: Repository<SymbolEntity>,
    ) {
        super(symbolRepository)
    }
}
