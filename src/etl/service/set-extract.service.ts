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

    async retreiveData(): Promise<Dto.RetreiveData.Result> {
        await this.setHttpService.productStockSearch({ language: 'en' })

        const stockList = await this.setHttpService.stockList()

        await this.setApiRawDataRepository.insert({
            type: SetApiRawDataType.SetStockList,
            url: this.setHttpService.getLastRequestUrl(),
            data: stockList,
            isExtracted: false,
        })

        const equityStocks = stockList.securitySymbols.filter(
            s => s.securityType === 'S',
        )

        this.logService.info(
            `Stock listing - found ${equityStocks.length} symbol(s)`,
            SetExtractService.name,
        )

        await Promise.all(
            equityStocks
                .filter((_, index) => index === 50)
                .map(async equityStock => {
                    const { symbol } = equityStock

                    this.logService.info(
                        JSON.stringify(equityStock),
                        SetExtractService.name,
                    )

                    const otherProducts =
                        await this.setHttpService.stockSymbolRelatedProductOthers(
                            {
                                language: 'en',
                                stockQuote: symbol,
                            },
                        )
                    await this.setApiRawDataRepository.insert({
                        type: SetApiRawDataType.SetStockSymbolRelatedProductO,
                        url: this.setHttpService.getLastRequestUrl(),
                        data: otherProducts,
                        isExtracted: false,
                    })
                    this.logService.info(
                        JSON.stringify(otherProducts),
                        SetExtractService.name,
                    )

                    const warrantProducts =
                        await this.setHttpService.stockSymbolRelatedProductWarrants(
                            {
                                language: 'en',
                                stockQuote: symbol,
                            },
                        )
                    await this.setApiRawDataRepository.insert({
                        type: SetApiRawDataType.SetStockSymbolRelatedProductW,
                        url: this.setHttpService.getLastRequestUrl(),
                        data: warrantProducts,
                        isExtracted: false,
                    })
                    this.logService.info(
                        JSON.stringify(warrantProducts),
                        SetExtractService.name,
                    )

                    const indices =
                        await this.setHttpService.stockSymbolIndexList({
                            language: 'en',
                            stockQuote: symbol,
                        })
                    await this.setApiRawDataRepository.insert({
                        type: SetApiRawDataType.SetStockSymbolIndexList,
                        url: this.setHttpService.getLastRequestUrl(),
                        data: indices,
                        isExtracted: false,
                    })
                    this.logService.info(
                        JSON.stringify(indices),
                        SetExtractService.name,
                    )

                    const companyHighlightFinancials =
                        await this.setHttpService.stockSymbolCompanyHighlightFinancial(
                            {
                                language: 'en',
                                stockQuote: symbol,
                            },
                        )
                    await this.setApiRawDataRepository.insert({
                        type: SetApiRawDataType.SetStockSymbolCompanyHighlightFinancialData,
                        url: this.setHttpService.getLastRequestUrl(),
                        data: companyHighlightFinancials,
                        isExtracted: false,
                    })
                    this.logService.info(
                        JSON.stringify(companyHighlightFinancials),
                        SetExtractService.name,
                    )

                    const stockSymbolProfile =
                        await this.setHttpService.stockSymbolProfile({
                            language: 'en',
                            stockQuote: symbol,
                        })
                    await this.setApiRawDataRepository.insert({
                        type: SetApiRawDataType.SetStockSymbolProfile,
                        url: this.setHttpService.getLastRequestUrl(),
                        data: stockSymbolProfile,
                        isExtracted: false,
                    })
                    this.logService.info(
                        JSON.stringify(stockSymbolProfile),
                        SetExtractService.name,
                    )

                    const companySymbolProfile =
                        await this.setHttpService.companySymbolProfile({
                            language: 'en',
                            stockQuote: symbol,
                        })
                    await this.setApiRawDataRepository.insert({
                        type: SetApiRawDataType.SetCompanySymbolProfile,
                        url: this.setHttpService.getLastRequestUrl(),
                        data: companySymbolProfile,
                        isExtracted: false,
                    })
                    this.logService.info(
                        JSON.stringify(companySymbolProfile),
                        SetExtractService.name,
                    )
                }),
        )
    }
}
