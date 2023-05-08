import { Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm'
import { BaseEntity } from './base.entity'

@Entity({ name: 'report_basic_info' })
@Unique(['market', 'symbol', 'year'])
export class ReportBasicInfoEntity extends BaseEntity {
    @PrimaryGeneratedColumn({ type: 'bigint' })
    id: number

    @Column({ type: 'text' })
    market: string

    @Column({ type: 'text' })
    symbol: string

    @Column({ type: 'text', nullable: true })
    industry: string

    @Column({ type: 'text', nullable: true })
    sector: string

    @Column({ type: 'jsonb', nullable: true })
    indices: string[]

    @Column({ type: 'smallint' })
    year: number

    @Column({ type: 'decimal', nullable: true })
    totalAssets: number

    @Column({ type: 'decimal', nullable: true })
    totalLiabilities: number

    @Column({ type: 'decimal', nullable: true })
    shareHolderEquities: number

    @Column({ type: 'decimal', nullable: true })
    totalRevenues: number

    @Column({ type: 'decimal', nullable: true })
    netProfits: number

    @Column({ type: 'decimal', nullable: true })
    returnOnEquity: number

    @Column({ type: 'decimal', nullable: true })
    netProfitMargin: number

    @Column({ type: 'decimal', nullable: true })
    priceToEarning: number

    @Column({ type: 'decimal', nullable: true })
    priceToBookingValue: number
}
