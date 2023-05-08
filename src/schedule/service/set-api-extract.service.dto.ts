export namespace SetApiExtractServiceDto {
    export namespace UpsertSymbolList {
        export type Result = void
    }

    export namespace UpdateSymbol {
        export interface Params {
            symbol: string
        }

        export type Result = void
    }

    export namespace InsertFinancialStatement {
        export interface Params {
            symbol: string
        }

        export type Result = void
    }

    export namespace InsertTradingStat {
        export interface Params {
            symbol: string
        }

        export type Result = void
    }
}
