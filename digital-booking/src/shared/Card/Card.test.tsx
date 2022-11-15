import {describe, test, expect} from 'vitest';
import {render, screen} from '@testing-library/react';
import React from 'react';
import Card from './Card';

describe('Card test', () => {
    test('Should render the component', () => {
        const result = render(<Card classList={'db-card-test'}><span>This is a card</span></Card>);
        expect(result).toMatchSnapshot();
    })

    test('Should render the text This is a card', () => {
        render(<Card classList={'db-card-test'}><span>This is a card</span></Card>);
        expect(screen.getByText(/This is a card/i)).toBeDefined();
    })

    test('Should has the class db-card-test', () => {
        const result = render(<Card classList={'db-card-test'}><span>This is a card</span></Card>);
        expect(result.container.firstElementChild?.classList.contains('db-card-test')).toBeTruthy();
    })
})