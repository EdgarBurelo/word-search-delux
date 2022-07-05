import React from 'react';
import Text from "../Components/Text/Text";
import {Page} from "../Components/Page/Page";
import useGetData from "./Hooks/useGetData";
import useWordsReducer from "./Hooks/useWordsReducer";
import Grid from "../Components/Grid/Grid";

const Game: React.FC = () => {
    const Words = useGetData();
    const {onMouseDownHandler, onMouseEnterHandler, onMouseUpHandler, state} = useWordsReducer(Words);

    return (
        <Page>
            <Text text={state.word} />

            <Grid
                grid={state.grid}
                selectedLetters={state.selectedLetters}
                disabled={state.wordCorrectlySelected}
                onMouseUpHandler={onMouseUpHandler}
                onMouseDownHandler={onMouseDownHandler}
                onMouseEnterHandler={onMouseEnterHandler}
            />
            {state.wordCorrectlySelected && <Text text='Won' />}
        </Page>
    );
};

export default Game;
