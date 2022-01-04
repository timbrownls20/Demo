import React, { useEffect, useState, useRef } from "react";
import styles from "./Quote.module.css";

enum Phase {
  GetQuote = 1,
  ShowQuote = 2,
  QuoteVisible = 3,
  HideQuote = 10,
}

async function sleep(msec: number) {
  return new Promise((resolve) => setTimeout(resolve, msec));
}

interface IQuoteProp {
  interval: number,
  data: Array<string>
}

//.. TODO account for empty data

const Quote = ({interval, data } : IQuoteProp) => {
  const [quote, setQuote]: [string, Function] = useState(data[0]);
  const [quoteVisible, setQuoteVisible]: [boolean, Function] = useState(true);
  const quoteVisibleRef: React.MutableRefObject<boolean> = useRef(false);
  const quoteNumberRef: React.MutableRefObject<number> = useRef(0);
  const [phase, setPhase]: [number, Function] = useState(Phase.QuoteVisible);

  const showQuote = (show: boolean) => {
    quoteVisibleRef.current = show;
    setQuoteVisible(quoteVisibleRef.current);
  };

  useEffect(() => {
    const getQuote = async (
      callback: (quote: string) => void
    ): Promise<void> => {
      
      //half way through the phase
      await sleep(interval/2);

      quoteNumberRef.current =
        quoteNumberRef.current < data.length - 1
          ? quoteNumberRef.current + 1
          : 0;
      callback(data[quoteNumberRef.current]);
    };

    let count: number = phase;

    setInterval(() => {
      let phase = (count % 10) + 1;
      setPhase(phase);

      if (phase === Phase.GetQuote) {
        getQuote((quote) => setQuote(quote));
      } else if (phase === Phase.ShowQuote) {
        showQuote(true);
      } else if (phase === Phase.HideQuote) {
        showQuote(false);
      }
      count = count + 1;
    }, interval);
  }, []);

  return (
    <div className={styles.quote + (quoteVisible ? "" : ` ${styles.hidden}`)}>
      <div className={styles.fadeintext + (quoteVisible ? "" : ` ${styles.hidden}`)}>
        <pre>{quote}</pre>
      </div>
    </div>
  );
};

export default Quote;
