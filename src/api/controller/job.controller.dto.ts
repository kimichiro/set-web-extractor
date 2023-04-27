import { HttpStatusCode } from 'axios'

export namespace JobControllerDto {
    export const Name = 'job'

    export namespace HttpGetLoadSetApiRawData {
        export const Endpoint = 'load-set-api-raw-data'
        export const StatusCode = HttpStatusCode.Accepted

        export type Response = void
    }
}
