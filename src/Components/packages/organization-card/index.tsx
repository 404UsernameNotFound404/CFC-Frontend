const axios = require("axios");

type OrgData = {
    desc: string,
    _id: string,
    name: string,
    location: string,
    email: string,
    link: string,
    interests: number[]
}

export const updateOrCreateOrg = async (orgData: OrgData, isEdit: boolean, deleteReq: boolean): Promise<string | null> => {
    try {
        let res;
        if (isEdit) res = await axios.put(`${process.env.REACT_APP_BASEURLNODE}/organization/request/${orgData._id}`, {
                deleteReq: deleteReq,
                ...orgData
            })
        else res = await axios.post(`${process.env.REACT_APP_BASEURLNODE}/organization/`, {...orgData})
        if (res.data.error != undefined) throw res.error;
        return null;
    } catch (err) {
        if (typeof err == "string") return err;
        return "Failed to update or create org";
    }
}