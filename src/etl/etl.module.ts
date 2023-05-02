import { Module } from '@nestjs/common'
import { CoreModule } from '../core/core.module'
import { DatabaseModule } from '../database/database.module'
import { SetCollectionService } from './service/set-collection.service'
import { SetExtractService } from './service/set-extract.service'
import { SetHttpService } from './service/set-http.service'

@Module({
    imports: [CoreModule, DatabaseModule],
    providers: [SetCollectionService, SetExtractService, SetHttpService],
    exports: [SetCollectionService, SetExtractService, SetHttpService],
})
export class EtlModule {}
