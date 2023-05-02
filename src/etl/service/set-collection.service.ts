import { Injectable } from '@nestjs/common'
import { SetApiRawDataType } from '../../database/entity/enum.entity'
import { SetApiRawDataRepository } from '../../database/repository/set-api-raw-data.repository'
import { DbContextService } from '../../database/service/db-context.service'
import { SetCollectionServiceDto as Dto } from './set-collection.service.dto'
import { SetHttpService } from './set-http.service'
import { SetHttpServiceDto } from './set-http.service.dto'

@Injectable()
export class SetCollectionService {
    constructor(
        private readonly dbContextService: DbContextService,
        private readonly setHttpService: SetHttpService,
        private readonly setApiRawDataRepository: SetApiRawDataRepository,
    ) {}

    async listSymbol(): Promise<Dto.ListSymbol.Result> {
        const language = 'en'

        await this.setHttpService.productStockSearch({ language })

        const stockList = await this.setHttpService.stockList({ language })

        const symbols = stockList.securitySymbols.map(s => s.symbol)
        return {
            symbols,
            count: symbols.length,
        }
    }

    async fetchSymbol(
        params: Dto.FetchSymbol.Params,
    ): Promise<Dto.FetchSymbol.Result> {
        const { symbol } = params

        const language = 'en'

        await this.setHttpService.productStockSymbolPrice({
            language,
            stockQuote: symbol,
        })

        const result = await this.setHttpService.stockSymbolIndexList({
            language,
            stockQuote: symbol,
        })

        return {
            symbol: result.symbol.toUpperCase(),
            market: result.market.toUpperCase(),
            industry: result.industry.toUpperCase(),
            sector: result.sector.toUpperCase(),
            indices: result.otherIndices.map(index => index.toUpperCase()),
            asOfDate: result.asOfDate.toUpperCase(),
        }
    }

    async loadSymbolList(): Promise<Dto.LoadSymbolList.Result> {
        const language = 'en'

        let stockList: Dto.LoadSymbolList.Result

        await this.dbContextService.run(async () => {
            const defaultTransaction =
                this.dbContextService.getDefaultTransaction()

            await defaultTransaction.begin()

            await this.setHttpService.productStockSearch({ language })

            stockList = await this.storeRawData(
                () => this.setHttpService.stockList({ language }),
                SetApiRawDataType.SetStockList,
            )

            await defaultTransaction.commit()
        })

        return stockList
    }

    async loadSymbolRawData(
        params: Dto.LoadSymbolRawData.Params,
    ): Promise<Dto.LoadSymbolRawData.Result> {
        const { symbol: stockQuote } = params

        const language = 'en'

        let result: SetHttpServiceDto.FactsheetSymbolProfile.Result

        await this.dbContextService.run(async () => {
            const defaultTransaction =
                this.dbContextService.getDefaultTransaction()

            await defaultTransaction.begin()

            await this.setHttpService.productStockSymbolPrice({
                language,
                stockQuote,
            })

            await this.storeRawData(
                () =>
                    this.setHttpService.stockSymbolRelatedProductOthers({
                        language,
                        stockQuote,
                    }),
                SetApiRawDataType.SetStockSymbolRelatedProductO,
            )

            await this.storeRawData(
                () =>
                    this.setHttpService.stockSymbolRelatedProductWarrants({
                        language,
                        stockQuote,
                    }),
                SetApiRawDataType.SetStockSymbolRelatedProductW,
            )

            await this.storeRawData(
                () =>
                    this.setHttpService.stockSymbolIndexList({
                        language,
                        stockQuote,
                    }),
                SetApiRawDataType.SetStockSymbolIndexList,
            )

            await this.storeRawData(
                () =>
                    this.setHttpService.stockSymbolCompanyHighlightFinancial({
                        language,
                        stockQuote,
                    }),
                SetApiRawDataType.SetStockSymbolCompanyHighlightFinancialData,
            )

            await this.storeRawData(
                () =>
                    this.setHttpService.stockSymbolCompanyHighlightFinancial({
                        language,
                        stockQuote,
                    }),
                SetApiRawDataType.SetStockSymbolCompanyHighlightFinancialData,
            )

            await this.storeRawData(
                () =>
                    this.setHttpService.stockSymbolProfile({
                        language,
                        stockQuote,
                    }),
                SetApiRawDataType.SetStockSymbolProfile,
            )

            await this.storeRawData(
                () =>
                    this.setHttpService.companySymbolProfile({
                        language,
                        stockQuote,
                    }),
                SetApiRawDataType.SetCompanySymbolProfile,
            )

            await this.setHttpService.productStockSymbolFactsheet({
                language,
                stockQuote,
            })

            await this.storeRawData(
                () =>
                    this.setHttpService.stockSymbolCorporateActionHistorical({
                        language,
                        stockQuote,
                    }),
                SetApiRawDataType.SetStockSymbolCorporateActionHistorical,
            )

            await this.storeRawData(
                () =>
                    this.setHttpService.factsheetSymbolPricePerformance({
                        language,
                        stockQuote,
                    }),
                SetApiRawDataType.SetFactsheetSymbolPricePerformance,
            )

            result = await this.storeRawData(
                () =>
                    this.setHttpService.factsheetSymbolProfile({
                        language,
                        stockQuote,
                    }),
                SetApiRawDataType.SetFactsheetSymbolProfile,
            )

            await this.storeRawData(
                () =>
                    this.setHttpService.factsheetSymbolTradingStat({
                        language,
                        stockQuote,
                    }),
                SetApiRawDataType.SetFactsheetSymbolTradingStat,
            )

            await this.storeRawData(
                () =>
                    this.setHttpService.factsheetSymbolFinancialStatementBalanceSheet(
                        { language, stockQuote },
                    ),
                SetApiRawDataType.SetFactsheetSymbolFinancialStatementBalanceSheet,
            )

            await this.storeRawData(
                () =>
                    this.setHttpService.factsheetSymbolFinancialStatementIncomeStatement(
                        { language, stockQuote },
                    ),
                SetApiRawDataType.SetFactsheetSymbolFinancialStatementIncomeStatement,
            )

            await this.storeRawData(
                () =>
                    this.setHttpService.factsheetSymbolFinancialStatementCashFlow(
                        {
                            language,
                            stockQuote,
                        },
                    ),
                SetApiRawDataType.SetFactsheetSymbolFinancialStatementCashFlow,
            )

            await this.storeRawData(
                () =>
                    this.setHttpService.factsheetSymbolFinancialRatio({
                        language,
                        stockQuote,
                    }),
                SetApiRawDataType.SetFactsheetSymbolFinancialRatio,
            )

            await this.storeRawData(
                () =>
                    this.setHttpService.factsheetSymbolFinancialGrowth({
                        language,
                        stockQuote,
                    }),
                SetApiRawDataType.SetFactsheetSymbolFinancialGrowth,
            )

            await this.storeRawData(
                () =>
                    this.setHttpService.factsheetSymbolCapitalMovement({
                        language,
                        stockQuote,
                    }),
                SetApiRawDataType.SetFactsheetSymbolCapitalMovement,
            )

            await defaultTransaction.commit()
        })

        return {
            symbol: result.symbol.toUpperCase(),
            name: result.name,
            market: result.market.toUpperCase(),
            industry: result.industry.toUpperCase(),
            sector: result.sector.toUpperCase(),
        }
    }

    private async storeRawData<T extends object>(
        getRawData: () => Promise<T>,
        type: SetApiRawDataType,
    ): Promise<T> {
        const data = await getRawData()

        await this.setApiRawDataRepository.insert({
            type,
            data,
            url: this.setHttpService.getLastRequestUrl(),
            isExtracted: false,
        })

        return data
    }
}
