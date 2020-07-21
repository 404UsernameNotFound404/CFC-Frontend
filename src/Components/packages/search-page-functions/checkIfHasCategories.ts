export const checkIfInCategories = (
  arrayToCheck: number[],
  categoriesToAllow: number[]
) => {
  let render = false;
  for (let x = 0; x < categoriesToAllow.length; x++) {
    if (typeof categoriesToAllow == "number") {
      if (
        arrayToCheck.find(
          (catEle: number) => categoriesToAllow[x] === catEle
        ) != null
      )
        return true;
    } else {
      if (
        !!arrayToCheck.find((catEle: any) => catEle.ID == categoriesToAllow[x])
      ) {
        return true;
      }
    }
  }
  return render || categoriesToAllow.length <= 0;
};
