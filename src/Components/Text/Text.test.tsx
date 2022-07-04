import React from 'react';
import {cleanup, render, RenderResult} from '@testing-library/react';
import Text from "./Text";

afterEach(cleanup);

let documentBody: RenderResult;

describe('Text Element', () => {

    it('renders the text on the Dom', () => {
        documentBody = render(<Text text="Hello world Again" />);
        expect(documentBody.getByText('Hello world Again')).toBeInTheDocument();
    });
});
