import { AsyncLocalStorage } from 'async_hooks'
import { Injectable } from '@nestjs/common'
import { DataSource, QueryRunner } from 'typeorm'
import { InjectDataSource } from '@nestjs/typeorm'

export interface DbTransaction {
    queryRunner: QueryRunner
    begin: () => Promise<void>
    commit: () => Promise<void>
    rollback: () => Promise<void>
}

interface DbContext {
    defaultTransaction: DbTransaction
}

@Injectable()
export class DbContextService {
    constructor(
        private readonly asyncLocalStorage: AsyncLocalStorage<DbContext>,
        @InjectDataSource('default') private readonly dataSource: DataSource,
    ) {}

    getDefaultTransaction(): DbTransaction | null {
        return this.dbContext.defaultTransaction
    }

    run(next: () => void): void {
        this.asyncLocalStorage.run({
            defaultTransaction: this.createTransaction(),
        }, next)
    }

    reset(): void {
        if (this.dbContext != null) {
            this.dbContext.defaultTransaction = this.createTransaction()
        }
    }

    private get dbContext(): DbContext | null {
        const dbContext = this.asyncLocalStorage.getStore()
        return dbContext ?? null
    }

    private createTransaction(): DbTransaction {
        const queryRunner = this.dataSource.createQueryRunner()
        const reset = () => this.reset()

        return {
            queryRunner,
            async begin() {
                await queryRunner.startTransaction()
            },
            async commit() {
                await queryRunner.commitTransaction()
                reset()
            },
            async rollback() {
                await queryRunner.rollbackTransaction()
                reset()
            },
        }
    }
}
