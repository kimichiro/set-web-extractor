import { AsyncLocalStorage } from 'async_hooks'
import { Injectable } from '@nestjs/common'
import { DataSource, QueryRunner } from 'typeorm'
import { InjectDataSource } from '@nestjs/typeorm'
import { LogService } from '../../core/log/service/log.service'

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
        private readonly logService: LogService,
        private readonly asyncLocalStorage: AsyncLocalStorage<DbContext>,
        @InjectDataSource('default') private readonly dataSource: DataSource,
    ) {}

    getDefaultTransaction(): DbTransaction | null {
        return this.dbContext?.defaultTransaction ?? null
    }

    async run(next: () => void | Promise<void>): Promise<void> {
        await new Promise(resolve => {
            this.asyncLocalStorage.run(
                {
                    defaultTransaction: this.createTransaction(),
                },
                async () => {
                    try {
                        await next()
                    } catch (error) {
                        this.logService.error(
                            `Context callback error - [${error?.response?.status}] ${error.message}`,
                            DbContextService.name,
                        )
                    } finally {
                        resolve(true)
                    }
                },
            )
        })
    }

    private get dbContext(): DbContext | null {
        const dbContext = this.asyncLocalStorage.getStore()
        return dbContext ?? null
    }

    private createTransaction(): DbTransaction {
        const queryRunner = this.dataSource.createQueryRunner()
        const logService = this.logService

        return {
            queryRunner,
            async begin() {
                await queryRunner.startTransaction()
            },
            async commit() {
                try {
                    await queryRunner.commitTransaction()
                } catch (error) {
                    logService.error(
                        `Database error - [${error?.response?.status}] ${error.message}`,
                        DbContextService.name,
                    )
                } finally {
                    await queryRunner.release()
                }
            },
            async rollback() {
                try {
                    await queryRunner.rollbackTransaction()
                } catch (error) {
                    logService.error(
                        `Database error - [${error?.response?.status}] ${error.message}`,
                        DbContextService.name,
                    )
                } finally {
                    await queryRunner.release()
                }
            },
        }
    }
}
