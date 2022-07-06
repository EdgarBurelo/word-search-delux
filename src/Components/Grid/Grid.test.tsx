import React from 'react';
import {cleanup, render, RenderResult, fireEvent} from '@testing-library/react';
import Grid, {GridProps} from "./Grid";

afterEach(cleanup);

let documentBody: RenderResult;

describe('Grid Letter Component', () => {
    const onMouseUpHandler = jest.fn();
    const onMouseDownHandler = jest.fn();
    const onMouseEnterHandler = jest.fn();
    const gridProps: GridProps = {
        grid: [["a", "b"], ["c","d"]],
        selectedLetters: [["1", "2"], ["1","3"]],
        disabled: false,
        onMouseUpHandler,
        onMouseDownHandler,
        onMouseEnterHandler,
    };

    beforeEach(() => {
        documentBody = render(
            <Grid
                grid={gridProps.grid}
                disabled={gridProps.disabled}
                selectedLetters={gridProps.selectedLetters}
                onMouseDownHandler={gridProps.onMouseDownHandler}
                onMouseEnterHandler={gridProps.onMouseEnterHandler}
                onMouseUpHandler={gridProps.onMouseUpHandler}
            />
        );
    });

    it('renders the grid elements', () => {
        expect(documentBody.getByText('a')).toBeInTheDocument();
        expect(documentBody.getByText('b')).toBeInTheDocument();
        expect(documentBody.getByText('c')).toBeInTheDocument();
        expect(documentBody.getByText('d')).toBeInTheDocument();
    });

    it('triggers the onMouseEnter', () => {
        const letter = documentBody.getByText('a');

        expect(onMouseEnterHandler).toHaveBeenCalledTimes(0);
        fireEvent.mouseEnter(letter);
        expect(onMouseEnterHandler).toHaveBeenCalledTimes(1);
    });

    it('triggers the onMouseDown', () => {
        const letter = documentBody.getByText('a');

        expect(onMouseDownHandler).toHaveBeenCalledTimes(0);
        fireEvent.mouseDown(letter);
        expect(onMouseDownHandler).toHaveBeenCalledTimes(1);
    });

    it('triggers the onMouseUpEvent', () => {
        const grid = documentBody.getAllByRole('row')[0];

        expect(onMouseUpHandler).toHaveBeenCalledTimes(0);
        fireEvent.mouseUp(grid);
        expect(onMouseUpHandler).toHaveBeenCalledTimes(1);
    });
});
