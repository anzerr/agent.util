import Result from "./src/result";

declare class Result {
    data: any;
    isPhone: boolean;
    isTablet: boolean;
    isComputer: boolean;
    size: number;
    os: string;
    version(key: string): string;
}

declare class UserAgentConfig {
    timeout?: number;
    sortTick?: number;
}

declare class Rule {
    metric(): {[key: string]: {[key: string]: number}};
    sort(): void;
}

declare class UserAgent {
    rules: Rule;
    constructor(config?: UserAgentConfig);
    get(userAgent: string, simple?: boolean): Result;
    close(): void;
}
export {UserAgent};