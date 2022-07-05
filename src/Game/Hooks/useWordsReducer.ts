import React, {useReducer} from 'react';
import {Word} from "./useGetData";

type WordsState = {
    wordCorrectlySelected: boolean
    word: string
    selectedLetters: string[][]
    grid: string[][],
    locations: string[][]
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
}

const useWordsReducer = (Words: Word[]): WordsReducer => {
    const initialWords: WordsState = {
        wordCorrectlySelected: false,
        word: Words[0].word,
        selectedLetters: [],
        grid: Words[0].characterGrid,
        locations: Words[0].wordLocations.locations
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
            default:
                return {...state};
        }
    };

    const [state, dispatch] = useReducer(wordsReducer, initialWords);

    const onMouseDownHandler = (e: React.MouseEvent<HTMLElement>) => {
        const wordLocation = e.currentTarget.id;
        const letter = wordLocation.split(',');

        const action = {
            type: 'SELECT_LETTER',
            selectedLetter: letter,
        };

        dispatch(action);
    };

    const onMouseUpHandler = () => {
        dispatch({
            type: 'VALIDATE_SELECTION'
        });

    };

    const onMouseEnterHandler = (e: React.MouseEvent<HTMLElement>) => {
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

    return {
        state,
        onMouseDownHandler,
        onMouseEnterHandler,
        onMouseUpHandler
    };
};

export default useWordsReducer;
