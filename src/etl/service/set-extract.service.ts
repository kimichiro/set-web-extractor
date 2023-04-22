import { Injectable } from '@nestjs/common'
import { SetExtractServiceDto as Dto } from './set-extract.service.dto'
import { LogService } from 'src/core/log/service/log.service'
import { SetHttpService } from './set-http.service'

@Injectable()
export class SetExtractService {
    constructor(
        private readonly logService: LogService,
        private readonly setHttpService: SetHttpService,
    ) {}

    async retreiveData(): Promise<Dto.RetreiveData.Result> {
        await this.setHttpService.productStockSearch({ language: 'en' })

        const stockList = await this.setHttpService.stockList()

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
                    this.logService.info(
                        JSON.stringify(warrantProducts),
                        SetExtractService.name,
                    )

                    const indices =
                        await this.setHttpService.stockSymbolIndexList({
                            language: 'en',
                            stockQuote: symbol,
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
                    this.logService.info(
                        JSON.stringify(companyHighlightFinancials),
                        SetExtractService.name,
                    )

                    const stockSymbolProfile =
                        await this.setHttpService.stockSymbolProfile({
                            language: 'en',
                            stockQuote: symbol,
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
                    this.logService.info(
                        JSON.stringify(companySymbolProfile),
                        SetExtractService.name,
                    )
                }),
        )
    }
}
