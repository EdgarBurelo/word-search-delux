import React from 'react';
import {cleanup, render, RenderResult, fireEvent} from '@testing-library/react';
import Game from "./Game";

afterEach(cleanup);

jest.mock('./Hooks/useGetData', () => {
    return () => [
            {
                word: "man",
                sourceLanguage: "en",
                characterGrid: [["i", "q", "\u00ed", "l", "n", "n", "m", "\u00f3"], ["f", "t", "v", "\u00f1", "b", "m", "h", "a"], ["h", "j", "\u00e9", "t", "e", "t", "o", "z"], ["x", "\u00e1", "o", "i", "e", "\u00f1", "m", "\u00e9"], ["q", "\u00e9", "i", "\u00f3", "q", "s", "b", "s"], ["c", "u", "m", "y", "v", "l", "r", "x"], ["\u00fc", "\u00ed", "\u00f3", "m", "o", "t", "e", "k"], ["a", "g", "r", "n", "n", "\u00f3", "s", "m"]],
                targetLanguage: "es",
                wordLocations: {
                    translatedWord: "hombre",
                    locations: [["6", "1"], ["6", "2"], ["6", "3"], ["6", "4"], ["6", "5"], ["6", "6"]],
                }
            },
            {
                word: "woman",
                sourceLanguage: "en",
                characterGrid: [["v", "\u00e1", "q", "t", "b", "f", "q"], ["y", "x", "i", "a", "\u00fc", "v", "a"], ["r", "d", "y", "\u00ed", "t", "n", "a"], ["f", "v", "\u00f3", "w", "l", "a", "v"], ["b", "u", "\u00fa", "j", "q", "h", "\u00e1"], ["c", "o", "m", "u", "j", "e", "r"], ["h", "o", "d", "\u00fa", "w", "d", "\u00fc"]],
                targetLanguage: "es",
                wordLocations: {
                    translatedWord: "mujer",
                    locations: [["2","5"],["3","5"],["4","5"],["5","5"],["6","5"]],
                }
            },
        ];
});

let documentBody: RenderResult;

describe('Grid Letter Component', () => {
    beforeEach(() => {
        documentBody = render(<Game />);
    });

    it('Selects all letters of a word and go to the next word', () => {
        const manText = documentBody.getByText('Selected Word: MAN');
        expect(manText).toBeInTheDocument();

        const expectedLanguage = documentBody.getByText('The target language is Spanish');
        expect(expectedLanguage).toBeInTheDocument();

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

        const win = documentBody.getByText('You found the word');
        expect(win).toBeInTheDocument();

        const button = documentBody.getByRole('button');
        fireEvent.click(button);

        const womenText = documentBody.getByText('Selected Word: WOMAN');
        expect(womenText).toBeInTheDocument();
    });
});
