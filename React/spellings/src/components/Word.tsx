import React, { useEffect, useState, useRef } from "react";
import Filter from "bad-words";
import _ from "lodash";
import WordData from "../model/WordData";
import {Config , IConfig} from '../config'
import {DataMuseApi, IDataMuseApi} from '../services/DataMuseApi'

//https://en.wikipedia.org/wiki/Letter_frequency

interface IWordProps {
  config? : IConfig | undefined,
  api? : IDataMuseApi | undefined
}

const Word = ({config, api } : IWordProps) : JSX.Element => {  

  const spellingListLength = 10;
  const frequencyLower = 100.0;
  const frequencyUpper = 500.0;
  const history: React.MutableRefObject<string[]> = useRef(new Array<string>())
  config = config || new Config();
  api = (api || new DataMuseApi(config as IConfig));
  
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [words, setWords]: [Array<WordData>, any] = useState([]);
  const badWords = new Filter();
  
  useEffect(() => {
    async function getWord(): Promise<WordData> {
    
      let words: Array<WordData> = await (api as IDataMuseApi).GetRandomWord();
      words = words.filter((e) => !badWords.isProfane(e));
      words = words.filter((e) => e.word && e.word?.indexOf(' ') === -1);
      words = words.filter(
        (e) =>
          e.defs &&
          e.frequency &&
          e.frequency >= frequencyLower &&
          e.frequency <= frequencyUpper
      );
      if (words.length === 0) {
        return getWord();
      }
      return words[_.random(words.length - 1)];
    }

    async function getWords(): Promise<Array<WordData>> {
      const spellings = new Array<WordData>();

      while (spellings.length < spellingListLength) {
        const word = await getWord();
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
      {words.length === spellingListLength ? (
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

export default Word;
