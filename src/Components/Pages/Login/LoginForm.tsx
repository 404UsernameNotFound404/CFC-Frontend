import React, { useState }from 'react';
import styled from 'styled-components';
import SelectCauses from './SelectCauses';
import { connect } from 'react-redux';

const Content = styled.div`
    width: 40%;
    margin: 3em auto;
    height: fit-content;
    padding: 0 2%;
    padding-top: 1.5%;
    padding-bottom: 0%;
    border-radius: 1em;
`;

const LoginTitle = styled.h1`
    font-size: 0.75em;
    color: grey;
    margin: 0;
`;

const LoginInput = styled.input`
    width: 100%;
    margin: 0.5em auto;
    padding: 0.5em 0.25em;
    font-size: 1em;
    border: none;
    background-color: transparent;
    border-bottom: thin solid grey;
    &:focus {
        outline: none;
    }
`;

const BreakLine = styled.div`
    margin: 0;
    margin-bottom: 1em;
    margin-left: -2%;
    width: 104%;
    height: 0.1em;
    /* background-color: grey; */
`;

type Props = {
    register: boolean
}

function LoginForm(props: Props) {
    let [causeSelection, setCauseSelection] = useState([
        {title: "Envorment", backgroundColor: "green", backgroundColorAct: "darkgreen", active: false, id: 0},
        {title: "Racial Justice", backgroundColor: "#c586c0", backgroundColorAct: "darkblue", active: false, id: 1},
        {title: "LGBTQ Rights", backgroundColor: "pink", backgroundColorAct: "darkblue", active: false, id: 2},
        {title: "Feminsim", backgroundColor: "orange", backgroundColorAct: "darkorange", active: false, id: 3}
    ]);

    const causeClicked = (ind: number) => {
        setCauseSelection(causeSelection.map(ele => {
            if(ind == ele.id) {
                if(ele.active) return {...ele, active: false}
                else return {...ele, active: true}
            }
            return ele;
        }));
    }

    if(!props.register) {
        return (
            <Content>
                <LoginInput placeholder = "Email Address" />
                <BreakLine />
                <LoginInput placeholder = "Password" type = 'password' />
            </Content>
        );
    } else {
        return (
            <Content>
                <LoginInput placeholder = "Email Address" />
                <BreakLine />
                <LoginInput placeholder = "Password" type = 'password' />
                <BreakLine />
                <LoginInput placeholder = "Re-Enter Password" type = 'password' />
                <SelectCauses causeClicked = {causeClicked} dropDownItems = {causeSelection} />
            </Content>
        );
    }
}

const mapStateToProps = (state: any) => {
    return {
      posts: state.posts
    }
  }
  
  const mapDispatchToProps = (dispatchMethod: any) => {
    return {
        updateUserData: (user: any) => { dispatchMethod({type: 'ADD_USER_DATA', user: user})}
    }
  }
   
  export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
