import React, {useEffect, useState} from 'react';
import axios from 'axios';
import _ from 'lodash';
import WordData from '../model/WordData'

//https://www.npmjs.com/package/bad-words
//https://www.datamuse.com/api/
//..api call https://api.datamuse.com/words?sp=t???&max=1000
//https://api.datamuse.com/words?sp=t???&max=100&md=df

const Word = (): JSX.Element => {

    const maxWords = 100;
    const minWordLength = 3;
    const maxWordLength = 12;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [word, setWord]: [WordData, any] = useState({} as WordData);

    useEffect(() => {

    
        async function getWord() {
            
            const randomLetter:string = String.fromCharCode(_.random(25) + 97); 
            const randomWordTemplate:string = randomLetter + _.repeat("?", _.random(minWordLength-1, maxWordLength-1));
            const api = `https://api.datamuse.com/words?sp=${randomWordTemplate}&max=${maxWords}&md=df`;
            const frequencyLower = 0.0;
            const frequencyUpper = 0.01;

            console.log(api);

            const res = await axios.get(api);
             let words: Array<WordData> = res.data.map(e => new WordData(e));
            words = words.filter(e => e.defs && e.frequency && e.frequency >= frequencyLower && e.frequency <= frequencyUpper);
       
            //.. recurse through until get a word. Some combinations are rare so don't use them
            console.log(JSON.stringify(words))
            if(words.length === 0){
                getWord();
            } 
            
            setWord(words[_.random(words.length - 1)]);
           
        }
        getWord();

    }, [])

    return (
        <div className="p-4">{word?.word ? JSON.stringify(word) : 'please wait'}</div>
    )
}

export default Word;
