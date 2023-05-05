import { Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm'
import { BaseEntity } from './base.entity'

@Entity({ name: 'symbol' })
@Unique(['market', 'symbol'])
export class SymbolEntity extends BaseEntity {
    @PrimaryGeneratedColumn({ type: 'bigint' })
    id: number

    @Column({ type: 'text' })
    market: string

    @Column({ type: 'text' })
    symbol: string

    @Column({ type: 'text' })
    securityType: string

    @Column({ type: 'text' })
    nameTh: string

    @Column({ type: 'text' })
    nameEn: string

    @Column({ type: 'text' })
    industry: string

    @Column({ type: 'text' })
    sector: string

    @Column({ type: 'jsonb', nullable: true })
    indices: string[]

    @Column({ type: 'jsonb', nullable: true })
    relatedProducts: string[]
}
