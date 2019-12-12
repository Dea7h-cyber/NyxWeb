import React, { useState, useEffect } from 'react'

export const TextField = ({
  label,
  name,
  value,
  onChange,
  rules,
  type,
  pattern
}) => {
  const [valid, setValid] = useState('')

  useEffect(() => {
    if (pattern.test(value) && value.length > 3) {
      setValid('invalid')
    } else {
      setValid('')
    }
  }, [value, pattern])

  return (
    <div className='nyxForms wrapper'>
      <input
        type={type || 'text'}
        value={value}
        onChange={onChange}
        name={name}
        required
        autoComplete='off'
        autoCorrect='off'
        spellCheck='false'
        className={valid}
      />
      <label>{label}</label>
      <span className={`underline ${valid}`}></span>
      {rules && <span className={`rules ${valid}`}>{rules}</span>}
    </div>
  )
}
