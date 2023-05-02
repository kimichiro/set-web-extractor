export namespace QueueServiceDto {
    export enum MessageType {
        SetApiLoadListSymbol = 'set-api-load.list-symbol',
        SetApiLoadFetchSymbolData = 'set-api-load.fetch-symbol-data',
        SetApiExtractUpsertSymbolList = 'set-api-extract.upsert-symbol-list',
        SetApiExtractUpdateSymbol = 'set-api-extract.update-symbol',
    }

    export namespace PushMessage {
        export interface Params {
            type: MessageType
            data?: object
        }

        export type Result = string | number | null
    }
}
