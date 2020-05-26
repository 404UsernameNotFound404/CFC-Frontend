export const getCategories = async () => {
    try {
        const res = await fetch(`${process.env.REACT_APP_BASEURL}/getCategories`, {method: "GET"});
        let allCategories = await res.json()
        return allCategories;
    } catch (err) {
        //TODO
    }

}