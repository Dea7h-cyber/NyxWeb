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

  return Resources
}
