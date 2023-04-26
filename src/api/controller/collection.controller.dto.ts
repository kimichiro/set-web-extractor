import { SetExtractServiceDto } from 'src/etl/service/set-extract.service.dto'

export namespace CollectionControllerDto {
    export const Name = 'collection'

    export namespace HttpGetListSymbol {
        export const Endpoint = 'list-symbol'

        export type Response = SetExtractServiceDto.ListSymbol.Result
    }

    export namespace HttpGetFetchSymbol {
        export enum Param {
            Symbol = 'symbol',
        }

        export const Endpoint = `symbol/:${Param.Symbol}`

        export type Response = SetExtractServiceDto.FetchSymbol.Result
    }
}
