import { SetCollectionServiceDto } from 'src/etl/service/set-collection.service.dto'

export namespace CollectionControllerDto {
    export const Name = 'collection'

    export namespace HttpGetListSymbol {
        export const Endpoint = 'symbol'

        export type Response = SetCollectionServiceDto.ListSymbol.Result
    }

    export namespace HttpGetFetchSymbol {
        export enum Param {
            Symbol = 'symbol',
        }

        export const Endpoint = `symbol/:${Param.Symbol}`

        export type Response = SetCollectionServiceDto.FetchSymbol.Result
    }
}
