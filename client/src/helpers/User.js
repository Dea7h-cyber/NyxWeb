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

export const itemsWarehouse = hex => {
  const items = []

  for (let i = 0; i < hex.length / 20; i++) {
    const item = hex.substr(i * 20, 20)
    if (item !== 'ffffffffffffffffffff') {
      items.push(item)
    }
  }

  return items
}
