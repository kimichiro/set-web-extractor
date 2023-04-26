import { HealthServiceDto as Dto } from '../service/health.service.dto'

export namespace HealthControllerDto {
    export const Name = 'health'

    export namespace HttpGet {
        export const Endpoint = ''

        export type Response = Dto.ServerInfo.Result
    }
}
