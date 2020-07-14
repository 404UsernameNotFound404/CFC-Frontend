import React, { useState } from "react";
import styled from "styled-components";
import Categories, {
  CategoryButtonProps,
  CategoryButtonStyleProps,
} from "../../packages/categories-react/Categories";

type ContainerProps = {
  width: string;
};

const Container = styled.div<ContainerProps>`
  border: black 0.2rem solid;
  width: ${(p) => p.width};
  margin: 1.5%;
  border-radius: 1em;
  @media (max-width: ${process.env.REACT_APP_PHONE_BREAK}px) {
    border-width: 1%;
    width: 98%;
    margin: 1.5em 0;
    padding: 0;
    height: fit-content;
  }
`;

const Name = styled.h1`
  font-size: 1.5em;
  text-align: center;
  margin: 0 0.5em;
`;

const PortraitOfActivist = styled.img`
  border: black thick solid;
  border-radius: 50%;
  width: 12em;
  height: 12em;
  margin: 1em auto;
  display: block;
  object-fit: cover;
`;

const ElevatorPitch = styled.h1`
  font-size: 1em;
  text-align: center;
  width: 90%;
  margin: 1em auto;
`;

const CategoryButtonStyle = styled.div<CategoryButtonStyleProps>`
  cursor: default;
  background-color: ${(p) => p.colour};
  border-radius: 0.25em;
  width: 90%;
  margin: auto;
  padding: 0.5rem 0;
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
  );
};

type Props = {
  name: string;
  para: string;
  ID: string;
  Categories: { Name: string; ID: string; Colour: string }[];
  image: string;
  width: string;
};

function Page(props: Props) {
  const [buttonState, setButtonState] = useState(false);

  return (
    <Container width={props.width}>
      <PortraitOfActivist src={props.image} />
      <Name>{props.name}</Name>
      <ElevatorPitch>{props.para}</ElevatorPitch>
      <CategoryContainer>
        {" "}
        <Categories
          onlyShowActive
          justifyContent={"space-between"}
          CategoryButton={CategoryButton}
          activeCategories={props.Categories.map((ele) => parseInt(ele.ID))}
          changeCategory={() => {}}
        />{" "}
      </CategoryContainer>
    </Container>
  );
}

export default Page;
