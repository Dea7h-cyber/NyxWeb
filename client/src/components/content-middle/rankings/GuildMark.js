import React from 'react'

// Helpers
import { colorDecode } from '../../../helpers/Guild'

export default ({ passed: { mark, size } }) => {
  const generateLogo = () => {
    const width = size / 8
    const height = size / 8
    const logo = []
    for (let i = 0; i < 64; i++) {
      logo.push(
        <div
          key={i}
          style={{ width, height, background: colorDecode(mark[i]) }}
          className='cell'
        />
      )
    }

    return logo
  }

  return (
    mark && (
      <div className='guild-logo' style={{ width: size, height: size }}>
        {generateLogo()}
      </div>
    )
  )
}
