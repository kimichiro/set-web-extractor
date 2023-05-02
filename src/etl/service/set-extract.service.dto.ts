import { SymbolEntity } from '../../database/entity/symbol.entity'

export namespace SetExtractServiceDto {
    export namespace UpsertSymbolList {
        export type Result = SymbolEntity[]
    }

    export namespace UpdateSymbol {
        export interface Params {
            symbol: string
        }

        export type Result = SymbolEntity
    }
}
