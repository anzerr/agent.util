import Result from "./src/result";

declare class Result {
    data: any;

    isPhone(): boolean;
    isTablet(): boolean;
    isComputer(): boolean;
    os(): string;
    version(key: string): string;
}

declare class Config {
    timeout?: number;
    sortTick?: number;
}

declare class UserAgent {
    constructor(config?: Config);
    get(userAgent: string, simple?: boolean): Result;
    metric(): {[key: string]: {[key: string]: number}};
    close(): void;
}
export {UserAgent};