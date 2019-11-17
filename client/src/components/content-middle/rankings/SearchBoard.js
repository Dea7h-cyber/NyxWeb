import React, { useState } from 'react'

export default ({ passed: { search, setSearch } }) => {
  const [searchName, setSearchName] = useState('')
  const toggleClass = e => {
    const toToggle = Number(e.target.id)
    const searchClass = search.class

    search.class.includes(toToggle)
      ? searchClass.splice(searchClass.indexOf(toToggle), 1)
      : searchClass.push(toToggle)

    setSearch({ ...search, class: searchClass })
  }

  const onClickOrder = (type, order) => {
    setSearch({
      ...search,
      order: [type, order]
    })
  }

  const onSubmit = e => {
    e.preventDefault()
    setSearch({ ...search, name: searchName })
  }

  return (
    <>
      <div className='search-bar classes'>
        <label className='row' htmlFor='1'>
          <input
            type='checkbox'
            id='1'
            onChange={toggleClass}
            checked={search.class.includes(1)}
          />
          Soul Master
        </label>

        <label className='row' htmlFor='17'>
          <input
            type='checkbox'
            id='17'
            onChange={toggleClass}
            checked={search.class.includes(17)}
          />
          Blade Knight
        </label>

        <label className='row' htmlFor='33'>
          <input
            type='checkbox'
            id='33'
            onChange={toggleClass}
            checked={search.class.includes(33)}
          />
          Muse Elf
        </label>

        <label className='row' htmlFor='48'>
          <input
            type='checkbox'
            id='48'
            onChange={toggleClass}
            checked={search.class.includes(48)}
          />
          Magic Gladiator
        </label>

        <label className='row' htmlFor='64'>
          <input
            type='checkbox'
            id='64'
            onChange={toggleClass}
            checked={search.class.includes(64)}
          />
          Dark Lord
        </label>
      </div>

      <div className='search-bar sort'>
        <div className='row'>
          Resets
          <div className='buttons-group'>
            <div
              className={`button ${
                search.order[0] === 'Resets' && search.order[1] === 'desc'
                  ? ' active'
                  : ''
              }`}
              onClick={() => onClickOrder('Resets', 'desc')}>
              desc
            </div>
            <div
              className={`button ${
                search.order[0] === 'Resets' && search.order[1] === 'asc'
                  ? ' active'
                  : ''
              }`}
              onClick={() => onClickOrder('Resets', 'asc')}>
              asc
            </div>
          </div>
        </div>

        <div className='row'>
          Levels
          <div className='buttons-group'>
            <div
              className={`button ${
                search.order[0] === 'cLevel' && search.order[1] === 'desc'
                  ? ' active'
                  : ''
              }`}
              onClick={() => onClickOrder('cLevel', 'desc')}>
              desc
            </div>
            <div
              className={`button ${
                search.order[0] === 'cLevel' && search.order[1] === 'asc'
                  ? ' active'
                  : ''
              }`}
              onClick={() => onClickOrder('cLevel', 'asc')}>
              asc
            </div>
          </div>
        </div>

        <div className='row'>
          Sky Wins
          <div className='buttons-group'>
            <div
              className={`button ${
                search.order[0] === 'SkyEventWins' && search.order[1] === 'desc'
                  ? ' active'
                  : ''
              }`}
              onClick={() => onClickOrder('SkyEventWins', 'desc')}>
              desc
            </div>
            <div
              className={`button ${
                search.order[0] === 'SkyEventWins' && search.order[1] === 'asc'
                  ? ' active'
                  : ''
              }`}
              onClick={() => onClickOrder('SkyEventWins', 'asc')}>
              asc
            </div>
          </div>
        </div>

        <div className='row'>
          Zen
          <div className='buttons-group'>
            <div
              className={`button ${
                search.order[0] === 'Money' && search.order[1] === 'desc'
                  ? ' active'
                  : ''
              }`}
              onClick={() => onClickOrder('Money', 'desc')}>
              desc
            </div>
            <div
              className={`button ${
                search.order[0] === 'Money' && search.order[1] === 'asc'
                  ? ' active'
                  : ''
              }`}
              onClick={() => onClickOrder('Money', 'asc')}>
              asc
            </div>
          </div>
        </div>
        <div className='row'>
          PK Count
          <div className='buttons-group'>
            <div
              className={`button ${
                search.order[0] === 'PkCount' && search.order[1] === 'desc'
                  ? ' active'
                  : ''
              }`}
              onClick={() => onClickOrder('PkCount', 'desc')}>
              desc
            </div>
            <div
              className={`button ${
                search.order[0] === 'PkCount' && search.order[1] === 'asc'
                  ? ' active'
                  : ''
              }`}
              onClick={() => onClickOrder('PkCount', 'asc')}>
              asc
            </div>
          </div>
        </div>
      </div>
      <div className='search-bar byName'>
        <form onSubmit={onSubmit}>
          <input
            type='text'
            value={searchName}
            onChange={e => setSearchName(e.target.value)}
            placeholder='search character'
          />
          <button>SEARCH</button>
        </form>
      </div>
    </>
  )
}
