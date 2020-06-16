import React, { createContext } from 'react';
import styled from 'styled-components';
import { render, fireEvent, waitForDomChange } from '@testing-library/react';
import testIds from './testIds';

import Categories, { CategoryButtonStyleProps, CategoryButtonProps } from '../Categories';
import { AppContext } from '../../../../Context/AppContext';



const CategoryButtonStyle = styled.div<CategoryButtonStyleProps>`
    cursor: default;
    background-color: ${p => p.colour};
    border-radius: 0.25em;
    width: 30%;
    padding: 0.5rem 0;
    margin: 0 1.2%;
    margin-bottom: 0.5rem;
    text-align: center;
    justify-content: center;
    color: black;
    font-size: 0.73em;
    @media (max-width: ${process.env.REACT_APP_PHONE_BREAK}px) { 
        padding: 1em 1%;
        width: 8em;
    }
    display: flex;
    justify-content: center;
`;

const CategoryContainer = styled.div`
    margin: 1rem 0;
`;

const CategoryButton = (props: CategoryButtonProps) => {
    const { Name, Colour, Active } = props;
    return (
        <CategoryButtonStyle active={Active} colour={Colour}>
            {Name}
        </CategoryButtonStyle>
    )
}

const fakeCategories = [
    {
        Colour: "#4aa84e",
        ID: "0",
        Name: "Climate Action"
    },
    {
        Colour: "#ff8000",
        ID: "1",
        Name: "Feminism"
    },
    {
        Colour: "#ff8000",
        ID: "2",
        Name: "Racial Justice"
    },
    {
        Colour: "#ff8000",
        ID: "3",
        Name: "LGBTQ Equality"
    },
    {
        Colour: "#ff8000",
        ID: "4",
        Name: "Other"
    }
]

describe("Categories", () => {

    test("Make sure it renders", async () => {
        const { queryByTestId } = render(
            <AppContext.Provider value={{ categories: fakeCategories, setCategories: null as React.Dispatch<React.SetStateAction<any[]>>,  setMessageToUser: null, login: 0 as any, loggedIn: false as boolean, setLoggedIn: null as React.Dispatch<React.SetStateAction<boolean>> ,userID: "" as string, userToken: "" as string, setUserToken: null as React.Dispatch<React.SetStateAction<string>>, userType: -1, setUserType: null as React.Dispatch<React.SetStateAction<number>>}}>
                <Categories CategoryButton={CategoryButton} activeCategories={[0]} changeCategory={() => { }} />
            </AppContext.Provider>
        );
        const container = queryByTestId(testIds.container);
        expect(container).not.toBeNull();
    })

    test("Make sure it renders only active category", () => {
        const { queryByTestId } = render(
            <AppContext.Provider value={{ categories: fakeCategories, setCategories: null as React.Dispatch<React.SetStateAction<any[]>>,  setMessageToUser: null, login: 0 as any, loggedIn: false as boolean, setLoggedIn: null as React.Dispatch<React.SetStateAction<boolean>> ,userID: "" as string, userToken: "" as string, setUserToken: null as React.Dispatch<React.SetStateAction<string>>, userType: -1, setUserType: null as React.Dispatch<React.SetStateAction<number>>}}>
                <Categories onlyShowActive CategoryButton={CategoryButton} activeCategories={[0, 1]} changeCategory={() => { }} />
            </AppContext.Provider>
        );
        let categoryButton;
        fakeCategories.map(ele => {
            categoryButton = queryByTestId(testIds.categoryButton(ele.ID));
            if (ele.ID == "0") expect(categoryButton).not.toBeNull();
            else expect(categoryButton).toBeNull();
        })
    })

    test("if makes active categories active", () => {

    })

    test("if when button clicked it becomes active", () => {

    })

    test("if can have all inactive", () => {

    })
});