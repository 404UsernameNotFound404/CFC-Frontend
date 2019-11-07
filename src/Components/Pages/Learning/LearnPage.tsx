import React, { useEffect, useState } from 'react';
import styled from 'styled-components'
import Issue from './Issue'
import EnvormentImage from '../../../img/tree.png'
import FeminstPhoto from '../../../img/femPhoto.png'
import RacialJustice from '../../../img/fist.png';
import LGBTQ from '../../../img/rainbowFlag.png'

const Page = styled.div`
    width: 75em;
    margin: 10em auto;
    margin-bottom: 0;
    @media (max-width: 768px) {
        width: 90%;
        margin: 7em auto;
        margin-bottom: 2em;
    }
`;

const Title = styled.h1`
    font-size: 2.75em;
    @media (max-width: 768px) {
        font-size: 2em;
        width: 90%;
        text-align: center;
    }
`;

const IssuesContainer = styled.div`
    width: 100%;
    @media (max-width: 768px) {
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
      {Color: "#4aa84e", ImageUrl: EnvormentImage, Title: "Climate Change", SubTitle: "The Future Of Our Planet", Para: "We are in the midst of a climate crisis, and the effects are being felt across the world. We would recommend checking out the David Suzuki Foundation and the World Wildlife Fund to learn more."},
      {Color: "#ff8000", ImageUrl: FeminstPhoto, Title: "Feminism", SubTitle: "Equal Rights For Every Gender", Para: "From the wage gap to continued sexual harassment, feminism is just as important as ever. Strict gender roles and toxic masculinity only limit who we can be and what society we can create. Please check out the link below to learn more."},
      {Color: "purple", ImageUrl: RacialJustice, Title: "Racial Justice", SubTitle: "Equal Rights For Ever Race", Para: "Racism is unfortunately alive and well all across the world. We know that we are stronger together, regardless of our racial and cultural backgrounds. Here are some links to learn more."},
      {Color: "#3c78d8", ImageUrl: LGBTQ, Title: "LGBTQ Equality", SubTitle: "Equal Rights For Ever Sexual And Gender Identity", Para: "LGBTQ people in Canada and around the world still face harassement and discrimination because of who they are. This can affect everything from access to healthcare services, to difficulty finding employment."},
  ]
  return (
    <Page>
        <Title>"Never stop learning; for when we stop learning, we stop growing" <br /><QouteAuthro>Loyal Lewman</QouteAuthro></Title>
        <IssuesContainer>
            {
                issues.map(ele => <Issue Color = {ele.Color} title = {ele.Title} subTitle = {ele.SubTitle} para = {ele.Para} imageURL = {ele.ImageUrl} />)
            }
        </IssuesContainer>
    </Page>
  );
}

export default LearnPage;
