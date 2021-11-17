
enum DifficultyLevel {
    VeryEasy = 0,
    Easy,
    Moderate,
    Hard,
    VeryHard
}


class WordSetting {
    
    constructor (public difficulty: DifficultyLevel,
                public frequencyLower: number,
                public frequencyUpper: number,
                public wordLengthLower: number,
                public wordLengthUpper: number) {
    }
}

class SpellingDifficulty {
    
    public _wordSettings = new Array<WordSetting>();

    constructor() {
        this._wordSettings = [
            new WordSetting(DifficultyLevel.VeryEasy, 500, 10000, 3, 5),
            new WordSetting(DifficultyLevel.Easy, 200, 500, 4, 6),
            new WordSetting(DifficultyLevel.Moderate, 1, 200, 5, 8),
            new WordSetting(DifficultyLevel.Hard, 0.1, 1, 7, 10),
            new WordSetting(DifficultyLevel.VeryHard, 0, 0.1, 11, 50)
        ]
    } 

    public getWordSettings (difficulty: DifficultyLevel):WordSetting {
        return this._wordSettings.find(e => e.difficulty === difficulty) as WordSetting;
    } 

}

export {SpellingDifficulty, WordSetting, DifficultyLevel}