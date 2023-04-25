import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { DeepPartial, Repository } from 'typeorm'
import { ProjectEntity } from '../entity/project.entity'
import { BaseRepository } from './base.repository'

@Injectable()
export class ProjectRepository extends BaseRepository<ProjectEntity> {
    constructor(
        @InjectRepository(ProjectEntity)
        projectRepository: Repository<ProjectEntity>,
    ) {
        super(projectRepository)
    }

    async insert(entityLike: DeepPartial<ProjectEntity>): Promise<void> {
        const result = await this.activateContext(
            entityManager => entityManager.insert(this.repository.target, entityLike),
            () => this.repository.insert(entityLike)
        )
        console.log(result)
    }
}
