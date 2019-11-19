const hexDecode = hex => {
  if (hex.length !== 20) {
    return console.error('Supported only 20 characters hex code')
  }

  const [_group, options, durability, , , , , exo, _ancient] = new Buffer.from(
    hex,
    'hex'
  )

  const serial = hex.substr(6, 8)
  const excellent = Array(6)
    .fill()
    .map((_, index) => (exo >> index) & 0b1)
  const group = ((_group >> 4) | ((exo >> 3) & 0b10000)) >> 1
  const id = (_group & 0b00001111) | ((_group >> 4) % 2 ? 0b10000 : 0)
  const luck = (options >> 2) & 0b1
  const level = (options >> 3) & 0b1111
  const skill = (options >> 7) & 0b1
  const add = (options & 0b11) | (((exo >> 6) & 0b1) << 2)
  const ancient = _ancient & 0b100 ? 5 : _ancient & 0b1000 ? 10 : 0

  return {
    id,
    group,
    excellent,
    durability,
    luck,
    level,
    skill,
    add,
    serial,
    ancient
  }
}

export { hexDecode }
