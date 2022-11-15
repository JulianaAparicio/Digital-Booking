import {describe, test, expect, beforeEach} from 'vitest';
import {render, screen} from '@testing-library/react';
import React from 'react';
import SocialNetworks from './SocialNetworks';

describe('SocialNetworks test', () => {
    let component;

    beforeEach(() => {
        component = render(<SocialNetworks />)
    })

    test('Should render the component', () => {
        expect(component).toMatchSnapshot();
    })

    test('Should render four anchors tags', () => {
        expect(component.container.childNodes.length).toBe(4);
    })

})