import { Inject } from '@nestjs/common'
import { EntityManager, ObjectLiteral, Repository } from 'typeorm'
import { DbContextService } from '../service/db-context.service'

export class BaseRepository<TEntity extends ObjectLiteral> {
    @Inject()
    private readonly dbContextService: DbContextService

    constructor(protected readonly repository: Repository<TEntity>) {}

    protected async activateContext<T>(
        context: (entityManager: EntityManager) => Promise<T>,
        fallback: () => Promise<T>,
    ): Promise<T> {
        const defaultTransaction = this.dbContextService.getDefaultTransaction()

        if (defaultTransaction?.queryRunner.manager != null) {
            return await context(defaultTransaction?.queryRunner.manager)
        }
        return await fallback()
    }
}
