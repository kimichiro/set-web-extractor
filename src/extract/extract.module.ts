import { Module } from '@nestjs/common'
import { SetWebScrapeService } from './service/set-web-scrape.service'
import { CoreModule } from 'src/core/core.module'

@Module({
    imports: [
        CoreModule,
    ],
    providers: [
        SetWebScrapeService,
    ],
    exports: [
        SetWebScrapeService,
    ],
})
export class ExtractModule {}
