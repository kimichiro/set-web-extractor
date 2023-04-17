import { Injectable, Logger } from '@nestjs/common'
import { LogServiceDto as Dto } from './log.service.dto'

@Injectable()
export class LogService {
    private readonly logger: Logger = new Logger()

    info(
        message: Dto.Info.Params[0],
        context?: Dto.Info.Params[1],
    ): Dto.Info.Result {
        if (context == null) {
            this.logger.log(message)
        } else {
            this.logger.log(message, context)
        }
    }

    warn(
        message: Dto.Warn.Params[0],
        context?: Dto.Warn.Params[1],
    ): Dto.Warn.Result {
        if (context == null) {
            this.logger.warn(message)
        } else {
            this.logger.warn(message, context)
        }
    }

    error(
        message: Dto.Error.Params[0],
        context?: Dto.Error.Params[1],
    ): Dto.Error.Result {
        if (context == null) {
            this.logger.error(message)
        } else {
            this.logger.error(message, context)
        }
    }

    debug(
        message: Dto.Debug.Params[0],
        context?: Dto.Debug.Params[1],
    ): Dto.Debug.Result {
        if (context == null) {
            this.logger.debug(message)
        } else {
            this.logger.debug(message, context)
        }
    }
}
