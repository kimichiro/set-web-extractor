export namespace CronJobServiceDto {
    export namespace TriggerLoadSetApiRawData {
        export const CronExpression = '0 1 * * 2'

        export type Result = void
    }

    export namespace TriggerExtractSetApiRawData {
        export const CronExpression = '0 6 * * 2'

        export type Result = void
    }

    export namespace TriggerTransformSetApiRawData {
        export const CronExpression = '0 8 * * 2'

        export type Result = void
    }
}
