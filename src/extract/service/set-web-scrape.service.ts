import { Injectable } from '@nestjs/common'
import { PlaywrightCrawler } from 'crawlee'
import { SetWebScrapeServiceDto as Dto } from './set-web-scrape.service.dto'
import { LogService } from 'src/core/log/service/log.service'

@Injectable()
export class SetWebScrapeService {
    constructor(private readonly logService: LogService) {}

    async scrapeFinancialHighlight(): Promise<Dto.ScrapeFinancialHighlight.Result> {
        const logService = this.logService

        const result: Dto.ScrapeFinancialHighlight.Result = []
        const crawler = new PlaywrightCrawler({
            async requestHandler({ request, page, enqueueLinks }) {
                const title = await page.title()

                const url = request.loadedUrl
                logService.info(`Crawling url: ${url}`)

                const innerTexts = await page.getByRole('cell').allInnerTexts()
                result.push({
                    title,
                    url,
                    innerTexts,
                })

                await enqueueLinks({
                    globs: [
                        'https://www.set.or.th/en/market/product/stock/quote/*/financial-statement/company-highlights',
                    ],
                })
            },
        })

        await crawler.run([
            'https://www.set.or.th/en/market/product/stock/quote/ttb/price',
        ])

        return result
    }
}
