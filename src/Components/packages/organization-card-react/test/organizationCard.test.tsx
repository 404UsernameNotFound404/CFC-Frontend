import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import testIds from './testIds';
import OrgCard from '../organizationsCard';
import EditCreateOrg from '../creatingEditingOrgs';
import * as updateOrCreateOrg from '../../organization-card/organizationCard'; 

const orgCardProps = {
    name: "hi",
    desc: "short desc this needs to be at least 100 character so 12312312 123122312 12312 123 123123123 123123123 123123 123467891 1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,17,123,1123123123123123123123asssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss",
    link: "google.ca",
    location: "location.ca",
    interests: [0, 1],
    email: "email@email.ca",
    _id: "this_id"
}


describe("Org Card", () => {

    test("if it renders", () => {
        const { queryByTestId } = render(
            <OrgCard {...orgCardProps} />
        ); 
        const container = queryByTestId(testIds.orgCard.container);
        expect(container).not.toBeNull();

        const desc = queryByTestId(testIds.orgCard.desc);
        expect(desc).not.toBeNull();

        const seeMore = queryByTestId(testIds.orgCard.seeMore);
        expect(seeMore).not.toBeNull();
    })

    test("if desc show more works", () => {
        const { queryByTestId } = render(
            <OrgCard {...orgCardProps} />
        );

        const seeMore = queryByTestId(testIds.orgCard.seeMore);
        fireEvent.click(seeMore);

        const desc = queryByTestId(testIds.orgCard.desc);
        const style = window.getComputedStyle(desc);
        expect(style.height).toEqual("auto");

    })

    test("if see more button does not render with two few characters", () => {
        const { queryByTestId } = render(
            <OrgCard {...orgCardProps} desc = {"asd"} />
        );

        const seeMore = queryByTestId(testIds.orgCard.seeMore);
        expect(seeMore).toBeNull();
    })
})

describe("Org edit create", () => {
    const updateCreateEditOrg = jest.spyOn(updateOrCreateOrg, 'updateOrCreateOrg');

    test("if it renders right things for create mode", () => {
        const { queryByTestId } = render(
            <EditCreateOrg closeModal = {() => {}} edit = {false} {...orgCardProps} />
        );
        const container = queryByTestId(testIds.createEditOrg.container);
        expect(container).not.toBeNull();

        const title = queryByTestId(testIds.createEditOrg.title);
        expect(title).not.toBeNull();
        expect(title.innerHTML).toEqual("Create An Organization")

        const deleteCheckbox = queryByTestId(testIds.createEditOrg.deleteCheckbox);
        expect(deleteCheckbox).toBeNull();

        const createButton = queryByTestId(testIds.createEditOrg.createButton);
        expect(createButton).not.toBeNull();
        expect(createButton.innerHTML).toEqual("Create")
    })

    test("if it renders right things for edit mode", () => {
        const { queryByTestId } = render(
            <EditCreateOrg closeModal = {() => {}} edit = {true} {...orgCardProps} />
        );
        const container = queryByTestId(testIds.createEditOrg.container);
        expect(container).not.toBeNull();

        const title = queryByTestId(testIds.createEditOrg.title);
        expect(title).not.toBeNull();
        expect(title.innerHTML).toEqual("Request Edit")

        const deleteCheckbox = queryByTestId(testIds.createEditOrg.deleteCheckbox);
        expect(deleteCheckbox).not.toBeNull();

        const createButton = queryByTestId(testIds.createEditOrg.createButton);
        expect(createButton).not.toBeNull();
        expect(createButton.innerHTML).toEqual("Request Edit")
    })

    test("if it sends right info to updateCreateOrgFunct", () => {
        const { queryByTestId } = render(
            <EditCreateOrg closeModal = {() => {}} edit = {false} {...orgCardProps} />
        );

        const createButton = queryByTestId(testIds.createEditOrg.createButton);
        fireEvent.click(createButton);

        expect(updateCreateEditOrg).toBeCalledWith(orgCardProps, false, false)
    })
})