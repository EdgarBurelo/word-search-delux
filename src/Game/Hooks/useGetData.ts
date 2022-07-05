import data from './data.json';

type DataSourceWord = {
    source_language: string
    word: string
    character_grid: string[][]
    word_locations: object
    target_language: string
}

export type Word = {
    word: string
    sourceLanguage: string
    characterGrid: string[][],
    targetLanguage: string,
    wordLocations: WordLocations
}

type WordLocations = {
    translatedWord: string
    locations: string[][]
}

const useGetData = (): Word[] => {
    const dataObj = data;
    const words = normalizeWordLocations(dataObj);

    return words;
};

function normalizeWordLocations(data: DataSourceWord[]): Word[] {
    const normalizedWord = data.map((word) => {
        const [locationsString] = Object.keys(word.word_locations);

        const allLocations = [...locationsString.split(',')];
        if (allLocations.length % 2 > 0) {
            throw new Error('the locations are not even number');
        }

        const locations: string[][] = [];
        allLocations.forEach((location, index, self) => {
            if(index % 2 > 0) return;
            return locations.push(self.slice(index, index + 2));
        });

        const wordLocationsNormalized = {
            translatedWord: Object.values(word.word_locations)[0],
            locations
        };

        return {
            word: word.word,
            sourceLanguage: word.source_language,
            characterGrid: word.character_grid,
            targetLanguage: word.target_language,
            wordLocations: wordLocationsNormalized
        };
    });

    return normalizedWord;
}


export default useGetData;
