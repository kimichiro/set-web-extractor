import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { JsonContains, ObjectId, Raw, Repository } from 'typeorm'
import { SetApiRawDataType } from '../entity/enum.entity'
import { SetApiRawDataEntity } from '../entity/set-api-raw-data.entity'
import { BaseRepository } from './base.repository'

@Injectable()
export class SetApiRawDataRepository extends BaseRepository<SetApiRawDataEntity> {
    constructor(
        @InjectRepository(SetApiRawDataEntity)
        setApiRawDataRepository: Repository<SetApiRawDataEntity>,
    ) {
        super(setApiRawDataRepository)
    }

    async markExtracted(
        criteria:
            | string
            | string[]
            | number
            | number[]
            | Date
            | Date[]
            | ObjectId
            | ObjectId[],
    ): Promise<void> {
        await this.update(criteria, {
            isExtracted: true,
        })
    }

    async getStockList(): Promise<SetApiRawDataEntity[]> {
        return await this.find({
            where: {
                type: SetApiRawDataType.SetStockList,
                isExtracted: false,
            },
            order: {
                createdAt: 'DESC',
            },
        })
    }

    async getSymbolIndexList(symbol: string): Promise<SetApiRawDataEntity[]> {
        return await this.find({
            where: {
                type: SetApiRawDataType.SetStockSymbolIndexList,
                data: JsonContains({ symbol }),
                isExtracted: false,
            },
            order: {
                createdAt: 'DESC',
            },
        })
    }

    async getSymbolRelatedProductO(
        symbol: string,
    ): Promise<SetApiRawDataEntity[]> {
        return await this.find({
            where: {
                type: SetApiRawDataType.SetStockSymbolRelatedProductO,
                data: JsonContains({ symbol }),
                isExtracted: false,
            },
            order: {
                createdAt: 'DESC',
            },
        })
    }

    async getSymbolRelatedProductW(
        symbol: string,
    ): Promise<SetApiRawDataEntity[]> {
        return await this.find({
            where: {
                type: SetApiRawDataType.SetStockSymbolRelatedProductW,
                data: JsonContains({ symbol }),
                isExtracted: false,
            },
            order: {
                createdAt: 'DESC',
            },
        })
    }

    async getFinancialStatementBalanceSheet(
        symbol: string,
    ): Promise<SetApiRawDataEntity[]> {
        return await this.find({
            where: {
                type: SetApiRawDataType.SetFactsheetSymbolFinancialStatementBalanceSheet,
                data: Raw(alias => `${alias} @> '[{"symbol":"${symbol}"}]'`),
                isExtracted: false,
            },
            order: {
                createdAt: 'DESC',
            },
        })
    }

    async getFinancialStatementIncomeStatement(
        symbol: string,
    ): Promise<SetApiRawDataEntity[]> {
        return await this.find({
            where: {
                type: SetApiRawDataType.SetFactsheetSymbolFinancialStatementIncomeStatement,
                data: Raw(alias => `${alias} @> '[{"symbol":"${symbol}"}]'`),
                isExtracted: false,
            },
            order: {
                createdAt: 'DESC',
            },
        })
    }

    async getFinancialStatementCashFlow(
        symbol: string,
    ): Promise<SetApiRawDataEntity[]> {
        return await this.find({
            where: {
                type: SetApiRawDataType.SetFactsheetSymbolFinancialStatementCashFlow,
                data: Raw(alias => `${alias} @> '[{"symbol":"${symbol}"}]'`),
                isExtracted: false,
            },
            order: {
                createdAt: 'DESC',
            },
        })
    }

    async getFinancialRatio(symbol: string): Promise<SetApiRawDataEntity[]> {
        return await this.find({
            where: {
                type: SetApiRawDataType.SetFactsheetSymbolFinancialRatio,
                data: Raw(alias => `${alias} @> '[{"symbol":"${symbol}"}]'`),
                isExtracted: false,
            },
            order: {
                createdAt: 'DESC',
            },
        })
    }

    async getTradingStat(symbol: string): Promise<SetApiRawDataEntity[]> {
        return await this.find({
            where: {
                type: SetApiRawDataType.SetFactsheetSymbolTradingStat,
                data: Raw(alias => `${alias} @> '[{"symbol":"${symbol}"}]'`),
                isExtracted: false,
            },
            order: {
                createdAt: 'DESC',
            },
        })
    }
}
