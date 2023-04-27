import { Controller, Get, Param } from '@nestjs/common'
import { SetCollectionService } from '../../etl/service/set-collection.service'
import { CollectionControllerDto as Dto } from './collection.controller.dto'

@Controller(Dto.Name)
export class CollectionController {
    constructor(private readonly setExtractService: SetCollectionService) {}

    @Get(Dto.HttpGetListSymbol.Endpoint)
    httpGetListSymbol(): Promise<Dto.HttpGetListSymbol.Response> {
        return this.setExtractService.listSymbol()
    }

    @Get(Dto.HttpGetFetchSymbol.Endpoint)
    httpGetFetchSymbol(
        @Param(Dto.HttpGetFetchSymbol.Param.Symbol) symbol: string,
    ): Promise<Dto.HttpGetFetchSymbol.Response> {
        return this.setExtractService.fetchSymbol({ symbol })
    }
}
