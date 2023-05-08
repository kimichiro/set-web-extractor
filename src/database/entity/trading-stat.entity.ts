import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { BaseEntity } from './base.entity'
import { SymbolEntity } from './symbol.entity'

@Entity({ name: 'trading_stat' })
export class TradingStatEntity extends BaseEntity {
    @PrimaryGeneratedColumn({ type: 'bigint' })
    id: number

    @ManyToOne(() => SymbolEntity, symbol => symbol.tradingStats, {
        nullable: false,
    })
    symbol: SymbolEntity

    @Column({ type: 'timestamptz', nullable: true })
    dataDate: Date

    @Column({ type: 'timestamptz', nullable: true })
    financialDate: Date

    @Column({ type: 'smallint' })
    year: number

    @Column({ type: 'decimal', nullable: true })
    open: number

    @Column({ type: 'decimal', nullable: true })
    high: number

    @Column({ type: 'decimal', nullable: true })
    low: number

    @Column({ type: 'decimal', nullable: true })
    close: number

    @Column({ type: 'decimal', nullable: true })
    par: number

    @Column({ type: 'decimal', nullable: true })
    pe: number

    @Column({ type: 'decimal', nullable: true })
    pbv: number

    @Column({ type: 'decimal', nullable: true })
    totalValue: number

    @Column({ type: 'decimal', nullable: true })
    totalVolume: number

    @Column({ type: 'decimal', nullable: true })
    dividendPayoutRatio: number
}
