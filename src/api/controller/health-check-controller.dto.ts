import { HealthCheckServiceDto } from '../service/health-check.service.dto'

export namespace HealthCheckControllerDto {
    export const Name = 'health-check'

    export namespace HttpGet {
        export const Endpoint = ''

        export type Response = HealthCheckServiceDto.ServerInfo.Result
    }
}
