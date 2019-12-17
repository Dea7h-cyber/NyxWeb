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

export const parseStorageItems = warehouse =>
  warehouse
    .match(/[a-z0-9]{20}/gi)
    .map(
      (hex, i) =>
        !/f{20}/i.test(hex) && {
          hex,
          style: {
            top: Math.floor(i / 8) * 26,
            left: (i - Math.floor(i / 8) * 8) * 26,
            position: 'absolute',
            backgroundColor: 'rgba(0,0,0,0.3)'
          }
        }
    )
    .filter(item => item)
