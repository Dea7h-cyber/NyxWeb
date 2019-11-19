const hex = '4DCE3200EBBFB7293792'

const [_group, options, durability, , , , , exo, _ancient] = new Buffer.from(
  hex,
  'hex'
)
const serial = hex.substr(6, 8)
const excellent = Array(6)
  .fill()
  .map((_, index) => (exo >> index) & 0b1)

// Extra options
const skill = (options >> 7) & 0b1
const level = (options >> 3) & 0b1111
const luck = (options >> 2) & 0b1
const add = (options & 0b11) | (((exo >> 6) & 0b1) << 2)

// Item group
const group = ((_group >> 4) | ((exo >> 3) & 0b10000)) >> 1

// Item ID
const id = (_group & 0b00001111) | ((_group >> 4) % 2 ? 0b10000 : 0)

// Ancient
const ancient = _ancient & 0b100 ? 5 : _ancient & 0b1000 ? 10 : 0

id
group
level
luck
add
excellent
durability
serial
skill
ancient
