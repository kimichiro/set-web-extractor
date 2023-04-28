import { QueueServiceDto } from './queue.service.dto'

export namespace SetApiLoadProcessorDto {
    export const Name = 'set-api-load'

    export namespace ProcessMessage {
        export interface Params {
            type: QueueServiceDto.MessageType
            data?: object
        }

        export type Result = void
    }
}
