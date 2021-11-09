import React, {useEffect, useState, useRef} from 'react';
import config from '../config';
import BukowskiQuotes from '../data/Bukowski'

enum Phase {
    GetQuote = 1,
    ShowQuote = 2,
    HideQuote = 9
}

async function sleep(msec:number) {
    return new Promise(resolve => setTimeout(resolve, msec));
}

const Quote = () => {

    const [quote, setQuote]: [string, Function] = useState('');
    const [quoteVisible, setQuoteVisible]: [boolean, Function] = useState(false);
    const quoteVisibleRef: React.MutableRefObject<boolean> = useRef(false);
    const quoteNumberRef: React.MutableRefObject<number> = useRef(config.quoteNumber !== null ? config.quoteNumber - 1 : 0);
   
    const showQuote = (show: boolean)=> {
        quoteVisibleRef.current = show;    
        setQuoteVisible(quoteVisibleRef.current);
    }

    useEffect(() => {
   
        const getQuote = async (callback:(quote:string) => void): Promise<void> => {

            await sleep(750);

            if(config.quoteNumber === null){
                quoteNumberRef.current = quoteNumberRef.current < BukowskiQuotes.length - 1 ? quoteNumberRef.current + 1 : 0;
            }
            callback(BukowskiQuotes[quoteNumberRef.current]);
        }

        let count: number = 0;
        
        setInterval(() => {
            let phase = count % 10 + 1;

            if(phase === Phase.GetQuote){
                getQuote(quote => setQuote(quote));
            }
            else if(phase === Phase.ShowQuote){
                showQuote(true)
            }
            else if(phase === Phase.HideQuote) {
                showQuote(false)
            }
            count = count + 1;
          
        } ,config.interval);
    }, []);

return <div className="d-flex flex-column justify-content-between align-items-end quote-background">
            <div className="heading d-flex justify-content-end">
                <small>Bukowski</small>
            </div>
            <div className={"quote" + (quoteVisible ? "" : " hidden")}>
                <div className={"fadein-text" + (quoteVisible ? "" : " hidden")}>
                    <pre>{quote}</pre>
                </div>
            </div>
            <div>&nbsp;</div>
        </div>
}

export default Quote;