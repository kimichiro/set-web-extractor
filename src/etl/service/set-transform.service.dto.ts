import { SymbolEntity } from '../../database/entity/symbol.entity'

export namespace SetApiTransformServiceDto {
    export namespace GetPendingSymbolList {
        export type Result = SymbolEntity[]
    }

    export namespace UpsertBasicInfo {
        export interface Params {
            symbol: string
        }

        export type Result = SymbolEntity
    }
}
