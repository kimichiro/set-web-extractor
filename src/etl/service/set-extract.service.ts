import { Injectable } from '@nestjs/common'
import { SetApiRawDataType } from '../../database/entity/enum.entity'
import { SymbolEntity } from '../../database/entity/symbol.entity'
import { SetApiRawDataRepository } from '../../database/repository/set-api-raw-data.repository'
import { SymbolRepository } from '../../database/repository/symbol.repository'
import { DbContextService } from '../../database/service/db-context.service'
import { SetExtractServiceDto as Dto } from './set-extract.service.dto'
import { SetHttpServiceDto } from './set-http.service.dto'
import { JsonContains } from 'typeorm'

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
            const defaultTransaction =
                this.dbContextService.getDefaultTransaction()

            await defaultTransaction.begin()

            const setStockListResult = await this.setApiRawDataRepository.find({
                where: {
                    type: SetApiRawDataType.SetStockList,
                    isExtracted: false,
                },
                order: {
                    createdAt: 'DESC',
                },
            })

            if (setStockListResult.length > 0) {
                const [rawData] = setStockListResult
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
                            market: true,
                            symbol: true,
                        },
                    },
                )

                symbolEntities = await this.symbolRepository.find()

                await this.setApiRawDataRepository.update(setStockListResult.map(({ id }) => id), {
                    isExtracted: true,
                })
            }

            await defaultTransaction.commit()
        })

        return symbolEntities
    }

    async updateSymbol(params: Dto.UpdateSymbol.Params): Promise<Dto.UpdateSymbol.Result> {
        const { symbol } = params

        let symbolEntity: SymbolEntity

        await this.dbContextService.run(async () => {
            const defaultTransaction =
                this.dbContextService.getDefaultTransaction()

            await defaultTransaction.begin()

            const setApiRawDataIds: number[] = []

            symbolEntity = await this.symbolRepository.findOne({
                where: {
                    symbol,
                },
            })
            if (symbolEntity != null) {
                const setStockSymbolIndexListResult = await this.setApiRawDataRepository.find({
                    where: {
                        type: SetApiRawDataType.SetStockSymbolIndexList,
                        data: JsonContains({ symbol }),
                        isExtracted: false,
                    },
                    order: {
                        createdAt: 'DESC',
                    },
                })
                if (setStockSymbolIndexListResult.length > 0) {
                    const [rawData] = setStockSymbolIndexListResult
                    const setStockIndexList =
                        rawData.data as SetHttpServiceDto.StockSymbolIndexList.Result

                    const indices = setStockIndexList.otherIndices.map(index => index.toUpperCase())

                    await this.symbolRepository.update(symbolEntity.id, {
                        indices,
                    })

                    setStockSymbolIndexListResult.forEach(({ id }) => setApiRawDataIds.push(id))
                }

                const setStockSymbolRelatedProductOResult = await this.setApiRawDataRepository.find({
                    where: {
                        type: SetApiRawDataType.SetStockSymbolRelatedProductO,
                        data: JsonContains({ symbol }),
                        isExtracted: false,
                    },
                    order: {
                        createdAt: 'DESC',
                    },
                })
                const setStockSymbolRelatedProductWResult = await this.setApiRawDataRepository.find({
                    where: {
                        type: SetApiRawDataType.SetStockSymbolRelatedProductW,
                        data: JsonContains({ symbol }),
                        isExtracted: false,
                    },
                    order: {
                        createdAt: 'DESC',
                    },
                })
                let relatedProducts: string[] = []
                if (setStockSymbolRelatedProductOResult.length > 0) {
                    const [rawData] = setStockSymbolRelatedProductOResult
                    const setStockSymbolRelatedProductO =
                        rawData.data as SetHttpServiceDto.StockSymbolRelatedProductOthers.Result

                    relatedProducts = setStockSymbolRelatedProductO.relatedProducts.reduce(
                        (acc, p) => [...acc, p.symbol],
                        relatedProducts
                    )
                }
                if (setStockSymbolRelatedProductWResult.length > 0) {
                    const [rawData] = setStockSymbolRelatedProductWResult
                    const setStockSymbolRelatedProductW =
                        rawData.data as SetHttpServiceDto.StockSymbolRelatedProductWarrants.Result

                    relatedProducts = setStockSymbolRelatedProductW.relatedProducts.reduce(
                        (acc, p) => [...acc, p.symbol],
                        relatedProducts
                    )
                }
                relatedProducts = relatedProducts.filter(s => s !== symbol)

                await this.symbolRepository.update(symbolEntity.id, {
                    relatedProducts,
                })

                setStockSymbolRelatedProductOResult.forEach(({ id }) => setApiRawDataIds.push(id))
                setStockSymbolRelatedProductWResult.forEach(({ id }) => setApiRawDataIds.push(id))
            }

            await this.setApiRawDataRepository.update(setApiRawDataIds, {
                isExtracted: true,
            })

            await defaultTransaction.commit()
        })

        return symbolEntity
    }
}
