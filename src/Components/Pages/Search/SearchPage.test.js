import React from 'react';
import { shallow, configure } from 'enzyme';
import SearchPage from './SearchPage';
import Adapter from "enzyme-adapter-react-16";
configure({ adapter: new Adapter() });

describe('Examining the syntax of Jest tests', () => {
    const wrapper = shallow(<SearchPage />)
    console.log(wrapper)
    it('sums numbers', () => {
        expect(1 + 2).toEqual(3);
        expect(2 + 2).toEqual(4);
     });
  });