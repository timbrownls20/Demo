import { DifficultyLevel } from "./model/SpellingDifficulty";

export interface IConfig {
  apiBatchSize: number;
  maxTrys: number;
  spellingListLength: number;
  difficulty: DifficultyLevel;
}

export const Config: IConfig = {
  apiBatchSize: 100,
  maxTrys: 10,
  spellingListLength: 10,
  difficulty: DifficultyLevel.Hard,
};
