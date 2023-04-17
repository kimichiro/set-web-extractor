import { Injectable, Logger } from '@nestjs/common'
import { LogServiceDto } from './log.service.dto'

@Injectable()
export class LogService {
    private readonly logger: Logger = new Logger()

    info(
        message: LogServiceDto.Info.Params[0],
        context: LogServiceDto.Info.Params[1],
    ): LogServiceDto.Info.Result {
        this.logger.log(message, context)
    }

    warn(
        message: LogServiceDto.Warn.Params[0],
        context: LogServiceDto.Warn.Params[1],
    ): LogServiceDto.Warn.Result {
        this.logger.warn(message, context)
    }

    error(
        message: LogServiceDto.Error.Params[0],
        context: LogServiceDto.Error.Params[1],
    ): LogServiceDto.Error.Result {
        this.logger.error(message, context)
    }

    debug(
        message: LogServiceDto.Debug.Params[0],
        context: LogServiceDto.Debug.Params[1],
    ): LogServiceDto.Debug.Result {
        this.logger.debug(message, context)
    }
}
