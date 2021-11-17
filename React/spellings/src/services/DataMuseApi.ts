import axios from "axios";
import _ from "lodash";
import WordData from "../model/WordData";
import { LetterFrequency, FrequencyType } from "../services/LetterFrequency";
import { IConfig } from "../config";

export interface IDataMuseApi {
    GetRandomWord(): Promise<Array<WordData>>;  
}

export class DataMuseApi implements IDataMuseApi {
  constructor(public config: IConfig) {}

  public async GetRandomWord(): Promise<Array<WordData>> {
    const minWordLength = 5;
    const maxWordLength = 8;
    const letterFrequency = new LetterFrequency(FrequencyType.Dictionary);

    const randomLetter: string = letterFrequency.random();

    const randomWordTemplate: string =
      randomLetter +
      _.repeat("?", _.random(minWordLength - 1, maxWordLength - 1));
    const api = `https://api.datamuse.com/words?sp=${randomWordTemplate}&max=${this.config.apiBatchSize}&md=df`;

    console.log(api);

    const res = await axios.get(api);
    const words: Array<WordData> = res.data.map(
      (e: WordData) => new WordData(e)
    );

    return words;
  }
}



