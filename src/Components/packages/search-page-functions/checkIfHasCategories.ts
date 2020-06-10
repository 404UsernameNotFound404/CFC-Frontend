export const checkIfInCategories = (arrayToCheck: number[], categoriesToAllow: number[]) => {
    let render = false;
    for (let x = 0; x < categoriesToAllow.length; x++) {
        if (arrayToCheck.find((catEle: number) => categoriesToAllow[x] === catEle) != null) return true
    }
    return (render || categoriesToAllow.length <= 0)
}