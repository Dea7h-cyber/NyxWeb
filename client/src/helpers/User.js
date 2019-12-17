import Resources from '../config/Resources'

export const transformResources = response => {
  for (let key in Resources) {
    if (typeof response[key] === 'number') {
      Resources[key] = {
        ...Resources[key],
        amount: response[key]
      }
    } else {
      delete Resources[key]
    }
  }

  return {
    data: { ...Resources },
    others: { zen: response.zen, credits: response.credits }
  }
}

export const itemsWarehouse = warehouse =>
  warehouse
    .match(/[a-z0-9]{20}/gi)
    .map(
      (hex, i) =>
        !/f{20}/i.test(hex) && {
          hex,
          top: Math.floor(i / 8) * 26,
          left: (i - Math.floor(i / 8) * 8) * 26
        }
    )
    .filter(item => item)

// export const itemsWarehouse = hex => {
//   const items = []

//   for (let i = 0; i < hex.length / 20; i++) {
//     const itemHex = hex.substr(i * 20, 20)
//     if (!/f{20}/i.test(itemHex)) {
//       items.push({
//         hex: itemHex,
//         top: Math.floor(i / 8) * 26,
//         left: (i - Math.floor(i / 8) * 8) * 26
//       })
//     }
//   }

//   return items
// }
