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

export const countSubTotal = (cart) => {
  const sum = cart.reduce((accumulator, object) => {
    return accumulator + object.total;
  }, 0);
  return sum;
}
export const countTotalBayar = ({ subtotal, diskon, ongkir }) => {
  return (subtotal - diskon) + ongkir;
}

export const inputNumberLimit = (input, biggest, smallest) => {
  if (input > biggest) {
    return biggest
  } else if (input < smallest) {
    return smallest
  }
  return input
}

export const clearData = (data, excludes = []) => {
  excludes.forEach(key => delete data[key])
  Object.keys(data).forEach((key) => {
    if (Array.isArray(data[key])) {
      data[key].forEach((d) => {
        clearData(d)
      })
    } else {
      if (data[key] === null) data[key] = ""
      switch (typeof data[key]) {
        case 'object':
          clearData(data[key])
          break;
        case 'boolean':
          data[key] = false
          break;
        default:
          data[key] = null
          break;
      }
    }
  })
}