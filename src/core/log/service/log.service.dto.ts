export namespace LogServiceDto {
    export namespace Info {
        export type Params = [string, string]

        export type Result = void
    }

    export namespace Warn {
        export type Params = [string, string]

        export type Result = void
    }

    export namespace Error {
        export type Params = [string, string]

        export type Result = void
    }

    export namespace Debug {
        export type Params = [string, string]

        export type Result = void
    }
}
