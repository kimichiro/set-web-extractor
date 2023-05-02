import { QueueServiceDto } from './queue.service.dto'

export namespace SetApiProcessorDto {
    export const Name = 'set-api'

    export namespace ProcessMessage {
        export interface Params {
            type: QueueServiceDto.MessageType
            data?: object
        }

        export type Result = void
    }
}
