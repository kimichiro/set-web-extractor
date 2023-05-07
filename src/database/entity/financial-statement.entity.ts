import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { BaseEntity } from './base.entity'
import { SymbolEntity } from './symbol.entity'

@Entity({ name: 'financial_statement' })
export class FinancialStatementEntity extends BaseEntity {
    @PrimaryGeneratedColumn({ type: 'bigint' })
    id: number

    @ManyToOne(() => SymbolEntity, symbol => symbol.financialStatements, {
        nullable: false,
    })
    symbol: SymbolEntity

    @Column({ type: 'timestamptz', nullable: true })
    beginAt: Date

    @Column({ type: 'timestamptz', nullable: true })
    endAt: Date

    @Column({ type: 'smallint' })
    year: number

    @Column({ type: 'text', nullable: true })
    status: string

    @Column({ type: 'text' })
    accountCode: string

    @Column({ type: 'text', nullable: true })
    accountName: string

    @Column({ type: 'boolean', nullable: true })
    isAdjusted: boolean

    @Column({ type: 'decimal', nullable: true })
    amount: number

    @Column({ type: 'integer', nullable: true })
    divider: number

    @Column({ type: 'text', nullable: true })
    format: string

    @Column({ type: 'integer', nullable: true })
    level: number
}
