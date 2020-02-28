import React, { useEffect, useState } from 'react';
import styled from 'styled-components'
import Issue from './Issue'
import EnvormentImage from '../../../img/LearningPage/tree.png'
import FeminstPhoto from '../../../img/LearningPage/femPhoto.png'
import RacialJustice from '../../../img/LearningPage/fist.png';
import LGBTQ from '../../../img/prideFlag.png'

const Page = styled.div`
    width: 75em;
    margin: 10em auto;
    margin-bottom: 0;
    @media (max-width: ${process.env.REACT_APP_PHONE_BREAK}px) {
        width: 90%;
        margin: 7em auto;
        margin-bottom: 2em;
    }
`;

const Title = styled.h1`
    font-size: 2.75em;
    @media (max-width: ${process.env.REACT_APP_PHONE_BREAK}px) {
        font-size: 2em;
        width: 90%;
        text-align: center;
        margin: auto;
    }
`;

const IssuesContainer = styled.div`
    width: 100%;
    @media (max-width: ${process.env.REACT_APP_PHONE_BREAK}px) {
        display: inline;
    }
`;

const QouteAuthro = styled.h1`
    color: grey;
    font-size: 1em;
    margin: 0;
`;

function LearnPage(props: any) {
  const issues = [
      { Links: [{name: "David Suzuki Foundation", link: "https://davidsuzuki.org/"}, {name: "World Wide Fund for Nature", link: "https://www.worldwildlife.org/"}], Color: "#4aa84e", ImageUrl: EnvormentImage, Title: "Climate Action", SubTitle: "The Future Of Our Planet", Para: "We are in the midst of a climate crisis, and the effects are being felt across the world. We would recommend checking out the David Suzuki Foundation and the World Wildlife Fund to learn more."},
      { Links: [{name: "Canadian Women's Foundation", link: "https://www.canadianwomen.org/"}], Color: "#ff8000", ImageUrl: FeminstPhoto, Title: "Feminism", SubTitle: "Equal Rights For Every Gender", Para: "From the wage gap to continued sexual harassment, feminism is just as important as ever. Strict gender roles and toxic masculinity only limit who we can be and what society we can create. Please check out the link below to learn more."},
      { Links: [{name: "First Nations Family Caring Society", link: "https://fncaringsociety.com/"}, {name: "Canadian Civil Liberties Association", link: "https://ccla.org/"}], Color: "purple", ImageUrl: RacialJustice, Title: "Racial Justice", SubTitle: "Equal Rights For Every Race", Para: "Racism is unfortunately alive and well all across the world. We know that we are stronger together, regardless of our racial and cultural backgrounds. Here are some links to learn more."},
      { Links: [{name: "Egale Canada Human Rights Trust", link: "https://egale.ca/"}, {name: "PFLAG Canada", link: "https://pflagcanada.ca/"}], Color: "#3c78d8", ImageUrl: LGBTQ, Title: "LGBTQ Equality", SubTitle: "Equal Rights For Ever Sexual And Gender Identity", Para: "LGBTQ people in Canada and around the world still face harassment and discrimination because of who they are. This can affect everything from access to healthcare services, to difficulty finding employment."},
  ]
  return (
    <Page>
        <Title>"Never stop learning; for when we stop learning, we stop growing" <br /><QouteAuthro>Loyal Lewman</QouteAuthro></Title>
        <IssuesContainer>
            {
                issues.map(ele => <Issue linkArray = {ele.Links} Color = {ele.Color} title = {ele.Title} subTitle = {ele.SubTitle} para = {ele.Para} imageURL = {ele.ImageUrl} />)
            }
        </IssuesContainer>
    </Page>
  );
}

export default LearnPage;
