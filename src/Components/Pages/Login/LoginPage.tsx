import React, { useState } from 'react';
import styled from 'styled-components';
import LoginForm from './LoginForm';
import BasicButton from '../../ComponentLibrayer/BasicButton';
import ProtestPhoto from '../../../img/protestCrowd.jpg';

const Page = styled.div`
    padding-top: 2.5rem;
    width: 75em;
    height: 75vh;
    margin: auto;
    display: flex;
    justify-content: center;
`;

const SubTitle = styled.h1`
    margin: 0.2em;
    font-size: 3em;
    text-align: center;
`;

const Logo = styled.h1`
    font-size: 2em;
    margin: 0;
    text-align: center;
    font-weight: bolder;
`;

const Content = styled.div`
    height: fit-content;
    width: 100%;
    margin: auto 0;
    margin-left: 40%;
`;

const BackgroundImage = styled.img`
    object-fit: cover;
    width: 100%;
    height: 100%;
`;

const BackgroundImageOverlay = styled.div`
    width: 100%;
    height: 100%;
    /* background-color: rgba(0,0,0,0.5); */
    /* background-color: rgba(255,255,255,0.1); */
    position: absolute;
    top: 0;
    left: 0;
`;

const BackgroundImageContainer = styled.div`
    width: 33vw;
    height: 100vh;
    position: absolute;
    top: 0;
    left: 0;
`;

const RegisterAndForgotUsername = styled.div`
    display: flex;
    width: 100%;
    justify-content: center;
`;

const ForgotRegisterText = styled.p`
    margin: 0 0.5em;
    font-size: 1em;
    color: grey;
    cursor: pointer;
    :hover {
        text-decoration: underline;
    }
`

type Props = {
    name: string,
    img: string,
    para: string
}

function Activst(props: Props) {
    const [register, setRegister] = useState(false);

    const registerClick = () => {
        if(register) setRegister(false)
        else setRegister(true);
        //set inputs to zero later
    }
    return (
        <Page>
            <BackgroundImageContainer>
                <BackgroundImageOverlay />
                <BackgroundImage src={ProtestPhoto} />
            </BackgroundImageContainer>
            <Content>
                <SubTitle>Ready to make a change?</SubTitle>
                <LoginForm register = {register}/>
                <BasicButton activateButton={() => { }} width={"40%"} text={register ? "Register" : "Login"} active={false} id={20} />
                <RegisterAndForgotUsername>
                    {/* <ForgotRegisterText>Forgot Password?</ForgotRegisterText> */}
                    <ForgotRegisterText onClick={registerClick}>{register ? 'Go To Login' : 'Create An Acount'}</ForgotRegisterText>
                </RegisterAndForgotUsername>
            </Content>
        </Page>
    );
}

export default Activst;
