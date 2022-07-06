import React from 'react';
import Text from "../Components/Text/Text";
import {Page} from "../Components/Page/Page";
import useGetData from "./Hooks/useGetData";
import useWordsReducer from "./Hooks/useWordsReducer";
import Grid from "../Components/Grid/Grid";

const Game: React.FC = () => {
    const Words = useGetData();
    const {onMouseDownHandler, onMouseEnterHandler, onMouseUpHandler, onNextButtonClick, state} = useWordsReducer(Words);

    return (
        <Page>
            <Text text={`Selected Word: ${state.word.toLocaleUpperCase()}`} />
            <Text text={`The target language is ${state.targetLanguage.toLocaleUpperCase() === 'ES' ? 'Spanish' : 'unknown'}`} />
            <Grid
                grid={state.grid}
                selectedLetters={state.selectedLetters}
                disabled={state.wordCorrectlySelected}
                onMouseUpHandler={onMouseUpHandler}
                onMouseDownHandler={onMouseDownHandler}
                onMouseEnterHandler={onMouseEnterHandler}
            />
            {state.wordCorrectlySelected && (
                <React.Fragment>
                    <Text
                        text={!state.areAllWordsAnswered ?
                            'You found the word' :
                            'You answered all the words 🎉'
                        }
                    />
                    {!state.areAllWordsAnswered &&
                    <button
                        role='button'
                        onClick={onNextButtonClick}
                        disabled={state.areAllWordsAnswered}
                        style={{color: "black", padding: `5px 10px`, margin: `10px`}}
                    >
                        Next Word
                    </button>}
                </React.Fragment>
            )}
        </Page>
    );
};

export default Game;
