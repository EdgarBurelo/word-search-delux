import React, {useReducer} from 'react';
import {Word} from "./useGetData";

type WordsState = {
    wordCorrectlySelected: boolean
    word: string
    selectedLetters: string[][]
    grid: string[][],
    locations: string[][]
    totalWords: number
    initialWordIndex: number
    areAllWordsAnswered: boolean
    targetLanguage: string
}

type WordAction = {
    type: string,
    selectedLetter?: string[]
}

type WordsReducer = {
    state: WordsState
    onMouseDownHandler: React.MouseEventHandler
    onMouseEnterHandler: React.MouseEventHandler
    onMouseUpHandler: React.MouseEventHandler
    onNextButtonClick: React.MouseEventHandler
}

const useWordsReducer = (Words: Word[]): WordsReducer => {
    const initialWordIndex = 0;

    const initialWords: WordsState = {
        wordCorrectlySelected: false,
        word: Words[initialWordIndex].word,
        selectedLetters: [],
        grid: Words[initialWordIndex].characterGrid,
        locations: Words[initialWordIndex].wordLocations.locations,
        totalWords: Words.length,
        initialWordIndex,
        areAllWordsAnswered: false,
        targetLanguage: Words[initialWordIndex].targetLanguage
    };

    const wordsReducer = (state: WordsState, action: WordAction) => {
        switch (action.type) {
            case 'SELECT_LETTER':
                return {
                    ...state,
                    selectedLetters: [...state.selectedLetters, action.selectedLetter],
                };
            case 'SELECT_NEW_WORD':
                return {
                    ...state,
                    word: Words[1].word,
                    grid: Words[1].characterGrid,
                    locations: Words[1].wordLocations.locations
                };
            case 'VALIDATE_SELECTION':
                if(
                    state.selectedLetters.length === state.locations.length &&
                    state.selectedLetters.every((selected, index) => {
                        return selected.join('') === state.locations[index].join('');
                    })
                ) {
                    return {
                        ...state,
                        wordCorrectlySelected: true,
                    };
                }

                return {
                    ...state,
                    selectedLetters: [],
                };
            case 'NEXT_WORD':
                if (state.wordCorrectlySelected && state.totalWords > state.initialWordIndex + 1) {
                    const nextWordIndex = state.initialWordIndex + 1;

                    return {
                        ...state,
                        initialWordIndex: nextWordIndex,
                        word: Words[nextWordIndex].word,
                        grid: Words[nextWordIndex].characterGrid,
                        locations: Words[nextWordIndex].wordLocations.locations,
                        wordCorrectlySelected: false,
                        selectedLetters: [],
                    };
                }
                if (state.totalWords === state.initialWordIndex + 1) {
                    return {
                        ...state,
                        areAllWordsAnswered: true,
                    };
                }
                return {...state,};
            default:
                return {...state};
        }
    };

    const [state, dispatch] = useReducer(wordsReducer, initialWords);

    const onMouseDownHandler = (e: React.MouseEvent<HTMLElement>): void => {
        const wordLocation = e.currentTarget.id;
        const letter = wordLocation.split(',');

        const action = {
            type: 'SELECT_LETTER',
            selectedLetter: letter,
        };

        dispatch(action);
    };

    const onMouseUpHandler = (): void => {
        dispatch({
            type: 'VALIDATE_SELECTION'
        });
    };

    const onMouseEnterHandler = (e: React.MouseEvent<HTMLElement>): void => {
        const wordLocation = e.currentTarget.id;
        const letter = wordLocation.split(',');

        const action = {
            type: 'SELECT_LETTER',
            selectedLetter: letter,
        };

        if (e.buttons === 1 || e.buttons === 3) {
            dispatch(action);
        }
    };

    const onNextButtonClick = (): void => {
        dispatch({
            type: 'NEXT_WORD'
        });
    };

    return {
        state,
        onMouseDownHandler,
        onMouseEnterHandler,
        onMouseUpHandler,
        onNextButtonClick,
    };
};

export default useWordsReducer;
