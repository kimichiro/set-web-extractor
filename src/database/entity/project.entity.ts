import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'
import { BaseEntity } from './base.entity'

@Entity({ name: 'project' })
export class ProjectEntity extends BaseEntity {
    @PrimaryGeneratedColumn({ type: 'bigint' })
    id: number

    @Column({ type: 'text', nullable: true })
    repositoryAccessToken?: string

    @Column({ type: 'integer', default: 1 })
    releaseCandidateNumber: number

    @Column({ type: 'integer', default: 2 })
    releaseCandidateNumber2: number
}
