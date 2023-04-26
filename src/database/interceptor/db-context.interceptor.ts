import {
    CallHandler,
    ExecutionContext,
    Injectable,
    NestInterceptor,
} from '@nestjs/common'
import { catchError, from, Observable, tap } from 'rxjs'
import { DbContextService } from '../service/db-context.service'

@Injectable()
export class DbContextInterceptor implements NestInterceptor {
    constructor(private readonly dbContextService: DbContextService) {}

    async intercept(
        _: ExecutionContext,
        next: CallHandler<unknown>,
    ): Promise<Observable<unknown>> {
        const defaultTransaction = this.dbContextService.getDefaultTransaction()

        await defaultTransaction.begin()

        const onComplete = async (): Promise<void> => {
            await defaultTransaction.commit()
        }
        const onError = async (error: unknown): Promise<never> => {
            await defaultTransaction.rollback()
            throw error
        }

        return next.handle().pipe(
            tap(() => from(onComplete())),
            catchError(error => from(onError(error))),
        )
    }
}
