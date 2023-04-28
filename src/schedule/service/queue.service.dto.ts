export namespace QueueServiceDto {
    export enum MessageType {
        SetApiLoadListSymbol = 'set-api-load.list-symbol',
        SetApiLoadFetchSymbolData = 'set-api-load.fetch-symbol-data',
    }

    export namespace PushMessage {
        export interface Params {
            type: MessageType
            data?: object
        }

        export type Result = string | number | null
    }
}
