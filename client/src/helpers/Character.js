import React from 'react'

const getClassName = cClass => {
  switch (cClass) {
    case 0:
      return 'Dark Wizard'
    case 1:
      return 'Soul Master'
    case 16:
      return 'Dark Knight'
    case 17:
      return 'Blade Knight'
    case 32:
      return 'Fairy Elf'
    case 33:
      return 'Muse Elf'
    case 48:
      return 'Magic Gladiator'
    case 64:
      return 'Dark Lord'
    default:
      return 'unknown'
  }
}

const classToImage = cClass => {
  switch (cClass) {
    case 0:
    case 1:
      return 'sm'
    case 16:
    case 17:
      return 'bk'
    case 32:
    case 33:
      return 'elf'
    case 48:
      return 'mg'
    case 64:
      return 'dl'
    default:
      return 'bk'
  }
}

const pkNameColor = ({ name, pkCount, position }) => {
  let color = '#e6f7ff'
  let textDecoration = false

  if (pkCount) {
    if (pkCount < 0) {
      color = '#92c2d4'
    } else if (pkCount === 1) {
      color = '#ffad73'
    } else if (pkCount === 2) {
      color = '#ff5833'
    } else if (pkCount > 2) {
      color = '#ff0000'
    }
  }

  if (position !== undefined && position <= 3) {
    textDecoration = 'underline'
  }

  return <span style={{ color, textDecoration }}>{name}</span>
}

const getClassImage = cClass => `/images/classes/${classToImage(cClass)}.gif`

const amountTransform = amount => amount.toLocaleString()

const calculateExp = (characterLevel, characterExp) => {
  const level = characterLevel > 255 ? characterLevel - 255 : characterLevel
  const exp = (level + 9) * level * level * (characterLevel > 255 ? 1000 : 10)

  return characterExp > exp || characterLevel === 400
    ? 100
    : characterExp < 0
    ? 0
    : Math.floor(characterExp / exp) * 100
}

export {
  getClassName,
  getClassImage,
  pkNameColor,
  amountTransform,
  calculateExp,
  classToImage
}
