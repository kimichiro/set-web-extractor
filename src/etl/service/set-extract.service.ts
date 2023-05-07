import { Injectable } from '@nestjs/common'
import { SymbolEntity } from '../../database/entity/symbol.entity'
import { FinancialStatementRepository } from '../../database/repository/financial-statement.repository'
import { SetApiRawDataRepository } from '../../database/repository/set-api-raw-data.repository'
import { SymbolRepository } from '../../database/repository/symbol.repository'
import { DbContextService } from '../../database/service/db-context.service'
import { SetExtractServiceDto as Dto } from './set-extract.service.dto'
import { SetHttpServiceDto } from './set-http.service.dto'

@Injectable()
export class SetExtractService {
    constructor(
        private readonly dbContextService: DbContextService,
        private readonly setApiRawDataRepository: SetApiRawDataRepository,
        private readonly symbolRepository: SymbolRepository,
        private readonly financialStatementRepository: FinancialStatementRepository,
    ) {}

    async upsertSymbolList(): Promise<Dto.UpsertSymbolList.Result> {
        let symbolEntities: SymbolEntity[] = []

        await this.dbContextService.run(async () => {
            const defaultTransaction =
                this.dbContextService.getDefaultTransaction()

            await defaultTransaction.begin()

            const stockListResult =
                await this.setApiRawDataRepository.getStockList()
            if (stockListResult.length > 0) {
                const [rawData] = stockListResult
                const stockList =
                    rawData.data as SetHttpServiceDto.StockList.Result

                const partialEntities = stockList.securitySymbols.map(
                    security => ({
                        market: security.market.toUpperCase(),
                        symbol: security.symbol.toUpperCase(),
                        securityType: security.securityType?.toUpperCase(),
                        nameEn: security.nameEN,
                        nameTh: security.nameTH,
                        industry: security.industry?.toUpperCase(),
                        sector: security.sector?.toUpperCase(),
                    }),
                )
                symbolEntities = await this.symbolRepository.upsertSymbols(
                    partialEntities,
                )

                const setApiRawDataIds = stockListResult.map(({ id }) => id)
                await this.setApiRawDataRepository.markExtracted(
                    setApiRawDataIds,
                )
            }

            await defaultTransaction.commit()
        })

        return symbolEntities
    }

    async updateSymbol(
        params: Dto.UpdateSymbol.Params,
    ): Promise<Dto.UpdateSymbol.Result> {
        const { symbol } = params

        let symbolEntity: SymbolEntity

        await this.dbContextService.run(async () => {
            const defaultTransaction =
                this.dbContextService.getDefaultTransaction()

            await defaultTransaction.begin()

            symbolEntity = await this.symbolRepository.getSymbol(symbol)
            if (symbolEntity != null) {
                const symbolIndexListResult =
                    await this.setApiRawDataRepository.getSymbolIndexList(
                        symbol,
                    )
                if (symbolIndexListResult.length > 0) {
                    const [rawData] = symbolIndexListResult
                    const setStockIndexList =
                        rawData.data as SetHttpServiceDto.StockSymbolIndexList.Result

                    const indices = setStockIndexList.otherIndices.map(index =>
                        index.toUpperCase(),
                    )

                    await this.symbolRepository.update(symbolEntity.id, {
                        indices,
                    })
                }

                const symbolRelatedProductOResult =
                    await this.setApiRawDataRepository.getSymbolRelatedProductO(
                        symbol,
                    )
                const symbolRelatedProductWResult =
                    await this.setApiRawDataRepository.getSymbolRelatedProductW(
                        symbol,
                    )
                let relatedProducts: string[] = []
                if (symbolRelatedProductOResult.length > 0) {
                    const [rawData] = symbolRelatedProductOResult
                    const setStockSymbolRelatedProductO =
                        rawData.data as SetHttpServiceDto.StockSymbolRelatedProductOthers.Result

                    relatedProducts =
                        setStockSymbolRelatedProductO.relatedProducts.reduce(
                            (acc, p) => [...acc, p.symbol],
                            relatedProducts,
                        )
                }
                if (symbolRelatedProductWResult.length > 0) {
                    const [rawData] = symbolRelatedProductWResult
                    const setStockSymbolRelatedProductW =
                        rawData.data as SetHttpServiceDto.StockSymbolRelatedProductWarrants.Result

                    relatedProducts =
                        setStockSymbolRelatedProductW.relatedProducts.reduce(
                            (acc, p) => [...acc, p.symbol],
                            relatedProducts,
                        )
                }
                relatedProducts = relatedProducts.filter(s => s !== symbol)

                await this.symbolRepository.update(symbolEntity.id, {
                    relatedProducts,
                })

                const setApiRawDataIds = [
                    ...symbolIndexListResult.map(({ id }) => id),
                    ...symbolRelatedProductOResult.map(({ id }) => id),
                    ...symbolRelatedProductWResult.map(({ id }) => id),
                ]
                await this.setApiRawDataRepository.markExtracted(
                    setApiRawDataIds,
                )
            }

            await defaultTransaction.commit()
        })

        return symbolEntity
    }

    async upsertFinancialStatement(
        params: Dto.UpsertFinancialStatement.Params,
    ): Promise<Dto.UpsertFinancialStatement.Result> {
        const { symbol } = params

        let symbolEntity: SymbolEntity

        await this.dbContextService.run(async () => {
            const defaultTransaction =
                this.dbContextService.getDefaultTransaction()

            await defaultTransaction.begin()

            symbolEntity = await this.symbolRepository.getSymbol(symbol)
            if (symbolEntity != null) {
                const financialStatementBalanceSheetResult =
                    await this.setApiRawDataRepository.getFinancialStatementBalanceSheet(
                        symbol,
                    )
                const financialStatementIncomeStatementResult =
                    await this.setApiRawDataRepository.getFinancialStatementIncomeStatement(
                        symbol,
                    )
                const financialStatementCashFlowResult =
                    await this.setApiRawDataRepository.getFinancialStatementCashFlow(
                        symbol,
                    )

                let partialEntities = []
                if (financialStatementBalanceSheetResult.length > 0) {
                    const [rawData] = financialStatementBalanceSheetResult
                    const balanceSheets =
                        rawData.data as SetHttpServiceDto.FactsheetSymbolFinancialStatementBalanceSheet.Result

                    partialEntities = balanceSheets.reduce(
                        (entities, balanceSheet) =>
                            balanceSheet.accounts.reduce(
                                (acc, account) => [
                                    ...acc,
                                    {
                                        symbol: symbolEntity,
                                        beginAt: new Date(
                                            balanceSheet.beginDate,
                                        ),
                                        endAt: new Date(balanceSheet.endDate),
                                        year: balanceSheet.year,
                                        status: balanceSheet.status,
                                        accountCode: account.accountCode,
                                        accountName: account.accountName,
                                        isAdjusted: account.adjusted,
                                        amount: account.amount,
                                        divider: account.divider,
                                        format: account.format,
                                        level: account.level,
                                    },
                                ],
                                entities,
                            ),
                        partialEntities,
                    )
                }
                if (financialStatementIncomeStatementResult.length > 0) {
                    const [rawData] = financialStatementIncomeStatementResult
                    const incomeStatements =
                        rawData.data as SetHttpServiceDto.FactsheetSymbolFinancialStatementIncomeStatement.Result

                    partialEntities = incomeStatements.reduce(
                        (entities, incomeStatement) =>
                            incomeStatement.accounts.reduce(
                                (acc, account) => [
                                    ...acc,
                                    {
                                        symbol: symbolEntity,
                                        beginAt: new Date(
                                            incomeStatement.beginDate,
                                        ),
                                        endAt: new Date(
                                            incomeStatement.endDate,
                                        ),
                                        year: incomeStatement.year,
                                        status: incomeStatement.status,
                                        accountCode: account.accountCode,
                                        accountName: account.accountName,
                                        isAdjusted: account.adjusted,
                                        amount: account.amount,
                                        divider: account.divider,
                                        format: account.format,
                                        level: account.level,
                                    },
                                ],
                                entities,
                            ),
                        partialEntities,
                    )
                }
                if (financialStatementCashFlowResult.length > 0) {
                    const [rawData] = financialStatementCashFlowResult
                    const cashFlows =
                        rawData.data as SetHttpServiceDto.FactsheetSymbolFinancialStatementCashFlow.Result

                    partialEntities = cashFlows.reduce(
                        (entities, cashFlow) =>
                            cashFlow.accounts.reduce(
                                (acc, account) => [
                                    ...acc,
                                    {
                                        symbol: symbolEntity,
                                        beginAt: new Date(cashFlow.beginDate),
                                        endAt: new Date(cashFlow.endDate),
                                        year: cashFlow.year,
                                        status: cashFlow.status,
                                        accountCode: account.accountCode,
                                        accountName: account.accountName,
                                        isAdjusted: account.adjusted,
                                        amount: account.amount,
                                        divider: account.divider,
                                        format: account.format,
                                        level: account.level,
                                    },
                                ],
                                entities,
                            ),
                        partialEntities,
                    )
                }

                await Promise.all(
                    partialEntities.map(entity =>
                        this.financialStatementRepository.insert(entity),
                    ),
                )

                const setApiRawDataIds = [
                    ...financialStatementBalanceSheetResult.map(({ id }) => id),
                    ...financialStatementIncomeStatementResult.map(
                        ({ id }) => id,
                    ),
                    ...financialStatementCashFlowResult.map(({ id }) => id),
                ]
                await this.setApiRawDataRepository.markExtracted(
                    setApiRawDataIds,
                )
            }

            await defaultTransaction.commit()
        })

        return symbolEntity
    }
}
