export const checkIfInCategories = (arrayToCheck: any, categoriesToAllow: number[]) => {
    let render = false;
    for (let x = 0; x < categoriesToAllow.length; x++) {
        if (!arrayToCheck.find((catEle: any) => catEle.ID == categoriesToAllow[x])) {
            return true
        }
    }
    return (render || categoriesToAllow.length <= 0)
}