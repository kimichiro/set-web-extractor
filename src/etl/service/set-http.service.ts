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
    private readonly cache: Map<string, string>

    constructor(
        private readonly logService: LogService,
        private readonly httpService: HttpService,
    ) {
        this.cache = new Map<string, string>()
    }

    async productStockSearch(
        params: Dto.ProductStockSearch.Params,
    ): Promise<Dto.ProductStockSearch.Result> {
        const { language } = params

        await this.httpRequest<string>(
            Dto.ProductStockSearch.Endpoint(language),
            'GET',
            { persistent: true, reset: true },
        )
    }

    async productStockSymbolPrice(
        params: Dto.ProductStockSymbolPrice.Params,
    ): Promise<Dto.ProductStockSymbolPrice.Result> {
        const { language, stockQuote } = params

        await this.httpRequest<string>(
            Dto.ProductStockSymbolPrice.Endpoint(language, stockQuote),
            'GET',
            { persistent: true, reset: true },
        )
    }

    async stockList(): Promise<Dto.StockList.Result> {
        const result = await this.httpRequest<Dto.StockList.Result>(
            Dto.StockList.Endpoint(),
            'GET',
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
        )
        return result
    }

    private async httpRequest<T>(
        url: string,
        method: Method,
        options?: { persistent?: boolean; reset?: boolean },
    ): Promise<T> {
        const { persistent, reset } = options || {
            persistent: false,
            reset: false,
        }

        if (reset === true) {
            this.cache.clear()
        }

        try {
            this.logService.debug(`Request begin - ${url}`, SetHttpService.name)
            const response = await this.httpService.axiosRef.request<T>({
                url,
                method,
                headers: {
                    ['Cookie']: this.cache.get(Dto.CacheKey.Cookie),
                    ['Referer']: this.cache.get(Dto.CacheKey.Referer),
                },
            })

            if (persistent === true) {
                const setCookieValues = parse(response.headers['set-cookie'])
                const persistentCookie = setCookieValues
                    .map(c => `${c.name}=${c.value}`)
                    .join(';')
                this.cache.set(Dto.CacheKey.Cookie, persistentCookie)
            }

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
        } finally {
            if (persistent === true) {
                this.cache.set(Dto.CacheKey.Referer, url)
            }
        }
    }
}
