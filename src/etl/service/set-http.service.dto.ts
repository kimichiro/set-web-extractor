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

    export interface CorporateAction {
        symbol: string
        name: string
        caType: string
        type: string
        bookCloseDate: null
        recordDate: string
        remark: null
        paymentDate: string
        beginOperation: string
        endOperation: string
        sourceOfDividend: string
        dividend: number
        currency: string
        ratio: null
        dividendType: string
        xdate: string
    }

    export interface ChartQuotation {
        datetime: string
        localDatetime: string
        price: number
        volume: number
        value: number
    }

    export interface HistoricalTrading {
        date: string
        symbol: string
        prior: number
        open: number
        high: number
        low: number
        average: number
        close: number
        change: number
        percentChange: number
        totalVolume: number
        totalValue: number
        pe: number
        pbv: number
        bookValuePerShare: number
        dividendYield: number
        marketCap: number
        listedShare: number
        par: number
        financialDate: string
        nav: null
        marketIndex: number
        marketPercentChange: number
    }

    export interface NewsInfo {
        id: string
        datetime: string
        symbol: string
        source: string
        url: string
        headline: string
        isTodayNews: boolean
        viewClarification: null
        marketAlertTypeId: null
        tag: string
        percentPriceChange: null
        product: string
    }

    export interface PricePerformance {
        symbol: string
        fiveDayPercentChange: number
        oneMonthPercentChange: number
        threeMonthPercentChange: number
        sixMonthPercentChange: number
        ytdPercentChange: number
        peRatio: number
        pbRatio: number
        turnoverRatio: number
    }

    export interface ProfileAnnualReport {
        symbol: string
        receiveDate: string
        year: number
        url: string
        remark: string
    }

    export interface ProfileAuditor {
        name: string
        company: string
        auditEndDate: string
    }

    export interface ProfileLastParChange {
        symbol: string
        effectiveDate: string
        oldPar: number
        newPar: number
    }

    export interface ProfileFreeFloat {
        bookCloseDate: string
        caType: string
        percentFreeFloat: number
        numberOfHolder: number
    }

    export interface TradingStat {
        date: string
        period: string
        symbol: string
        market: string
        industry: string
        sector: string
        prior: number
        open: number
        high: number
        low: number
        average: null
        close: number
        change: number
        percentChange: number
        totalVolume: number
        totalValue: number
        pe: number
        pbv: number
        bookValuePerShare: number
        dividendYield: number
        marketCap: number
        listedShare: number
        par: number
        financialDate: string
        turnoverRatio: number
        beta: number
        dividendPayoutRatio: number
        averageValue: number
    }
        
    export interface FinancialStatement {
        symbol: string
        quarter: string
        year: number
        beginDate: string
        endDate: string
        fsType: string
        accountFormId: number
        downloadUrl: string
        fsTypeDescription: string
        status: string
        isFSComp: boolean
        hasAdjustedAccount: boolean
        accounts: FinancialStatementAccount[]
    }

    export interface FinancialStatementAccount {
        accountCode: string
        accountName: string
        amount: number
        adjusted: boolean
        level: number
        divider: number
        format: string
    }

    export interface Financial {
        symbol: string
        quarter: string
        year: number
        fsType: string
        beginDate: string
        endDate: string
        asOfDate: string
        data: FinancialData[]
    }

    export interface FinancialData {
        accountName: string
        value: number
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

    export namespace ProductStockSymbolFactsheet {
        export const Endpoint = (language: string, stockQuote: string) =>
            `https://www.set.or.th/${language}/market/product/stock/quote/${stockQuote}/factsheet`

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

    export namespace StockSymbolOverview {
        export const Endpoint = (language: string, stockQuote: string) =>
            `https://www.set.or.th/api/set/stock/${stockQuote}/overview?lang=${language}`

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
            securityType: string
            securityTypeName: string
            status: string
            indices: string[]
            logoUrl: string
            cgScore: number
            cgRemark: string
            cacFlag: boolean
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

    export namespace StockSymbolCorporateActionHistorical {
        export const Endpoint = (language: string, stockQuote: string) =>
            `https://www.set.or.th/api/set/stock/${stockQuote}/corporate-action/historical?caType=XD&lang=${language}`

        export interface Params extends BaseParams {
            stockQuote: string
        }

        export type Result = CorporateAction[]
    }

    export namespace StockSymbolChartQuotation {
        export const Endpoint = (language: string, stockQuote: string) =>
            `https://www.set.or.th/api/set/stock/${stockQuote}/chart-quotation?period={{period}}&accumulated=false`

        export interface Params extends BaseParams {
            stockQuote: string
        }

        export interface Result {
            prior: number
            quotations: ChartQuotation[]
        }
    }

    export namespace StockSymbolChartPerformance {
        export const Endpoint = (language: string, stockQuote: string) =>
            `https://www.set.or.th/api/set/stock/${stockQuote}/chart-performance?period={{period}}&accumulated=true`

        export interface Params extends BaseParams {
            stockQuote: string
        }

        export interface Result {
            prior: number
            quotations: ChartQuotation[]
        }
    }

    export namespace StockSymbolHistoricalTrading {
        export const Endpoint = (language: string, stockQuote: string) =>
            `https://www.set.or.th/api/set/stock/${stockQuote}/historical-trading?lang=${language}`

        export interface Params extends BaseParams {
            stockQuote: string
        }

        export type Result = HistoricalTrading[]
    }

    export namespace NewsSymbolList {
        export const Endpoint = (language: string, stockQuote: string) =>
            `https://www.set.or.th/api/set/news/${stockQuote}/list?lang=${language}&limit={{result_limit}}`

        export interface Params extends BaseParams {
            stockQuote: string
        }

        export interface Result {
            totalCount: number
            newsInfoList: NewsInfo[]
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

    export namespace IndexList {
        export const Endpoint = (language: string, stockQuote: string) =>
            `https://www.set.or.th/api/set/index/info/list?type=INDEX`

        export interface Params extends BaseParams {
            stockQuote: string
        }

        export interface IndexIndustrySector {
            symbol: string
            nameEN: string
            nameTH: string
            prior: number
            open: null
            high: number
            low: number
            last: number
            change: number
            percentChange: number
            volume: number
            value: number
            querySymbol: string
            marketStatus: string
            marketDateTime: string
            marketName: string
            industryName: string
            sectorName: string
            level: string
        }

        export interface Result {
            indexIndustrySectors: IndexIndustrySector[]
        }
    }

    export namespace IndexSymbolChartPerformance {
        export const Endpoint = (language: string, stockQuote: string) =>
            `https://www.set.or.th/api/set/index/{{index_symbol}}/chart-performance?period={{period}}`

        export interface Params extends BaseParams {
            stockQuote: string
        }

        export interface Result {
            prior: number
            quotations: ChartQuotation[]
        }
    }

    export namespace FactsheetSymbolPricePerformance {
        export const Endpoint = (language: string, stockQuote: string) =>
            `https://www.set.or.th/api/set/factsheet/${stockQuote}/price-performance?lang=${language}`

        export interface Params extends BaseParams {
            stockQuote: string
        }

        export interface Result {
            stock: PricePerformance
            sector: PricePerformance
            market: PricePerformance
        }
    }

    export namespace FactsheetSymbolProfile {
        export const Endpoint = (language: string, stockQuote: string) =>
            `https://www.set.or.th/api/set/factsheet/${stockQuote}/profile?lang=${language}`

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
            businessType: string
            url: string
            address: string
            telephone: string
            fax: string
            dividendPolicy: string
            establishedDate: string
            listedDate: string
            fiscalYearEnd: string
            fiscalYearEndDisplay: string
            accountForm: string
            par: number
            ipo: number
            currency: string
            initialPar: number
            annualReport: ProfileAnnualReport
            financialAdvisors: []
            auditEnd: string
            auditChoice: null
            auditors: ProfileAuditor[]
            lastParChange: ProfileLastParChange,
            freeFloats: ProfileFreeFloat[]
            foreignLimitAsOf: string
            percentForeignHolder: number
            percentForeignLimit: number
            nvdrHolderAsOf: string
            percentNvdrHolder: number
        }
    }

    export namespace FactsheetSymbolTradingStat {
        export const Endpoint = (language: string, stockQuote: string) =>
            `https://www.set.or.th/api/set/factsheet/${stockQuote}/trading-stat?lang=${language}`

        export interface Params extends BaseParams {
            stockQuote: string
        }

        export type Result = TradingStat[]
    }

    export namespace FactsheetSymbolFinancialStatementBalanceSheet {
        export const Endpoint = (language: string, stockQuote: string) =>
            `https://www.set.or.th/api/set/factsheet/${stockQuote}/financialstatement?accountType=balance_sheet&lang=${language}`

        export interface Params extends BaseParams {
            stockQuote: string
        }

        export type Result = FinancialStatement[]
    }

    export namespace FactsheetSymbolFinancialStatementIncomeStatement {
        export const Endpoint = (language: string, stockQuote: string) =>
            `https://www.set.or.th/api/set/factsheet/${stockQuote}/financialstatement?accountType=income_statement&lang=${language}`

        export interface Params extends BaseParams {
            stockQuote: string
        }

        export type Result = FinancialStatement[]
    }

    export namespace FactsheetSymbolFinancialStatementCashFlow {
        export const Endpoint = (language: string, stockQuote: string) =>
            `https://www.set.or.th/api/set/factsheet/${stockQuote}/financialstatement?accountType=cash_flow&lang=${language}`

        export interface Params extends BaseParams {
            stockQuote: string
        }

        export type Result = FinancialStatement[]
    }

    export namespace FactsheetSymbolFinancialRatio {
        export const Endpoint = (language: string, stockQuote: string) =>
            `https://www.set.or.th/api/set/factsheet/${stockQuote}/financial-ratio?lang=${language}`

        export interface Params extends BaseParams {
            stockQuote: string
        }

        export type Result = Financial[]
    }

    export namespace FactsheetSymbolFinancialGrowth {
        export const Endpoint = (language: string, stockQuote: string) =>
            `https://www.set.or.th/api/set/factsheet/${stockQuote}/financial-growth?lang=${language}`

        export interface Params extends BaseParams {
            stockQuote: string
        }

        export type Result = Financial[]
    }

    export namespace FactsheetSymbolCapitalMovement {
        export const Endpoint = (language: string, stockQuote: string) =>
            `https://www.set.or.th/api/set/factsheet/${stockQuote}/capital-movement?lang=${language}`

        export interface Params extends BaseParams {
            stockQuote: string
        }

        export interface CapitalMovement {
            effectiveDate: string
            caType: string
            changePaidup: number
            paidupShare: number
            par: number
        }

        export type Result = CapitalMovement[]
    }

    export namespace FactsheetSymbolTradingSign {
        export const Endpoint = (language: string, stockQuote: string) =>
            `https://www.set.or.th/api/set/factsheet/${stockQuote}/trading-sign?lang=${language}`

        export interface Params extends BaseParams {
            stockQuote: string
        }

        export type Result = []
    }

    export namespace FactsheetSymbolMarketAlert {
        export const Endpoint = (language: string, stockQuote: string) =>
            `https://www.set.or.th/api/set/factsheet/${stockQuote}/market-alert?lang=${language}`

        export interface Params extends BaseParams {
            stockQuote: string
        }

        export type Result = []
    }
}
