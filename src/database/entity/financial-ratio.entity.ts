import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { BaseEntity } from './base.entity'
import { SymbolEntity } from './symbol.entity'

@Entity({ name: 'financial_ratio' })
export class FinancialRatioEntity extends BaseEntity {
    @PrimaryGeneratedColumn({ type: 'bigint' })
    id: number

    @ManyToOne(() => SymbolEntity, symbol => symbol.financialRatios, {
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
    accountName: string

    @Column({ type: 'decimal', nullable: true })
    value: number
}
