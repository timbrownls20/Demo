import React, { useEffect, useState } from "react";
import axios from "axios";
import Filter from "bad-words";
import _ from "lodash";
import WordData from "../model/WordData";

//https://www.npmjs.com/package/bad-words
//https://www.datamuse.com/api/
//..api call https://api.datamuse.com/words?sp=t???&max=1000
//https://api.datamuse.com/words?sp=t???&max=100&md=df

const Word = (): JSX.Element => {
  const apiBatchSize = 10;
  const minWordLength = 4;
  const maxWordLength = 8;
  const spellingListLength = 10;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [words, setWords]: [Array<WordData>, any] = useState([]);
  const badWords = new Filter();

  useEffect(() => {
    async function getWord(): Promise<WordData> {
      const randomLetter: string = String.fromCharCode(_.random(25) + 97);
      const randomWordTemplate: string =
        randomLetter +
        _.repeat("?", _.random(minWordLength - 1, maxWordLength - 1));
      const api = `https://api.datamuse.com/words?sp=${randomWordTemplate}&max=${apiBatchSize}&md=df`;
      const frequencyLower = 500.0;
      const frequencyUpper = 10000.0;

      console.log(api);

      const res = await axios.get(api);
      let words: Array<WordData> = res.data.map(
        (e: WordData) => new WordData(e)
      );
      words = words.filter((e) => !badWords.isProfane(e));
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
        if (!spellings.includes(word)) {
          spellings.push(word);
        }
      }

      return spellings;
    }

    getWords()
      .then((data) => setWords(data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="p-4">
      {words.length > 5 ? (
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
