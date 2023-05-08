import { FinancialRatioEntity } from './financial-ratio.entity'
import { FinancialStatementEntity } from './financial-statement.entity'
import { ReportBasicInfoEntity } from './report-basic-info.entity'
import { SetApiRawDataEntity } from './set-api-raw-data.entity'
import { SymbolEntity } from './symbol.entity'
import { TradingStatEntity } from './trading-stat.entity'

export default [
    SetApiRawDataEntity,
    SymbolEntity,
    FinancialStatementEntity,
    FinancialRatioEntity,
    TradingStatEntity,
    ReportBasicInfoEntity,
]
