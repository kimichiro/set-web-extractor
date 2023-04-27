import { Injectable } from '@nestjs/common'
import { SetApiRawDataRepository } from '../../database/repository/set-api-raw-data.repository'
import { SetExtractServiceDto as Dto } from './set-extract.service.dto'
import { SetHttpService } from './set-http.service'
import { SetApiRawDataType } from '../../database/entity/enum.entity'
import { SetHttpServiceDto } from './set-http.service.dto'

@Injectable()
export class SetExtractService {
    constructor(
        private readonly setHttpService: SetHttpService,
        private readonly setApiRawDataRepository: SetApiRawDataRepository,
    ) {}

    async listSymbol(): Promise<Dto.ListSymbol.Result> {
        const language = 'en'

        await this.setHttpService.productStockSearch({ language })

        const stockList = await this.storeRawData(
            () => this.setHttpService.stockList({ language }),
            SetApiRawDataType.SetStockList,
        )

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

        await this.storeRawData(
            () =>
                this.setHttpService.stockSymbolRelatedProductOthers({
                    language,
                    stockQuote: symbol,
                }),
            SetApiRawDataType.SetStockSymbolRelatedProductO,
        )

        await this.storeRawData(
            () =>
                this.setHttpService.stockSymbolRelatedProductWarrants({
                    language,
                    stockQuote: symbol,
                }),
            SetApiRawDataType.SetStockSymbolRelatedProductW,
        )

        await this.storeRawData(
            () =>
                this.setHttpService.stockSymbolIndexList({
                    language,
                    stockQuote: symbol,
                }),
            SetApiRawDataType.SetStockSymbolIndexList,
        )

        await this.storeRawData(
            () =>
                this.setHttpService.stockSymbolCompanyHighlightFinancial({
                    language,
                    stockQuote: symbol,
                }),
            SetApiRawDataType.SetStockSymbolCompanyHighlightFinancialData,
        )

        await this.storeRawData(
            () =>
                this.setHttpService.stockSymbolProfile({
                    language,
                    stockQuote: symbol,
                }),
            SetApiRawDataType.SetStockSymbolProfile,
        )

        await this.storeRawData(
            () =>
                this.setHttpService.companySymbolProfile({
                    language,
                    stockQuote: symbol,
                }),
            SetApiRawDataType.SetCompanySymbolProfile,
        )

        await this.setHttpService.productStockSymbolFactsheet({
            language,
            stockQuote: symbol,
        })

        await this.storeRawData(
            () =>
                this.setHttpService.stockSymbolOverview({
                    language,
                    stockQuote: symbol,
                }),
            SetApiRawDataType.SetStockSymbolOverview,
        )

        await this.storeRawData(
            () =>
                this.setHttpService.stockSymbolCorporateActionHistorical({
                    language,
                    stockQuote: symbol,
                }),
            SetApiRawDataType.SetStockSymbolCorporateActionHistorical,
        )

        await this.storeRawData(
            () =>
                this.setHttpService.stockSymbolChartQuotation({
                    language,
                    stockQuote: symbol,
                    period: SetHttpServiceDto.Period.Last3Months,
                }),
            SetApiRawDataType.SetStockSymbolChartQuotation,
        )

        await this.storeRawData(
            () =>
                this.setHttpService.stockSymbolChartPerformance({
                    language,
                    stockQuote: symbol,
                    period: SetHttpServiceDto.Period.Last3Months,
                }),
            SetApiRawDataType.SetStockSymbolChartPerformance,
        )

        await this.storeRawData(
            () =>
                this.setHttpService.stockSymbolHistoricalTrading({
                    language,
                    stockQuote: symbol,
                }),
            SetApiRawDataType.SetStockSymbolHistoricalTrading,
        )

        await this.storeRawData(
            () =>
                this.setHttpService.newsSymbolList({
                    language,
                    stockQuote: symbol,
                    limit: 20,
                }),
            SetApiRawDataType.SetNewsSymbolList,
        )

        await this.storeRawData(
            () => this.setHttpService.indexList({ language }),
            SetApiRawDataType.SetIndexList,
        )

        await this.storeRawData(
            () =>
                this.setHttpService.factsheetSymbolPricePerformance({
                    language,
                    stockQuote: symbol,
                }),
            SetApiRawDataType.SetFactsheetSymbolPricePerformance,
        )

        await this.storeRawData(
            () =>
                this.setHttpService.factsheetSymbolProfile({
                    language,
                    stockQuote: symbol,
                }),
            SetApiRawDataType.SetFactsheetSymbolProfile,
        )

        await this.storeRawData(
            () =>
                this.setHttpService.factsheetSymbolTradingStat({
                    language,
                    stockQuote: symbol,
                }),
            SetApiRawDataType.SetFactsheetSymbolTradingStat,
        )

        await this.storeRawData(
            () =>
                this.setHttpService.factsheetSymbolFinancialStatementBalanceSheet(
                    {
                        language,
                        stockQuote: symbol,
                    },
                ),
            SetApiRawDataType.SetFactsheetSymbolFinancialStatementBalanceSheet,
        )

        await this.storeRawData(
            () =>
                this.setHttpService.factsheetSymbolFinancialStatementIncomeStatement(
                    {
                        language,
                        stockQuote: symbol,
                    },
                ),
            SetApiRawDataType.SetFactsheetSymbolFinancialStatementIncomeStatement,
        )

        await this.storeRawData(
            () =>
                this.setHttpService.factsheetSymbolFinancialStatementCashFlow({
                    language,
                    stockQuote: symbol,
                }),
            SetApiRawDataType.SetFactsheetSymbolFinancialStatementCashFlow,
        )

        await this.storeRawData(
            () =>
                this.setHttpService.factsheetSymbolFinancialRatio({
                    language,
                    stockQuote: symbol,
                }),
            SetApiRawDataType.SetFactsheetSymbolFinancialRatio,
        )

        await this.storeRawData(
            () =>
                this.setHttpService.factsheetSymbolFinancialGrowth({
                    language,
                    stockQuote: symbol,
                }),
            SetApiRawDataType.SetFactsheetSymbolFinancialGrowth,
        )

        await this.storeRawData(
            () =>
                this.setHttpService.factsheetSymbolCapitalMovement({
                    language,
                    stockQuote: symbol,
                }),
            SetApiRawDataType.SetFactsheetSymbolCapitalMovement,
        )

        return { symbol }
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
