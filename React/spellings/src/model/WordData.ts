interface IWordProps {
  word?: string;
  score?: number;
  tags?: Array<string>;
  defs?: Array<string>;
}

class Word {
  private _frequency?: number;

  public tags?: Array<string>;
  public word?: string;
  public score?: number;
  public defs?: Array<string>;

  constructor({ word, score, tags, defs }: IWordProps) {
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
