import {
    Column,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
    Unique,
} from 'typeorm'
import { BaseEntity } from './base.entity'
import { FinancialStatementEntity } from './financial-statement.entity'
import { TradingStatEntity } from './trading-stat.entity'
import { FinancialRatioEntity } from './financial-ratio.entity'

@Entity({ name: 'symbol' })
@Unique(['market', 'symbol'])
export class SymbolEntity extends BaseEntity {
    @PrimaryGeneratedColumn({ type: 'bigint' })
    id: number

    @Column({ type: 'text' })
    market: string

    @Column({ type: 'text' })
    symbol: string

    @Column({ type: 'text', nullable: true })
    securityType: string

    @Column({ type: 'text', nullable: true })
    nameTh: string

    @Column({ type: 'text', nullable: true })
    nameEn: string

    @Column({ type: 'text', nullable: true })
    industry: string

    @Column({ type: 'text', nullable: true })
    sector: string

    @Column({ type: 'jsonb', nullable: true })
    indices: string[]

    @Column({ type: 'jsonb', nullable: true })
    relatedProducts: string[]

    @OneToMany(
        () => FinancialStatementEntity,
        financialStatement => financialStatement.symbol,
    )
    financialStatements: FinancialStatementEntity[]

    @OneToMany(
        () => FinancialRatioEntity,
        financialRatio => financialRatio.symbol,
    )
    financialRatios: FinancialRatioEntity[]

    @OneToMany(() => TradingStatEntity, tradingStat => tradingStat.symbol)
    tradingStats: TradingStatEntity[]
}
