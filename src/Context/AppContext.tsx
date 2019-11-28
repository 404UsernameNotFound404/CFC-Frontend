import {createContext } from 'react';
import { string } from 'prop-types';

export const AppContext = createContext({loggedIn: false as boolean, setLoggedIn: null as React.Dispatch<React.SetStateAction<boolean>> ,userID: "" as string, userToken: "" as string, setUserToken: null as React.Dispatch<React.SetStateAction<string>>})