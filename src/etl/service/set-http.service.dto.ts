export namespace SetHttpServiceDto {
    export enum CacheKey {
        Cookie = 'cache-cookie',
        Referer = 'cache-referer',
    }

    export interface BaseParams {
        language: string
    }

    export interface SecuritySymbol {
        symbol: string
        nameTH: string
        nameEN: string
        market: string
        securityType: string
        typeSequence: number
        industry: string
        sector: string
        querySector: string
        isIFF: boolean
        isForeignListing: boolean
        remark: string
    }

    export interface RelatedProduct {
        symbol: string
        sign: string
        prior: number
        last: number
        change: number
        percentChange: number
        totalVolume: number
        totalValue: number
        oi: null
        securityType: string
        exercisePrice: null
        exerciseRatio: null
        maturityDate: null
    }

    export interface CompanyHighlightFinancial {
        symbol: string
        quarter: string
        year: number
        fsType: string
        beginDate: string
        endDate: string
        asOfDate: string
        totalAsset: number
        totalLiability: number
        equity: number
        paidupCapital: number
        totalRevenue: number
        totalExpense: number
        sales: null
        ebit: number
        ebitda: number
        netProfit: number
        profitFromOtherActivity: number
        eps: number
        netOperating: number
        netInvesting: number
        netFinancing: number
        netCashflow: number
        roa: number
        roe: number
        netProfitMargin: number
        grossProfitMargin: null
        deRatio: number
        currentRatio: null
        quickRatio: null
    }

    export interface CompanyProfileAuditor {
        name: string
        company: string
        auditEndDate: string
    }

    export interface CompanyProfileManagement {
        positionCode: number
        position: string
        name: string
        startDate: string
    }

    export interface CompanyProfileCommonCapital {
        authorizedCapital: number
        paidupCapital: number
        par: number
        currency: string
    }

    export interface CompanyProfileVotingRight {
        symbol: string
        paidupShare: number
        ratio: string
    }

    export interface CompanyProfileVotingShare {
        asOfDate: string
        share: number
    }

    export interface CompanyProfileCommonsShare {
        listedShare: number
        votingRights: CompanyProfileVotingRight[]
        treasuryShares: null
        votingShares: CompanyProfileVotingShare[]
    }

    export interface CommonProfilePreferredCapital {
        authorizedCapital: null
        paidupCapital: null
        par: null
        currency: string
    }

    export interface CommonProfilePreferredShare {
        listedShare: number
        votingRights: CompanyProfileVotingRight[]
        treasuryShares: null
        votingShares: CompanyProfileVotingShare[]
    }

    export namespace ProductStockSearch {
        export const Endpoint = (language: string) =>
            `https://www.set.or.th/${language}/market/product/stock/search`

        export type Params = BaseParams

        export type Result = void
    }

    export namespace ProductStockSymbolPrice {
        export const Endpoint = (language: string, stockQuote: string) =>
            `https://www.set.or.th/${language}/market/product/stock/quote/${stockQuote}/price`

        export interface Params extends BaseParams {
            stockQuote: string
        }

        export type Result = void
    }

    export namespace StockList {
        export const Endpoint = () => `https://www.set.or.th/api/set/stock/list`

        export interface Result {
            securitySymbols: SecuritySymbol[]
        }
    }

    export namespace StockSymbolRelatedProductOthers {
        export const Endpoint = (language: string, stockQuote: string) =>
            `https://www.set.or.th/api/set/stock/${stockQuote}/related-product/o?lang=${language}`

        export interface Params extends BaseParams {
            stockQuote: string
        }

        export interface Result {
            symbol: string
            type: string
            name: string
            relatedProducts: RelatedProduct[]
        }
    }

    export namespace StockSymbolRelatedProductWarrants {
        export const Endpoint = (language: string, stockQuote: string) =>
            `https://www.set.or.th/api/set/stock/${stockQuote}/related-product/w?lang=${language}`

        export interface Params extends BaseParams {
            stockQuote: string
        }

        export interface Result {
            symbol: string
            type: string
            name: string
            relatedProducts: RelatedProduct[]
        }
    }

    export namespace StockSymbolIndexList {
        export const Endpoint = (language: string, stockQuote: string) =>
            `https://www.set.or.th/api/set/stock/${stockQuote}/index-list?lang=${language}`

        export interface Params extends BaseParams {
            stockQuote: string
        }

        export interface Result {
            asOfDate: string
            symbol: string
            market: string
            industry: string
            industryName: string
            sector: string
            sectorName: string
            otherIndices: string[]
        }
    }

    export namespace StockSymbolCompanyHighlightFinancial {
        export const Endpoint = (language: string, stockQuote: string) =>
            `https://www.set.or.th/api/set/stock/${stockQuote}/company-highlight/financial-data?lang=${language}`

        export interface Params extends BaseParams {
            stockQuote: string
        }

        export type Result = CompanyHighlightFinancial[]
    }

    export namespace StockSymbolProfile {
        export const Endpoint = (language: string, stockQuote: string) =>
            `https://www.set.or.th/api/set/stock/${stockQuote}/profile?lang=${language}`

        export interface Params extends BaseParams {
            stockQuote: string
        }

        export interface Result {
            symbol: string
            name: string
            market: string
            industry: string
            industryName: string
            sector: string
            sectorName: string
            securityType: string
            securityTypeName: string
            status: string
            listedDate: string
            firstTradeDate: string
            lastTradeDate: null
            maturityDate: null
            fiscalYearEnd: string
            fiscalYearEndDisplay: string
            accountForm: string
            par: number
            currency: string
            listedShare: number
            ipo: number
            isinLocal: string
            isinForeign: string
            isinNVDR: string
            percentFreeFloat: number
            foreignLimitAsOf: string
            percentForeignRoom: number
            percentForeignLimit: number
            foreignAvailable: number
            underlying: string
            exercisePrice: null
            exerciseRatio: string
            reservedShare: number
            convertedShare: null
            lastExerciseDate: null
        }
    }

    export namespace CompanySymbolProfile {
        export const Endpoint = (language: string, stockQuote: string) =>
            `https://www.set.or.th/api/set/company/${stockQuote}/profile?lang=${language}`

        export interface Params extends BaseParams {
            stockQuote: string
        }

        export interface Result {
            symbol: string
            name: string
            nameRemark: string
            market: string
            industry: string
            industryName: string
            sector: string
            sectorName: string
            logoUrl: string
            businessType: string
            url: string
            address: string
            telephone: string
            fax: string
            email: string
            dividendPolicy: string
            cgScore: number
            cgRemark: string
            cacFlag: boolean
            establishedDate: string
            auditEnd: string
            auditChoice: null
            auditors: CompanyProfileAuditor[]
            managements: CompanyProfileManagement[]
            commonCapital: CompanyProfileCommonCapital
            commonsShare: CompanyProfileCommonsShare
            preferredCapital: CommonProfilePreferredCapital
            preferredShare: CommonProfilePreferredShare
        }
    }
}
