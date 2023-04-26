import { Module } from '@nestjs/common'
import { CollectionController } from './controller/collection.controller'
import { EtlModule } from 'src/etl/etl.module'

@Module({
    imports: [EtlModule],
    controllers: [CollectionController],
})
export class ApiModule {}
