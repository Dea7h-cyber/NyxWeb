import React from 'react'

// Helpers
import { colorDecode } from 'helpers/Guild'

const generateLogo = (mark, size) =>
  mark.split('').map((symbol, key) => (
    <div
      key={key}
      style={{
        width: size / 8,
        height: size / 8,
        background: colorDecode(symbol)
      }}
      className='cell'
    />
  ))

export default ({ passed: { mark, size } }) =>
  mark && (
    <div className='guild-logo' style={{ width: size, height: size }}>
      {generateLogo(mark, size)}
    </div>
  )
