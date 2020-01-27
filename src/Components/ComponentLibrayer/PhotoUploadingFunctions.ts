import Cookie from 'js-cookie';

const axios = require("axios")

export const UploadPhoto = async (file: any, token: any) => {
    try {
        //get url
        const res = await axios.post(`${process.env.REACT_APP_BASEURL}/getPreSignedURL`, JSON.stringify({ }), { headers: {"Authorization": Cookie.get("authToken")}});
        console.log(res.data)
        let photoURL = await uploadToAmazon(res.data.Valid, file)
        // let updateProfilePhotoRes = await updateProfilePhoto(photoURL)
        // console.log(updateProfilePhotoRes)
        return true
    }
    catch (err) {
        console.log(err)
    }
}


export const uploadToAmazon = async (preSignedURL: any, file: any) => {
    console.log(file)
    const config = {
        headers: {
            'Content-Type': file.type,
        },
    };
    let amazonRes = await axios.put(preSignedURL, file, config)
    console.log(amazonRes)
    return amazonRes;
}

export const updateProfilePhoto = async (link: string) => {
    const res = await axios.post(`${process.env.REACT_APP_BASEURL}/addProfilePhoto`, JSON.stringify({ Link: link}), { headers: {"Authorization": Cookie.get("authToken")}});
    return res
}