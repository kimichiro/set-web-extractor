import { SetHttpServiceDto } from './set-http.service.dto'

export namespace SetCollectionServiceDto {
    export namespace ListSymbol {
        export interface Result {
            count: number
            symbols: string[]
        }
    }

    export namespace FetchSymbol {
        export interface Params {
            symbol: string
        }

        export interface Result {
            symbol: string
            market: string
            industry: string
            sector: string
            indices: string[]
            asOfDate: string
        }
    }

    export namespace LoadSymbolList {
        export type Result = SetHttpServiceDto.StockList.Result
    }

    export namespace LoadSymbolRawData {
        export interface Params {
            symbol: string
        }

        export interface Result {
            symbol: string
            name: string
            market: string
            industry: string
            sector: string
        }
    }
}
