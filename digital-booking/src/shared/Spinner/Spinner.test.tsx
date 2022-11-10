import {describe, test, expect, beforeEach} from 'vitest';
import {render, screen} from '@testing-library/react';
import React from 'react';
import Spinner from './Spinner';

describe('Spinner test', () => {
    let component;

    beforeEach(() => {
        component = render(<Spinner />)
    })

    test('Should render the component', () => {
        expect(component).toMatchSnapshot();
    })

    test('Should has the class spin', () => {
        expect(component.container.firstElementChild.classList.contains('spin')).toBeTruthy();
    })

})