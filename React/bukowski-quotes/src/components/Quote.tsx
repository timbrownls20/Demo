import React, {useEffect, useState, useRef} from 'react';
import config from '../config';
import BukowskiQuotes from '../data/Bukowski'

enum Phase {
    GetQuote = 1,
    ShowQuote = 2,
    HideQuote = 9
}

const Quote = () => {

    const [quote, setQuote]: [string, Function] = useState('');
    const [quoteVisible, setQuoteVisible]: [boolean, Function] = useState(false);
    const quoteVisibleRef: React.MutableRefObject<boolean> = useRef(false);
   
    const showQuote = (show: boolean)=> {
        quoteVisibleRef.current = show;    
        setQuoteVisible(quoteVisibleRef.current);
    }

    useEffect(() => {
   
        let count: number = 0;
        let quoteNumber: number = config.quoteNumber !== null ? config.quoteNumber - 1 : 0;
        setQuote(BukowskiQuotes[quoteNumber])
        
        setInterval(() => {
            count = count + 1;
            let phase = count % 10 + 1;

            if(phase === Phase.GetQuote){

                if(config.quoteNumber === null){
                    quoteNumber = quoteNumber < BukowskiQuotes.length - 1 ? quoteNumber + 1 : 0;
                }
                                
                setQuote(BukowskiQuotes[quoteNumber])
            }
            else if(phase === Phase.ShowQuote){
                showQuote(true)
            }
            else if(phase === Phase.HideQuote) {
                showQuote(false)
            }
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