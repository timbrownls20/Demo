/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState, useRef } from "react";
import Filter from "bad-words";
import _ from "lodash";
import WordData from "../model/WordData";
import { Config } from "../config";
import { DataMuseApi, IDataMuseApi } from "../services/DataMuseApi";
import { SpellingDifficulty } from "../model/SpellingDifficulty";

//https://en.wikipedia.org/wiki/Letter_frequency
//https://github.com/aruljohn/popular-baby-names

const SpellingList = (): JSX.Element => {
  const spellingDifficulty = new SpellingDifficulty();
  const wordSetting = spellingDifficulty.getWordSettings(Config.difficulty);

  const history: React.MutableRefObject<string[]> = useRef(new Array<string>());
  const foundWordCountRef: React.MutableRefObject<number> = useRef(0);
  const api = new DataMuseApi(
    Config,
    wordSetting.wordLengthLower,
    wordSetting.wordLengthUpper
  );

  const [words, setWords]: [Array<WordData>, any] = useState([]);
  const [foundWordCount, setFoundWordCount]: [number, any] = useState(0);
  const badWords = new Filter();

  const getWaitMessage = (wordCount: number): string => {
    if (wordCount == 0) return "please wait";
    else if (wordCount == 1) return `${foundWordCount} word found`;
    else return `${foundWordCount} words found`;
  };

  useEffect(() => {
    async function getWord(attempt: number): Promise<WordData> {
      if (attempt > Config.maxTrys) {
        throw new Error("word not found");
      }

      let words: Array<WordData> = await (api as IDataMuseApi).GetRandomWord();
      words = words.filter((e) => !badWords.isProfane(e.word));
      words = words.filter((e) => e.word && e.word?.indexOf(" ") === -1);
      words = words.filter(
        (e) =>
          e.defs &&
          e.frequency &&
          e.frequency >= wordSetting.frequencyLower &&
          e.frequency <= wordSetting.frequencyUpper
      );

      if (words.length === 0) {
        return getWord(++attempt);
      }

      setFoundWordCount(++foundWordCountRef.current);
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

      return _.sortBy(spellings, (o) => o.word);
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
            <li className="list-group-item" key={index}>
              {e?.word ? e.word : null}
            </li>
          ))}
        </ul>
      ) : (
        getWaitMessage(foundWordCount)
      )}
    </div>
  );
};

export default SpellingList;
