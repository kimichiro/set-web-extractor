import { HttpStatusCode } from 'axios'

export namespace JobControllerDto {
    export const Name = 'job'

    export namespace HttpGetQueue {
        export enum Param {
            Queue = 'queue',
            Action = 'action',
        }

        export const Endpoint = `queue/:${Param.Queue}/:${Param.Action}`
        export const StatusCode = HttpStatusCode.Accepted

        export interface Response {
            jobId: string
        }
    }
}
