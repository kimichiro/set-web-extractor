import { SymbolEntity } from '../../database/entity/symbol.entity'

export namespace SetApiTransformServiceDto {
    export enum UnitMultiplier {
        OneMillion = 1000000,
    }

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
