import { Module } from '@nestjs/common'
import { CoreModule } from '../core/core.module'
import { DatabaseModule } from '../database/database.module'
import { SetCollectionService } from './service/set-collection.service'
import { SetHttpService } from './service/set-http.service'

@Module({
    imports: [CoreModule, DatabaseModule],
    providers: [SetCollectionService, SetHttpService],
    exports: [SetCollectionService, SetHttpService],
})
export class EtlModule {}
