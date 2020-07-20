export const getSearchData = async (whatToSearchFor: string, userToken?: string) => {
    try {
        if (!(whatToSearchFor == "Organizations" || whatToSearchFor == "Events" || whatToSearchFor == "Activists")) throw "Error invalid search type.";
        if (userToken == null && whatToSearchFor == "Activists") return { error: "Must be logged in to see activists" };
        const resRaw = await fetch(`${whatToSearchFor == "Organizations" ? process.env.REACT_APP_BASEURLNODE : process.env.REACT_APP_BASEURL}/${whatToSearchFor.toLowerCase().substring(0, whatToSearchFor.length - 1)}/`, {
            method: "GET",
            headers: {
                "Authorization": (userToken && userToken.length >= 4 ? userToken : '123')
            }
        });
        const res = await resRaw.json();
        if (res.Error != undefined) throw res.Error;
        return res;
    } catch (err) {
        if (typeof err == "string") return {error: err};
        return { error: "Error getting activists. Sorry about that the service will return soon." };
    }
}