class Word {
  private _frequency?: number;
  
  public tags?: Array<string>;
  public word?: string;
  public score?: number;
  public defs?: Array<string>;

  //   constructor(
  //     public word: string | null = null,
  //     public score: number | null = null,
  //     public tags: Array<string> | null = null,
  //     public defs: Array<string> | null = null
  constructor({ word, score, tags, defs }: { word?: string, score?: number, tags?: Array<string>, defs?: Array<string> }) {
    
    this.tags = tags;
    this.score = score;
    this.word = word;
    this.defs = defs;

    this._frequency = this.tags
      ? this.tags.reduce((acc, curr) => {
          const arr = curr.split(":");
          if (arr.length == 2 && arr[0] == "f") {
            acc = Number.parseFloat(arr[1]);
          }
          return acc;
        }, 0)
      : undefined;
  }

  get frequency(): number | undefined {
    return this._frequency;
  }
}

export default Word;
