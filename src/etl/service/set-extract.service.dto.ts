export namespace SetExtractServiceDto {
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
        }
    }
}
