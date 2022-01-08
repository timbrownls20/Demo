import React, { useEffect, useState, useRef } from "react";
import { WaitFor } from "./Wait";
import styles from "./Quote.module.css";

enum Phase {
  GetQuote = 1,
  ShowQuote = 2,
  QuoteVisible = 3,
  HideQuote = 10,
}

export interface IDataItem {
  id: number,
  text: string
}

export interface IDataLoader {
  first:() => IDataItem; 
  next: (lastItem: number) => IDataItem;
}

interface IQuoteProp {
  interval: number,
  dataLoader: IDataLoader
}

const Quote = ({interval, dataLoader } : IQuoteProp) => {

  const firstItem = dataLoader.first();

  const [quote, setQuote] = useState<string>(firstItem.text);
  const [quoteVisible, setQuoteVisible] = useState<boolean>(true);
  const quoteVisibleRef = useRef<boolean>(false);
  const quoteNumberRef = useRef<number>(firstItem.id);
  const [phase, setPhase] = useState<Phase>(Phase.QuoteVisible);

  const showQuote = (show: boolean) => {
    quoteVisibleRef.current = show;
    setQuoteVisible(quoteVisibleRef.current);
  };

  useEffect(() => {
    const getQuote = async (
      callback: (quote: string) => void
    ): Promise<void> => {
      
      //half way through the phase
      await WaitFor(interval/2);

      const nextItem = dataLoader.next(0);
      quoteNumberRef.current = nextItem.id;
      callback(nextItem.text);
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
