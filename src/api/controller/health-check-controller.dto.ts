import { SetExtractServiceDto } from 'src/etl/service/set-extract.service.dto'
import { HealthCheckServiceDto as Dto } from '../service/health-check.service.dto'

export namespace HealthCheckControllerDto {
    export const Name = 'health-check'

    export namespace HttpGet {
        export const Endpoint = ''

        export type Response = Dto.ServerInfo.Result
    }

    export namespace HttpGetTrigger {
        export const Endpoint = 'trigger'

        export type Response = SetExtractServiceDto.RetreiveData.Result
    }
}
