import React from 'react';
import {cleanup, render, RenderResult, fireEvent} from '@testing-library/react';
import Game from "./Game";

afterEach(cleanup);

let documentBody: RenderResult;

describe('Grid Letter Component', () => {
    beforeEach(() => {
        documentBody = render(<Game />);
    });

    it('Selects all letters of a word', () => {
        const h = documentBody.getAllByText('h')[0];
        fireEvent.mouseEnter(h, {
            buttons: 1,
        });

        const o = documentBody.getAllByText('o')[0];
        fireEvent.mouseEnter(o, {
            buttons: 1,
        });

        const m = documentBody.getAllByText('m')[2];
        fireEvent.mouseEnter(m, {
            buttons: 1,
        });

        const b = documentBody.getAllByText('b')[1];
        fireEvent.mouseEnter(b, {
            buttons: 1,
        });

        const r = documentBody.getAllByText('r')[0];
        fireEvent.mouseEnter(r, {
            buttons: 1,
        });

        const e = documentBody.getAllByText('e')[2];
        fireEvent.mouseEnter(e, {
            buttons: 1,
        });

        const grid = documentBody.getAllByRole('row')[0];
        fireEvent.mouseUp(grid);

        documentBody.getByText('You found the word');
    });
});
