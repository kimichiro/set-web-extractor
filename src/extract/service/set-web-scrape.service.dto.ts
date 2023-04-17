export namespace SetWebScrapeServiceDto {
    export namespace ScrapeFinancialHighlight {
        export type Result = Array<{
            title: string
            url: string
            innerTexts: string[]
        }>
    }
}
