import {describe, test, expect, beforeEach, vi} from 'vitest';
import {render, screen} from '@testing-library/react';
import React from 'react';
import CategoryCard from './CategoryCard';

describe('Category Card test', () => {
    let component;
    const categoryTest = {id: 1, title: "Hoteles", description: '24', imageURL: 'https' };
    const filterByCategory = vi.fn().mockImplementation((id) => {
        console.log(id);
    });


    beforeEach(() => {
        component = render(<CategoryCard category={categoryTest} filterByCategory={filterByCategory}/>);
    })

    test('Should render the component', () => {
        expect(component).toMatchSnapshot();
    })

    test('Should render the title of the category', () => {
        expect(screen.getAllByText(/Hoteles/i)).toBeDefined();
    })

    test('Should render the description of the category', () => {
        expect(screen.getByText(/24/i)).toBeDefined();
    })

    test('Should render a image component with the image ulr of the category', () => {
        expect(component.container.firstElementChild?.firstElementChild?.firstElementChild?.tagName).toBe('IMG');
        expect(component.container.firstElementChild?.firstElementChild?.firstElementChild?.attributes.getNamedItem('src')?.value).toBe(categoryTest.imageURL);
    })

    test('Should trigger the function action', () => {
        component.container.firstChild.click();
        expect(filterByCategory).toHaveBeenCalled();
    })

})