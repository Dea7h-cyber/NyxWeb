import React, { useState, useEffect } from 'react'

export const TextField = ({
  label,
  name,
  value,
  onChange,
  rules,
  type,
  pattern,
  underline,
  match,
  required,
  autoComplete,
  autoCorrect,
  spellCheck
}) => {
  const [valid, setValid] = useState('')

  useEffect(() => {
    if (
      (!pattern.test(value) || (match && match !== value)) &&
      value.length > 3
    ) {
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
        required={required === false || required === 'false' ? 'false' : 'true'}
        autoComplete={
          autoComplete === true || autoComplete === 'true' ? 'on' : 'off'
        }
        autoCorrect={
          autoCorrect === true || autoCorrect === 'true' ? 'on' : 'off'
        }
        spellCheck={
          spellCheck === true || spellCheck === 'true' ? 'true' : 'false'
        }
        className={valid}
      />
      {label && <label>{label}</label>}
      {(underline === undefined || underline === true) && (
        <span className={`underline ${valid}`}></span>
      )}
      {valid === 'invalid' ? (
        <span className={`rules invalid`}>
          Woops, make sure this field has {rules || 'the right format'}
        </span>
      ) : (
        rules && <span className={`rules ${valid}`}>{rules}</span>
      )}
    </div>
  )
}
