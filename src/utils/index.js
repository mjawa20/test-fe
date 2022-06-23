export const validate = (data, excludes = []) => {
  excludes = ["id", "createdAt", "updatedAt", ...excludes]

  const filtered = Object.keys(data).filter((key) => !excludes.includes(key))
  for (const key of filtered) {
    if (!data[key]) {
      return false
    }
  }
  return true;
}

export const getBarang = (barangs, id) => {
  console.log(barangs);
  console.log(id);
  return barangs.filter((item) => item.id == id);
};
