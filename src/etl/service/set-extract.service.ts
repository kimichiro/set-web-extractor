import { Injectable } from '@nestjs/common'
import { LogService } from '../../core/log/service/log.service'
import { SetApiRawDataRepository } from '../../database/repository/set-api-raw-data.repository'
import { SetExtractServiceDto as Dto } from './set-extract.service.dto'
import { SetHttpService } from './set-http.service'
import { SetApiRawDataType } from '../../database/entity/enum.entity'

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
