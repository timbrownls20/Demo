
export interface IConfig {
    apiBatchSize: number;
}

export class Config implements IConfig {
    apiBatchSize = 500;
}

