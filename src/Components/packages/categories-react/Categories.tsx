import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { getCategories } from "../search-page-functions/getCategories";
import { AppContext } from "../../../Context/AppContext";
import testIds from "./test/testIds";

type ComponentProps = {
  justifyContent: string;
};

const Component = styled.div<ComponentProps>`
  width: 100%;
  height: fit-content;
  margin: auto;
  display: flex;
  flex-flow: wrap;
  justify-content: ${(p) => p.justifyContent};
  ${(p) =>
    p.justifyContent == "space-between"
      ? `
    &::after {
        content: "";
        flex: 1;
    }`
      : ""}
`;

type CategoryButtonContainer = {
  flexBasis: string;
};

const CategoryButtonContainer = styled.div<CategoryButtonContainer>`
  flex-basis: ${(p) => p.flexBasis};
`;

export type CategoryButtonStyleProps = {
  colour: string;
  active: boolean;
};

export type CategoryButtonProps = {
  Name: string;
  Colour: string;
  Active: boolean;
  ID: number;
  activateButton: Function;
};

type Props = {
  changeCategory: any;
  activeCategories?: any;
  onlyShowActive?: boolean;
  CategoryButton: (props: CategoryButtonProps) => JSX.Element;
  justifyContent?: string;
  canHaveAllInactive?: boolean;
  flexBasis?: string;
};

function Categories(props: Props) {
  const { canHaveAllInactive = true, flexBasis = "30%" } = props;
  const [activeCategories, setActiveCategories] = useState([]);
  const [categories, setCategories] = useState([]);
  const { CategoryButton, onlyShowActive = false } = props;
  const justifyContent = props.justifyContent
    ? props.justifyContent
    : "space-evenly";
  const c = useContext(AppContext);

  useEffect(() => {
    if (props.activeCategories) {
      setActiveCategories(props.activeCategories);
    }
  }, []);

  useEffect(() => {
    // console.log(c.categories)
    updateCategoriesWithActiveCategories(props.activeCategories, c.categories);
  }, [c.categories, props.activeCategories]);

  const updateCategoriesWithActiveCategories = (
    newActiveCategories: number[],
    categoriesToUse: any
  ) => {
    if (!onlyShowActive) {
      setCategories(
        categoriesToUse.map((ele: any) => {
          if (newActiveCategories) {
            if (newActiveCategories.length == 0)
              return { ...ele, Active: canHaveAllInactive };
            let found = false;
            for (let x = 0; x < newActiveCategories.length; x++) {
              if (newActiveCategories[x] == parseInt(ele.ID)) found = true;
            }
            if (!found) return { ...ele, Active: false };
          }
          return { ...ele, Active: true };
        })
      );
    } else {
      setCategories(
        categoriesToUse.filter((ele: any) => {
          let found = false;
          for (let x = 0; x < newActiveCategories.length; x++) {
            if (newActiveCategories[x] == parseInt(ele.ID)) found = true;
          }
          return found;
        })
      );
    }
  };

  const updateActiveCategories = (id: string) => {
    let newActiveCategories = [...activeCategories];
    let found = false;
    for (let x = 0; x < newActiveCategories.length; x++) {
      if (newActiveCategories[x] == parseInt(id)) found = true;
    }
    if (found) {
      for (let x = 0; x < newActiveCategories.length; x++) {
        if (newActiveCategories[x] == parseInt(id))
          newActiveCategories.splice(x, 1);
      }
    } else newActiveCategories.push(parseInt(id));
    setActiveCategories(newActiveCategories);
    updateCategoriesWithActiveCategories(newActiveCategories, categories);
    props.changeCategory(newActiveCategories);
  };

  if (categories.length != 0) {
    return (
      <Component
        data-testid={testIds.container}
        justifyContent={justifyContent}
      >
        {categories.map((ele, i) => (
          <CategoryButtonContainer
            flexBasis={flexBasis}
            data-testid={testIds.categoryButton(ele.ID, ele.Active)}
          >
            {" "}
            <CategoryButton
              key={i}
              activateButton={updateActiveCategories}
              {...ele}
            />{" "}
          </CategoryButtonContainer>
        ))}
      </Component>
    );
  } else {
    return <>Loading...</>;
  }
}

export default Categories;
