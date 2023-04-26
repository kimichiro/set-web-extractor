import { Inject } from '@nestjs/common'
import { DeepPartial, EntityManager, ObjectLiteral, Repository } from 'typeorm'
import { DbContextService } from '../service/db-context.service'

export class BaseRepository<TEntity extends ObjectLiteral> {
    @Inject()
    private readonly dbContextService: DbContextService

    constructor(protected readonly repository: Repository<TEntity>) {}

    async insert(entityLike: DeepPartial<TEntity>): Promise<TEntity> {
        const result = await this.activateContext(
            entityManager =>
                entityManager.insert(this.repository.target, entityLike),
            () => this.repository.insert(entityLike),
        )

        return result.generatedMaps[0] as TEntity
    }

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
