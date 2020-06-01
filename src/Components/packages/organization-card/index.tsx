const axios = require("axios");

type OrgData = {
    desc: string,
    _id: string,
    name: string,
    location: string,
    email: string,
    link: string,
    interests: { Name: string, Colour: string, ID: string }[]
}

export const updateOrCreateOrg = async (orgData: OrgData, isEdit: boolean, deleteReq: boolean): Promise<string | null> => {
    try {
        let res;
        console.log(orgData);
        console.log(isEdit);
        console.log(deleteReq);
        if (isEdit) res = await axios.put(`${process.env.REACT_APP_BASEURLNODE}/organization/request/${orgData._id}`, {
                deleteReq: deleteReq,
                ...orgData
            })
        else res = await axios.post(`${process.env.REACT_APP_BASEURLNODE}/organization/`, {...orgData})
        console.log(res);
        if (res.data.error != undefined) throw res.error;
        return null;
    } catch (err) {
        if (typeof err == "string") return err;
        return "Failed to update or create org";
    }
}