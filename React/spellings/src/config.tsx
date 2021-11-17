export interface IConfig {
  apiBatchSize: number;
  maxTrys: number;
  spellingListLength: number;
  frequencyLower: number;
  frequencyUpper: number;
}

export const Config: IConfig = {
  apiBatchSize: 500,
  maxTrys: 10,
  spellingListLength: 10,
  frequencyLower: 100.0,
  frequencyUpper: 500.0,
};
