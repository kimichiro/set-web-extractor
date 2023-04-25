import { Module } from '@nestjs/common'
import { SetExtractService } from './service/set-extract.service'
import { CoreModule } from 'src/core/core.module'
import { DatabaseModule } from '../database/database.module'
import { SetHttpService } from './service/set-http.service'

@Module({
    imports: [CoreModule, DatabaseModule],
    providers: [SetExtractService, SetHttpService],
    exports: [SetExtractService, SetHttpService],
})
export class EtlModule {}
