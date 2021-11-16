import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import Filter from "bad-words";
import _ from "lodash";
import WordData from "../model/WordData";
import { LetterFrequency, FrequencyType } from "../utils/LetterFrequency";

//https://en.wikipedia.org/wiki/Letter_frequency

const Word = (): JSX.Element => {
  const apiBatchSize = 10;
  const minWordLength = 5;
  const maxWordLength = 8;
  const spellingListLength = 20;
  const frequencyLower = 100.0;
  const frequencyUpper = 500.0;
  const history: React.MutableRefObject<string[]> = useRef(new Array<string>())

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [words, setWords]: [Array<WordData>, any] = useState([]);
  const badWords = new Filter();

  const letterFrequency = new LetterFrequency(FrequencyType.Dictionary);
  //console.log(letterFrequency)
  
  useEffect(() => {
    async function getWord(): Promise<WordData> {
      
      //  const randomLetter: string = String.fromCharCode(_.random(25) + 97);
      const randomLetter: string = letterFrequency.random();

      const randomWordTemplate: string =
        randomLetter +
        _.repeat("?", _.random(minWordLength - 1, maxWordLength - 1));
      const api = `https://api.datamuse.com/words?sp=${randomWordTemplate}&max=${apiBatchSize}&md=df`;
      
      console.log(api);

      const res = await axios.get(api);
      let words: Array<WordData> = res.data.map (
        (e: WordData) => new WordData(e)
      );
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
        <ul>
          {words?.map((e, index) => (
            <li key={index}>{e?.word ? e.word : null}</li>
          ))}
        </ul>
      ) : (
        "please wait"
      )}
    </div>
  );
};

export default Word;
