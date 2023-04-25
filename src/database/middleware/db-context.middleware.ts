import { Injectable, NestMiddleware } from '@nestjs/common'
import { Request, Response } from 'express'
import { DbContextService } from '../service/db-context.service'

@Injectable()
export class DbContextMiddleware implements NestMiddleware {
    constructor(private readonly dbContextService: DbContextService) {}

    use(_: Request, __: Response, next: () => void): void {
        this.dbContextService.run(next)
    }
}
