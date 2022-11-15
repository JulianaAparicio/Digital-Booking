import {describe, test, expect, beforeEach} from 'vitest';
import {render, screen} from '@testing-library/react';
import React from 'react';
import Rating from './Rating';

describe('Rating test', () => {
    let component;

    beforeEach(() => {
        component = render(<Rating rate={4} />)
    })

    test('Should render the component', () => {
        expect(component).toMatchSnapshot();
    })

    test('Should render four starts icon', () => {
        expect(component.container.firstChild.childNodes.length).toBe(4);
    })

    test('Should has the class db-rating', () => {
        expect(component.container.firstElementChild?.classList.contains('db-rating')).toBeTruthy();
    })
})