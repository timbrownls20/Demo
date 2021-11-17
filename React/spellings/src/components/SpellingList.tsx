import React, { useEffect, useState, useRef } from "react";
import Filter from "bad-words";
import _ from "lodash";
import WordData from "../model/WordData";
import { Config , IConfig} from '../config'
import {DataMuseApi, IDataMuseApi} from '../services/DataMuseApi'

//https://en.wikipedia.org/wiki/Letter_frequency

interface IWordProps {
  config? : IConfig | undefined,
  api? : IDataMuseApi | undefined
}

const SpellingList = ({ api } : IWordProps) : JSX.Element => {  

  const history: React.MutableRefObject<string[]> = useRef(new Array<string>())
  api = (api || new DataMuseApi(Config));
  
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [words, setWords]: [Array<WordData>, any] = useState([]);
  const badWords = new Filter();
  
  useEffect(() => {
    async function getWord(attempt: number): Promise<WordData> {
    
      if(attempt > Config.maxTrys){
        throw new Error("word not found");
      }

      let words: Array<WordData> = await (api as IDataMuseApi).GetRandomWord();
      words = words.filter((e) => !badWords.isProfane(e));
      words = words.filter((e) => e.word && e.word?.indexOf(' ') === -1);
      words = words.filter(
        (e) =>
          e.defs &&
          e.frequency &&
          e.frequency >= Config.frequencyLower &&
          e.frequency <= Config.frequencyUpper
      );

      if (words.length === 0) {
        return getWord(++attempt);
      }
      return words[_.random(words.length - 1)];
    }

    async function getWords(): Promise<Array<WordData>> {
      const spellings = new Array<WordData>();

      while (spellings.length < Config.spellingListLength) {
        const word = await getWord(0);
        if (word.word && !history.current.includes(word.word)) {
          spellings.push(word);
          history.current.push(word.word);
        }
      }

      return _.sortBy(spellings, (o => o.word));
    }

    getWords()
      .then((data) => setWords(data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="p-4">
      {words.length === Config.spellingListLength ? (
        <ul className="list-group">
          {words?.map((e, index) => (
            <li className="list-group-item" key={index}>{e?.word ? e.word : null}</li>
          ))}
        </ul>
      ) : (
        "please wait"
      )}
    </div>
  );
};

export default SpellingList;
