import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { BaseRepository } from './base.repository'
import { SetApiRawDataEntity } from '../entity/set-api-raw-data.entity'

@Injectable()
export class SetApiRawDataRepository extends BaseRepository<SetApiRawDataEntity> {
    constructor(
        @InjectRepository(SetApiRawDataEntity)
        setApiRawDataRepository: Repository<SetApiRawDataEntity>,
    ) {
        super(setApiRawDataRepository)
    }
}
