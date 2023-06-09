import { Inject } from '@nestjs/common'
import {
    DeepPartial,
    EntityManager,
    FindManyOptions,
    FindOneOptions,
    ObjectId,
    ObjectLiteral,
    Repository,
} from 'typeorm'
import { DbContextService } from '../service/db-context.service'
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity'
import { UpsertOptions } from 'typeorm/repository/UpsertOptions'

type Criteria =
    | string
    | string[]
    | number
    | number[]
    | Date
    | Date[]
    | ObjectId
    | ObjectId[]

export class BaseRepository<TEntity extends ObjectLiteral> {
    @Inject()
    private readonly dbContextService: DbContextService

    constructor(protected readonly repository: Repository<TEntity>) {}

    async find(options?: FindManyOptions<TEntity>): Promise<TEntity[]> {
        const result = await this.activateContext(
            entityManager =>
                entityManager.find(this.repository.target, options),
            () => this.repository.find(options),
        )

        return result
    }

    async findOne(options?: FindOneOptions<TEntity>): Promise<TEntity | null> {
        const result = await this.activateContext(
            entityManager =>
                entityManager.findOne(this.repository.target, options),
            () => this.repository.findOne(options),
        )

        return result
    }

    async insert(entityLike: DeepPartial<TEntity>): Promise<TEntity> {
        const result = await this.activateContext(
            entityManager =>
                entityManager.insert(this.repository.target, entityLike),
            () => this.repository.insert(entityLike),
        )

        return result.generatedMaps[0] as TEntity
    }

    async update(
        criteria: Criteria,
        partialEntity: QueryDeepPartialEntity<TEntity>,
    ): Promise<TEntity[]> {
        if (Array.isArray(criteria) && criteria.length === 0) {
            return []
        }

        const result = await this.activateContext(
            entityManager =>
                entityManager.update(
                    this.repository.target,
                    criteria,
                    partialEntity,
                ),
            () => this.repository.update(criteria, partialEntity),
        )

        return result.generatedMaps as TEntity[]
    }

    async upsert(
        entityOrEntities:
            | QueryDeepPartialEntity<TEntity>
            | QueryDeepPartialEntity<TEntity>[],
        conflictPathsOrOptions: string[] | UpsertOptions<TEntity>,
    ): Promise<TEntity[]> {
        const entities = Array.isArray(entityOrEntities)
            ? entityOrEntities
            : [entityOrEntities]

        const result = await this.activateContext(
            entityManager =>
                entityManager.upsert(this.repository.target, entities, {
                    skipUpdateIfNoValuesChanged: true,
                    ...conflictPathsOrOptions,
                }),
            () =>
                this.repository.upsert(entities, {
                    skipUpdateIfNoValuesChanged: true,
                    ...conflictPathsOrOptions,
                }),
        )

        return result.generatedMaps as TEntity[]
    }

    async delete(criteria: Criteria): Promise<TEntity[]> {
        if (Array.isArray(criteria) && criteria.length === 0) {
            return []
        }

        const result = await this.activateContext(
            entityManager =>
                entityManager.softDelete(this.repository.target, criteria),
            () => this.repository.softDelete(criteria),
        )

        return result.generatedMaps as TEntity[]
    }

    protected async activateContext<T>(
        context: (entityManager: EntityManager) => Promise<T>,
        fallback: () => Promise<T>,
    ): Promise<T> {
        const defaultTransaction = this.dbContextService.getDefaultTransaction()

        if (defaultTransaction?.queryRunner?.manager != null) {
            return await context(defaultTransaction?.queryRunner?.manager)
        }
        return await fallback()
    }
}
