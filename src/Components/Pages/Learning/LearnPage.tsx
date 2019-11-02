import React, { useEffect, useState } from 'react';
import styled from 'styled-components'
import Issue from './Issue'
import EnvormentImage from '../../../img/envormentPhoto.jpg'

const Page = styled.div`
    width: 75em;
    margin: 10em auto;
`;

const Title = styled.h1`
    font-size: 4em;
`;

const IssuesContainer = styled.div`
    width: 100%;
    display: flex;
    flex-wrap: wrap;
`;

function LearnPage(props: any) {
  const issues = [
      {Title: "Climate Change", SubTitle: "The fututre of our planet", Para: "Rank tall boy man them over post now. Off into she bed long fat room. Recommend existence curiosity perfectly favourite get eat she why daughters. Not may too nay busy last song must sell. An newspaper assurance discourse ye certainly. Soon gone game and why many calm have. "},
      {Title: "Sexism", SubTitle: "Equal rights for ever gender", Para: "Rank tall boy man them over post now. Off into she bed long fat room. Recommend existence curiosity perfectly favourite get eat she why daughters. Not may too nay busy last song must sell. An newspaper assurance discourse ye certainly. Soon gone game and why many calm have. "},
      {Title: "Racism", SubTitle: "Equal rights for ever race", Para: "Rank tall boy man them over post now. Off into she bed long fat room. Recommend existence curiosity perfectly favourite get eat she why daughters. Not may too nay busy last song must sell. An newspaper assurance discourse ye certainly. Soon gone game and why many calm have. "},
      {Title: "LGBTQ Discrimination", SubTitle: "Equal rights for ever sexual identity", Para: "Rank tall boy man them over post now. Off into she bed long fat room. Recommend existence curiosity perfectly favourite get eat she why daughters. Not may too nay busy last song must sell. An newspaper assurance discourse ye certainly. Soon gone game and why many calm have. "},
  ]
  return (
    <Page>
        <Title>Title Title Can't think of title</Title>
        <IssuesContainer>
            {
                issues.map(ele => <Issue title = {ele.Title} subTitle = {ele.SubTitle} para = {ele.Para} imageURL = {EnvormentImage} />)
            }
        </IssuesContainer>
    </Page>
  );
}

export default LearnPage;
