import { Injectable } from '@nestjs/common'
import { FinancialStatementRepository } from '../../database/repository/financial-statement.repository'
import { SymbolRepository } from '../../database/repository/symbol.repository'
import { DbContextService } from '../../database/service/db-context.service'
import { SetApiTransformServiceDto as Dto } from './set-transform.service.dto'
import { SymbolEntity } from '../../database/entity/symbol.entity'
import { IsNull, Not } from 'typeorm'
import { FinancialRatioRepository } from '../../database/repository/financial-ratio.repository'
import { TradingStatRepository } from '../../database/repository/trading-stat.repository'

@Injectable()
export class SetTransformService {
    constructor(
        private readonly dbContextService: DbContextService,
        private readonly symbolRepository: SymbolRepository,
        private readonly financialStatementRepository: FinancialStatementRepository,
        private readonly financialRatioRepository: FinancialRatioRepository,
        private readonly tradingStatRepository: TradingStatRepository,
    ) {}

    async getPendingSymbolList(): Promise<Dto.GetPendingSymbolList.Result> {
        const symbolEntities = await this.symbolRepository.find({
            where: {
                financialStatements: {
                    beginAt: Not(IsNull()),
                    endAt: Not(IsNull()),
                    accountCode: Not(IsNull()),
                    year: Not(IsNull()),
                    status: Not(IsNull()),
                },
            },
            relations: {
                financialStatements: true,
            },
        })

        return symbolEntities
    }

    async upsertBasicInfo(
        params: Dto.UpsertBasicInfo.Params,
    ): Promise<Dto.UpsertBasicInfo.Result> {
        const { symbol } = params

        let symbolEntity: SymbolEntity

        await this.dbContextService.run(async () => {
            const defaultTransaction =
                this.dbContextService.getDefaultTransaction()

            await defaultTransaction.begin()

            const financialStatementEntities =
                await this.financialStatementRepository.find({
                    where: {
                        symbol: { symbol },
                    },
                    order: {
                        updatedAt: 'ASC',
                        beginAt: 'ASC',
                        endAt: 'ASC',
                    },
                })
            const financialRatioEntities =
                await this.financialRatioRepository.find({
                    where: {
                        symbol: { symbol },
                    },
                    order: {
                        updatedAt: 'ASC',
                        beginAt: 'ASC',
                        endAt: 'ASC',
                    },
                })
            const tradingStatEntities = await this.tradingStatRepository.find({
                where: {
                    symbol: { symbol },
                },
                order: {
                    updatedAt: 'ASC',
                    dataDate: 'ASC',
                    financialDate: 'ASC',
                },
            })

            const entitiesMap = new Map()
            if (financialStatementEntities.length > 0) {
                financialStatementEntities.forEach(financialStatement => {
                    const entity = entitiesMap.get(financialStatement.year) || {
                        year: financialStatement.year,
                    }

                    if (financialStatement.accountCode === '607') {
                        entity.totalAssets =
                            financialStatement.amount *
                            financialStatement.divider
                    }
                    if (financialStatement.accountCode === '613') {
                        entity.totalLiabilities =
                            financialStatement.amount *
                            financialStatement.divider
                    }
                    if (financialStatement.accountCode === '622') {
                        entity.shareHolderEquities =
                            financialStatement.amount *
                            financialStatement.divider
                    }
                    if (financialStatement.accountCode === '626') {
                        entity.totalRevenues =
                            financialStatement.amount *
                            financialStatement.divider
                    }
                    if (financialStatement.accountCode === '633') {
                        entity.netProfits =
                            financialStatement.amount *
                            financialStatement.divider
                    }

                    entitiesMap.set(financialStatement.year, entity)
                })
            }
            if (financialRatioEntities.length > 0) {
                financialRatioEntities.forEach(financialRatio => {
                    const entity = entitiesMap.get(financialRatio.year) || {
                        year: financialRatio.year,
                    }

                    if (financialRatio.accountName === 'ROE (%)') {
                        entity.returnOnEquity = financialRatio.value
                    }
                    if (
                        financialRatio.accountName === 'Net Profit Margin (%)'
                    ) {
                        entity.netProfitMargin = financialRatio.value
                    }

                    entitiesMap.set(financialRatio.year, entity)
                })
            }
            if (tradingStatEntities.length > 0) {
                tradingStatEntities.forEach(tradingStat => {
                    const entity = entitiesMap.get(tradingStat.year) || {
                        year: tradingStat.year,
                    }

                    entity.priceToEarning = tradingStat.pe
                    entity.priceToBookingValue = tradingStat.pbv

                    entitiesMap.set(tradingStat.year, entity)
                })
            }

            const entities = entitiesMap.values()
            // TODO: store data for dashboard

            // await this.financialStatementRepository.delete(
            //     financialStatementEntities.map(({ id }) => id),
            // )
            // await this.financialRatioRepository.delete(
            //     financialRatioEntities.map(({ id }) => id),
            // )
            // await this.tradingStatRepository.delete(
            //     tradingStatEntities.map(({ id }) => id),
            // )

            await defaultTransaction.commit()
        })

        return symbolEntity
    }
}
