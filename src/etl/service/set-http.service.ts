import { HttpService } from '@nestjs/axios'
import {
    HttpException,
    Injectable,
    InternalServerErrorException,
} from '@nestjs/common'
import { AxiosError, Method } from 'axios'
import { parse } from 'set-cookie-parser'
import { LogService } from '../../core/log/service/log.service'
import { SetHttpServiceDto as Dto } from './set-http.service.dto'

@Injectable()
export class SetHttpService {
    private cookie: string
    private lastRequestUrl: string

    constructor(
        private readonly logService: LogService,
        private readonly httpService: HttpService,
    ) {
        this.cookie = null
        this.lastRequestUrl = null
    }

    getLastRequestUrl(): string {
        return this.lastRequestUrl
    }

    async productStockSearch(
        params: Dto.ProductStockSearch.Params,
    ): Promise<Dto.ProductStockSearch.Result> {
        const { language } = params

        await this.httpRequest<string>(
            Dto.ProductStockSearch.Endpoint(language),
            'GET',
        )
    }

    async productStockSymbolPrice(
        params: Dto.ProductStockSymbolPrice.Params,
    ): Promise<Dto.ProductStockSymbolPrice.Result> {
        const { language, stockQuote } = params

        await this.httpRequest<string>(
            Dto.ProductStockSymbolPrice.Endpoint(language, stockQuote),
            'GET',
        )
    }

    async productStockSymbolFactsheet(
        params: Dto.ProductStockSymbolFactsheet.Params,
    ): Promise<Dto.ProductStockSymbolFactsheet.Result> {
        const { language, stockQuote } = params

        await this.httpRequest<string>(
            Dto.ProductStockSymbolFactsheet.Endpoint(language, stockQuote),
            'GET',
        )
    }

    async stockList(
        params: Dto.StockList.Params,
    ): Promise<Dto.StockList.Result> {
        const { language } = params

        const result = await this.httpRequest<Dto.StockList.Result>(
            Dto.StockList.Endpoint(),
            'GET',
            {
                referer: Dto.ProductStockSearch.Endpoint(language),
            },
        )
        return result
    }

    async stockSymbolOverview(
        params: Dto.StockSymbolOverview.Params,
    ): Promise<Dto.StockSymbolOverview.Result> {
        const { language, stockQuote } = params

        const result = await this.httpRequest<Dto.StockSymbolOverview.Result>(
            Dto.StockSymbolOverview.Endpoint(language, stockQuote),
            'GET',
            {
                referer: Dto.ProductStockSymbolFactsheet.Endpoint(
                    language,
                    stockQuote,
                ),
            },
        )

        return result
    }

    async stockSymbolRelatedProductOthers(
        params: Dto.StockSymbolRelatedProductOthers.Params,
    ): Promise<Dto.StockSymbolRelatedProductOthers.Result> {
        const { language, stockQuote } = params

        const result =
            await this.httpRequest<Dto.StockSymbolRelatedProductOthers.Result>(
                Dto.StockSymbolRelatedProductOthers.Endpoint(
                    language,
                    stockQuote,
                ),
                'GET',
                {
                    referer: Dto.ProductStockSymbolPrice.Endpoint(
                        language,
                        stockQuote,
                    ),
                },
            )
        return result
    }

    async stockSymbolRelatedProductWarrants(
        params: Dto.StockSymbolRelatedProductWarrants.Params,
    ): Promise<Dto.StockSymbolRelatedProductWarrants.Result> {
        const { language, stockQuote } = params

        const result =
            await this.httpRequest<Dto.StockSymbolRelatedProductWarrants.Result>(
                Dto.StockSymbolRelatedProductWarrants.Endpoint(
                    language,
                    stockQuote,
                ),
                'GET',
                {
                    referer: Dto.ProductStockSymbolPrice.Endpoint(
                        language,
                        stockQuote,
                    ),
                },
            )
        return result
    }

    async stockSymbolIndexList(
        params: Dto.StockSymbolIndexList.Params,
    ): Promise<Dto.StockSymbolIndexList.Result> {
        const { language, stockQuote } = params

        const result = await this.httpRequest<Dto.StockSymbolIndexList.Result>(
            Dto.StockSymbolIndexList.Endpoint(language, stockQuote),
            'GET',
            {
                referer: Dto.ProductStockSymbolPrice.Endpoint(
                    language,
                    stockQuote,
                ),
            },
        )
        return result
    }

    async stockSymbolCompanyHighlightFinancial(
        params: Dto.StockSymbolCompanyHighlightFinancial.Params,
    ): Promise<Dto.StockSymbolCompanyHighlightFinancial.Result> {
        const { language, stockQuote } = params

        const result =
            await this.httpRequest<Dto.StockSymbolCompanyHighlightFinancial.Result>(
                Dto.StockSymbolCompanyHighlightFinancial.Endpoint(
                    language,
                    stockQuote,
                ),
                'GET',
                {
                    referer: Dto.ProductStockSymbolPrice.Endpoint(
                        language,
                        stockQuote,
                    ),
                },
            )
        return result
    }

    async stockSymbolProfile(
        params: Dto.StockSymbolProfile.Params,
    ): Promise<Dto.StockSymbolProfile.Result> {
        const { language, stockQuote } = params

        const result = await this.httpRequest<Dto.StockSymbolProfile.Result>(
            Dto.StockSymbolProfile.Endpoint(language, stockQuote),
            'GET',
            {
                referer: Dto.ProductStockSymbolPrice.Endpoint(
                    language,
                    stockQuote,
                ),
            },
        )
        return result
    }

    async stockSymbolCorporateActionHistorical(
        params: Dto.StockSymbolCorporateActionHistorical.Params,
    ): Promise<Dto.StockSymbolCorporateActionHistorical.Result> {
        const { language, stockQuote } = params

        const result =
            await this.httpRequest<Dto.StockSymbolCorporateActionHistorical.Result>(
                Dto.StockSymbolCorporateActionHistorical.Endpoint(
                    language,
                    stockQuote,
                ),
                'GET',
                {
                    referer: Dto.ProductStockSymbolFactsheet.Endpoint(
                        language,
                        stockQuote,
                    ),
                },
            )

        return result
    }

    async stockSymbolChartQuotation(
        params: Dto.StockSymbolChartQuotation.Params,
    ): Promise<Dto.StockSymbolChartQuotation.Result> {
        const { language, stockQuote, period } = params

        const result =
            await this.httpRequest<Dto.StockSymbolChartQuotation.Result>(
                Dto.StockSymbolChartQuotation.Endpoint(stockQuote, period),
                'GET',
                {
                    referer: Dto.ProductStockSymbolFactsheet.Endpoint(
                        language,
                        stockQuote,
                    ),
                },
            )

        return result
    }

    async stockSymbolChartPerformance(
        params: Dto.StockSymbolChartPerformance.Params,
    ): Promise<Dto.StockSymbolChartPerformance.Result> {
        const { language, stockQuote, period } = params

        const result =
            await this.httpRequest<Dto.StockSymbolChartPerformance.Result>(
                Dto.StockSymbolChartPerformance.Endpoint(stockQuote, period),
                'GET',
                {
                    referer: Dto.ProductStockSymbolFactsheet.Endpoint(
                        language,
                        stockQuote,
                    ),
                },
            )

        return result
    }

    async stockSymbolHistoricalTrading(
        params: Dto.StockSymbolHistoricalTrading.Params,
    ): Promise<Dto.StockSymbolHistoricalTrading.Result> {
        const { language, stockQuote } = params

        const result =
            await this.httpRequest<Dto.StockSymbolHistoricalTrading.Result>(
                Dto.StockSymbolHistoricalTrading.Endpoint(language, stockQuote),
                'GET',
                {
                    referer: Dto.ProductStockSymbolFactsheet.Endpoint(
                        language,
                        stockQuote,
                    ),
                },
            )

        return result
    }

    async newsSymbolList(
        params: Dto.NewsSymbolList.Params,
    ): Promise<Dto.NewsSymbolList.Result> {
        const { language, stockQuote, limit } = params

        const result = await this.httpRequest<Dto.NewsSymbolList.Result>(
            Dto.NewsSymbolList.Endpoint(language, stockQuote, limit),
            'GET',
            {
                referer: Dto.ProductStockSymbolPrice.Endpoint(
                    language,
                    stockQuote,
                ),
            },
        )

        return result
    }

    async companySymbolProfile(
        params: Dto.CompanySymbolProfile.Params,
    ): Promise<Dto.CompanySymbolProfile.Result> {
        const { language, stockQuote } = params

        const result = await this.httpRequest<Dto.CompanySymbolProfile.Result>(
            Dto.CompanySymbolProfile.Endpoint(language, stockQuote),
            'GET',
            {
                referer: Dto.ProductStockSymbolPrice.Endpoint(
                    language,
                    stockQuote,
                ),
            },
        )
        return result
    }

    async indexList(
        params: Dto.IndexList.Params,
    ): Promise<Dto.IndexList.Result> {
        const { language } = params

        const result = await this.httpRequest<Dto.IndexList.Result>(
            Dto.IndexList.Endpoint(),
            'GET',
            {
                referer: Dto.ProductStockSearch.Endpoint(language),
            },
        )

        return result
    }

    async indexSymbolChartPerformance(
        params: Dto.IndexSymbolChartPerformance.Params,
    ): Promise<Dto.IndexSymbolChartPerformance.Result> {
        const { language, symbol, period } = params

        const result =
            await this.httpRequest<Dto.IndexSymbolChartPerformance.Result>(
                Dto.IndexSymbolChartPerformance.Endpoint(symbol, period),
                'GET',
                {
                    referer: Dto.ProductStockSearch.Endpoint(language),
                },
            )

        return result
    }

    async factsheetSymbolPricePerformance(
        params: Dto.FactsheetSymbolPricePerformance.Params,
    ): Promise<Dto.FactsheetSymbolPricePerformance.Result> {
        const { language, stockQuote } = params

        const result =
            await this.httpRequest<Dto.FactsheetSymbolPricePerformance.Result>(
                Dto.FactsheetSymbolPricePerformance.Endpoint(
                    language,
                    stockQuote,
                ),
                'GET',
                {
                    referer: Dto.ProductStockSymbolFactsheet.Endpoint(
                        language,
                        stockQuote,
                    ),
                },
            )

        return result
    }

    async factsheetSymbolProfile(
        params: Dto.FactsheetSymbolProfile.Params,
    ): Promise<Dto.FactsheetSymbolProfile.Result> {
        const { language, stockQuote } = params

        const result =
            await this.httpRequest<Dto.FactsheetSymbolProfile.Result>(
                Dto.FactsheetSymbolProfile.Endpoint(language, stockQuote),
                'GET',
                {
                    referer: Dto.ProductStockSymbolFactsheet.Endpoint(
                        language,
                        stockQuote,
                    ),
                },
            )

        return result
    }

    async factsheetSymbolTradingStat(
        params: Dto.FactsheetSymbolTradingStat.Params,
    ): Promise<Dto.FactsheetSymbolTradingStat.Result> {
        const { language, stockQuote } = params

        const result =
            await this.httpRequest<Dto.FactsheetSymbolTradingStat.Result>(
                Dto.FactsheetSymbolTradingStat.Endpoint(language, stockQuote),
                'GET',
                {
                    referer: Dto.ProductStockSymbolFactsheet.Endpoint(
                        language,
                        stockQuote,
                    ),
                },
            )

        return result
    }

    async factsheetSymbolFinancialStatementBalanceSheet(
        params: Dto.FactsheetSymbolFinancialStatementBalanceSheet.Params,
    ): Promise<Dto.FactsheetSymbolFinancialStatementBalanceSheet.Result> {
        const { language, stockQuote } = params

        const result =
            await this.httpRequest<Dto.FactsheetSymbolFinancialStatementBalanceSheet.Result>(
                Dto.FactsheetSymbolFinancialStatementBalanceSheet.Endpoint(
                    language,
                    stockQuote,
                ),
                'GET',
                {
                    referer: Dto.ProductStockSymbolFactsheet.Endpoint(
                        language,
                        stockQuote,
                    ),
                },
            )

        return result
    }

    async factsheetSymbolFinancialStatementIncomeStatement(
        params: Dto.FactsheetSymbolFinancialStatementIncomeStatement.Params,
    ): Promise<Dto.FactsheetSymbolFinancialStatementIncomeStatement.Result> {
        const { language, stockQuote } = params

        const result =
            await this.httpRequest<Dto.FactsheetSymbolFinancialStatementIncomeStatement.Result>(
                Dto.FactsheetSymbolFinancialStatementIncomeStatement.Endpoint(
                    language,
                    stockQuote,
                ),
                'GET',
                {
                    referer: Dto.ProductStockSymbolFactsheet.Endpoint(
                        language,
                        stockQuote,
                    ),
                },
            )

        return result
    }

    async factsheetSymbolFinancialStatementCashFlow(
        params: Dto.FactsheetSymbolFinancialStatementCashFlow.Params,
    ): Promise<Dto.FactsheetSymbolFinancialStatementCashFlow.Result> {
        const { language, stockQuote } = params

        const result =
            await this.httpRequest<Dto.FactsheetSymbolFinancialStatementCashFlow.Result>(
                Dto.FactsheetSymbolFinancialStatementCashFlow.Endpoint(
                    language,
                    stockQuote,
                ),
                'GET',
                {
                    referer: Dto.ProductStockSymbolFactsheet.Endpoint(
                        language,
                        stockQuote,
                    ),
                },
            )

        return result
    }

    async factsheetSymbolFinancialRatio(
        params: Dto.FactsheetSymbolFinancialRatio.Params,
    ): Promise<Dto.FactsheetSymbolFinancialRatio.Result> {
        const { language, stockQuote } = params

        const result =
            await this.httpRequest<Dto.FactsheetSymbolFinancialRatio.Result>(
                Dto.FactsheetSymbolFinancialRatio.Endpoint(
                    language,
                    stockQuote,
                ),
                'GET',
                {
                    referer: Dto.ProductStockSymbolFactsheet.Endpoint(
                        language,
                        stockQuote,
                    ),
                },
            )

        return result
    }

    async factsheetSymbolFinancialGrowth(
        params: Dto.FactsheetSymbolFinancialGrowth.Params,
    ): Promise<Dto.FactsheetSymbolFinancialGrowth.Result> {
        const { language, stockQuote } = params

        const result =
            await this.httpRequest<Dto.FactsheetSymbolFinancialGrowth.Result>(
                Dto.FactsheetSymbolFinancialGrowth.Endpoint(
                    language,
                    stockQuote,
                ),
                'GET',
                {
                    referer: Dto.ProductStockSymbolFactsheet.Endpoint(
                        language,
                        stockQuote,
                    ),
                },
            )

        return result
    }

    async factsheetSymbolCapitalMovement(
        params: Dto.FactsheetSymbolCapitalMovement.Params,
    ): Promise<Dto.FactsheetSymbolCapitalMovement.Result> {
        const { language, stockQuote } = params

        const result =
            await this.httpRequest<Dto.FactsheetSymbolCapitalMovement.Result>(
                Dto.FactsheetSymbolCapitalMovement.Endpoint(
                    language,
                    stockQuote,
                ),
                'GET',
                {
                    referer: Dto.ProductStockSymbolFactsheet.Endpoint(
                        language,
                        stockQuote,
                    ),
                },
            )

        return result
    }

    async factsheetSymbolTradingSign(
        params: Dto.FactsheetSymbolTradingSign.Params,
    ): Promise<Dto.FactsheetSymbolTradingSign.Result> {
        const { language, stockQuote } = params

        const result =
            await this.httpRequest<Dto.FactsheetSymbolTradingSign.Result>(
                Dto.FactsheetSymbolTradingSign.Endpoint(language, stockQuote),
                'GET',
                {
                    referer: Dto.ProductStockSymbolFactsheet.Endpoint(
                        language,
                        stockQuote,
                    ),
                },
            )

        return result
    }

    async factsheetSymbolMarketAlert(
        params: Dto.FactsheetSymbolMarketAlert.Params,
    ): Promise<Dto.FactsheetSymbolMarketAlert.Result> {
        const { language, stockQuote } = params

        const result =
            await this.httpRequest<Dto.FactsheetSymbolMarketAlert.Result>(
                Dto.FactsheetSymbolMarketAlert.Endpoint(language, stockQuote),
                'GET',
                {
                    referer: Dto.ProductStockSymbolFactsheet.Endpoint(
                        language,
                        stockQuote,
                    ),
                },
            )

        return result
    }

    private async httpRequest<T>(
        url: string,
        method: Method,
        options?: { referer?: string },
    ): Promise<T> {
        const { referer } = options || {}

        try {
            this.logService.debug(`Request begin - ${url}`, SetHttpService.name)
            const response = await this.httpService.axiosRef.request<T>({
                url,
                method,
                headers: {
                    ['Cookie']: this.cookie,
                    ['Referer']: referer,
                },
            })

            const setCookieValues = parse(response.headers['set-cookie'])
            const persistentCookie = setCookieValues
                .map(c => `${c.name}=${c.value}`)
                .join(';')
            this.cookie = persistentCookie

            this.lastRequestUrl = url
            this.logService.debug(
                `Request success - ${url}`,
                SetHttpService.name,
            )

            return response.data
        } catch (error: unknown) {
            if (error instanceof AxiosError) {
                this.logService.error(
                    `Request error - ${url} - [${error?.response?.status}] ${error.message}`,
                    SetHttpService.name,
                )

                throw new HttpException(
                    error.response,
                    error?.response?.status,
                    { cause: error, description: error.message },
                )
            } else if (error instanceof Error) {
                throw new InternalServerErrorException(error, error.message)
            } else {
                throw new InternalServerErrorException(error?.toString())
            }
        }
    }
}
