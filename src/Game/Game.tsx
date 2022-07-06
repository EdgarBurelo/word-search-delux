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
                    <Text text='You found the word' />
                    <button
                        onClick={onNextButtonClick}
                        disabled={state.areAllWordsAnswered}
                        style={{color: "black", padding: `5px 10px`, margin: `10px`}}
                    >
                        Next Word
                    </button>
                </React.Fragment>
            )}
        </Page>
    );
};

export default Game;
