import { Injectable } from '@nestjs/common'
import { SetApiRawDataType } from '../../database/entity/enum.entity'
import { SymbolEntity } from '../../database/entity/symbol.entity'
import { SetApiRawDataRepository } from '../../database/repository/set-api-raw-data.repository'
import { SymbolRepository } from '../../database/repository/symbol.repository'
import { DbContextService } from '../../database/service/db-context.service'
import { SetExtractServiceDto as Dto } from './set-extract.service.dto'
import { SetHttpServiceDto } from './set-http.service.dto'

@Injectable()
export class SetExtractService {
    constructor(
        private readonly dbContextService: DbContextService,
        private readonly setApiRawDataRepository: SetApiRawDataRepository,
        private readonly symbolRepository: SymbolRepository,
    ) {}

    async upsertSymbolList(): Promise<Dto.UpsertSymbolList.Result> {
        let symbolEntities: SymbolEntity[] = []

        await this.dbContextService.run(async () => {
            const rawDataResult = await this.setApiRawDataRepository.find({
                where: {
                    type: SetApiRawDataType.SetStockList,
                    isExtracted: false,
                },
                order: {
                    createdAt: 'DESC',
                },
            })

            if (rawDataResult.length > 0) {
                const [rawData] = rawDataResult
                const setStockList =
                    rawData.data as SetHttpServiceDto.StockList.Result

                type PartialSymbolEntity = Pick<
                    SymbolEntity,
                    | 'symbol'
                    | 'securityType'
                    | 'nameEn'
                    | 'nameTh'
                    | 'market'
                    | 'industry'
                    | 'sector'
                >
                const partialEntities =
                    setStockList.securitySymbols.map<PartialSymbolEntity>(
                        security => ({
                            symbol: security.symbol.toUpperCase(),
                            securityType: security.securityType.toUpperCase(),
                            nameEn: security.nameEN,
                            nameTh: security.nameTH,
                            market: security.market.toUpperCase(),
                            industry: security.industry.toUpperCase(),
                            sector: security.sector.toUpperCase(),
                        }),
                    )

                await this.symbolRepository.upsert(
                    partialEntities,
                    {
                        conflictPaths: {
                            symbol: true,
                        },
                    },
                )

                symbolEntities = await this.symbolRepository.find()
            }
        })

        return symbolEntities
    }

    async updateSymbol(params: Dto.UpdateSymbol.Params): Promise<Dto.UpdateSymbol.Result> {
        const { symbol } = params

        const symbolEntity = await this.symbolRepository.findOne({
            where: {
                symbol,
            },
        })

        return symbolEntity
    }
}
