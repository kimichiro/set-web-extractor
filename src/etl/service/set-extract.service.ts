import { Injectable } from '@nestjs/common'
import { LogService } from '../../core/log/service/log.service'
import { SetApiRawDataRepository } from '../../database/repository/set-api-raw-data.repository'
import { SetExtractServiceDto as Dto } from './set-extract.service.dto'
import { SetHttpService } from './set-http.service'
import { SetApiRawDataType } from '../../database/entity/enum.entity'
import { SetHttpServiceDto } from './set-http.service.dto'

@Injectable()
export class SetExtractService {
    constructor(
        private readonly logService: LogService,
        private readonly setHttpService: SetHttpService,
        private readonly setApiRawDataRepository: SetApiRawDataRepository,
    ) {}

    async listSymbol(): Promise<Dto.ListSymbol.Result> {
        await this.setHttpService.productStockSearch({ language: 'en' })

        const stockList = await this.storeRawData(
            () => this.setHttpService.stockList(),
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

        await this.storeRawData(
            () =>
                this.setHttpService.stockSymbolRelatedProductOthers({
                    language: 'en',
                    stockQuote: symbol,
                }),
            SetApiRawDataType.SetStockSymbolRelatedProductO,
        )

        await this.storeRawData(
            () =>
                this.setHttpService.stockSymbolRelatedProductWarrants({
                    language: 'en',
                    stockQuote: symbol,
                }),
            SetApiRawDataType.SetStockSymbolRelatedProductW,
        )

        await this.storeRawData(
            () =>
                this.setHttpService.stockSymbolIndexList({
                    language: 'en',
                    stockQuote: symbol,
                }),
            SetApiRawDataType.SetStockSymbolIndexList,
        )

        await this.storeRawData(
            () =>
                this.setHttpService.stockSymbolCompanyHighlightFinancial({
                    language: 'en',
                    stockQuote: symbol,
                }),
            SetApiRawDataType.SetStockSymbolCompanyHighlightFinancialData,
        )

        await this.storeRawData(
            () =>
                this.setHttpService.stockSymbolProfile({
                    language: 'en',
                    stockQuote: symbol,
                }),
            SetApiRawDataType.SetStockSymbolProfile,
        )

        await this.storeRawData(
            () =>
                this.setHttpService.companySymbolProfile({
                    language: 'en',
                    stockQuote: symbol,
                }),
            SetApiRawDataType.SetCompanySymbolProfile,
        )

        await this.setHttpService.productStockSymbolFactsheet({
            language: 'en',
            stockQuote: symbol,
        }),
            await this.storeRawData(
                () =>
                    this.setHttpService.stockSymbolOverview({
                        language: 'en',
                        stockQuote: symbol,
                    }),
                SetApiRawDataType.SetStockSymbolOverview,
            )

        await this.storeRawData(
            () =>
                this.setHttpService.stockSymbolCorporateActionHistorical({
                    language: 'en',
                    stockQuote: symbol,
                }),
            SetApiRawDataType.SetStockSymbolCorporateActionHistorical,
        )

        await this.storeRawData(
            () =>
                this.setHttpService.stockSymbolChartQuotation({
                    stockQuote: symbol,
                    period: SetHttpServiceDto.Period.Last3Months,
                }),
            SetApiRawDataType.SetStockSymbolChartQuotation,
        )

        await this.storeRawData(
            () =>
                this.setHttpService.stockSymbolChartPerformance({
                    stockQuote: symbol,
                    period: SetHttpServiceDto.Period.Last3Months,
                }),
            SetApiRawDataType.SetStockSymbolChartPerformance,
        )

        await this.storeRawData(
            () =>
                this.setHttpService.stockSymbolHistoricalTrading({
                    language: 'en',
                    stockQuote: symbol,
                }),
            SetApiRawDataType.SetStockSymbolHistoricalTrading,
        )

        await this.storeRawData(
            () =>
                this.setHttpService.newsSymbolList({
                    language: 'en',
                    stockQuote: symbol,
                    limit: 20,
                }),
            SetApiRawDataType.SetNewsSymbolList,
        )

        await this.storeRawData(
            () => this.setHttpService.indexList(),
            SetApiRawDataType.SetIndexList,
        )

        await this.storeRawData(
            () =>
                this.setHttpService.factsheetSymbolPricePerformance({
                    language: 'en',
                    stockQuote: symbol,
                }),
            SetApiRawDataType.SetFactsheetSymbolPricePerformance,
        )

        await this.storeRawData(
            () =>
                this.setHttpService.factsheetSymbolProfile({
                    language: 'en',
                    stockQuote: symbol,
                }),
            SetApiRawDataType.SetFactsheetSymbolProfile,
        )

        await this.storeRawData(
            () =>
                this.setHttpService.factsheetSymbolTradingStat({
                    language: 'en',
                    stockQuote: symbol,
                }),
            SetApiRawDataType.SetFactsheetSymbolTradingStat,
        )

        await this.storeRawData(
            () =>
                this.setHttpService.factsheetSymbolFinancialStatementBalanceSheet(
                    {
                        language: 'en',
                        stockQuote: symbol,
                    },
                ),
            SetApiRawDataType.SetFactsheetSymbolFinancialStatementBalanceSheet,
        )

        await this.storeRawData(
            () =>
                this.setHttpService.factsheetSymbolFinancialStatementIncomeStatement(
                    {
                        language: 'en',
                        stockQuote: symbol,
                    },
                ),
            SetApiRawDataType.SetFactsheetSymbolFinancialStatementIncomeStatement,
        )

        await this.storeRawData(
            () =>
                this.setHttpService.factsheetSymbolFinancialStatementCashFlow({
                    language: 'en',
                    stockQuote: symbol,
                }),
            SetApiRawDataType.SetFactsheetSymbolFinancialStatementCashFlow,
        )

        await this.storeRawData(
            () =>
                this.setHttpService.factsheetSymbolFinancialRatio({
                    language: 'en',
                    stockQuote: symbol,
                }),
            SetApiRawDataType.SetFactsheetSymbolFinancialRatio,
        )

        await this.storeRawData(
            () =>
                this.setHttpService.factsheetSymbolFinancialGrowth({
                    language: 'en',
                    stockQuote: symbol,
                }),
            SetApiRawDataType.SetFactsheetSymbolFinancialGrowth,
        )

        await this.storeRawData(
            () =>
                this.setHttpService.factsheetSymbolCapitalMovement({
                    language: 'en',
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
