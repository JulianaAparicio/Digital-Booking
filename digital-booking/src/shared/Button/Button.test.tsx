import {describe, test, expect, beforeEach, vi} from 'vitest';
import {render, screen} from '@testing-library/react';
import React from 'react';
import Button from './Button';

describe('Button test', () => {
    let component;
    let componentDisabled;
    const spyAction = vi.fn().mockImplementation(() => {
        console.log('Button text');
    });

    const spyDisabledAction = vi.fn().mockImplementation(() => {
        console.log('Button text');
    });


    beforeEach(() => {
        component = render(<Button classList={'db-button-primary'} isDisabled={false} action={spyAction} >Button test</Button>)
        componentDisabled = render(<Button classList={'db-button-primary'} isDisabled={true} action={spyDisabledAction} >Button test</Button>)
    })

    test('Should render the component', () => {
        expect(component).toMatchSnapshot();
    })

    test('Should has the class db-button-primary', () => {
        expect(component.container.firstElementChild?.classList.contains('db-button-primary')).toBeTruthy();
    })

    test('Should not have the db-button-disabled class', () => {
        expect(component.container.firstElementChild?.classList.contains('db-button-disabled')).toBeFalsy();
    })

    test('Should not have the db-button-disabled class', () => {
        expect(componentDisabled.container.firstElementChild?.classList.contains('db-button-disabled')).toBeTruthy();
    })

    test('Should trigger the function action', () => {
        component.container.firstChild.click();
        expect(spyAction).toHaveBeenCalled();
    })

    test('Should trigger the function action', () => {
        componentDisabled.container.firstChild.click();
        expect(spyDisabledAction).not.toHaveBeenCalled();
    })

})