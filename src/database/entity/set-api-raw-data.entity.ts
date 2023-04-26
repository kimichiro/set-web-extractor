import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'
import { BaseEntity } from './base.entity'
import { SetApiRawDataType } from './enum.entity'

@Entity({ name: 'set_api_raw_data' })
export class SetApiRawDataEntity extends BaseEntity {
    @PrimaryGeneratedColumn({ type: 'bigint' })
    id: number

    @Column({
        type: 'enum',
        enum: SetApiRawDataType,
        default: SetApiRawDataType.Unknown,
    })
    type: SetApiRawDataType

    @Column({ type: 'text' })
    url: string

    @Column({ type: 'jsonb' })
    data: object

    @Column({ type: 'bool' })
    isExtracted: boolean
}
