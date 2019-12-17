import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'

import Menu from './Menu'
import { Autorenew } from '@material-ui/icons'
import Loading from 'components/reusables/Loading'
import Failed from 'components/reusables/Failed'
import Item from 'components/reusables/Item'

import { fetchStorage } from 'redux/actions/User'
import { itemsWarehouse } from 'helpers/User'

const Storage = ({
  username,
  Storage: { warehouse, failed },
  fetchStorage
}) => {
  const [loading, setLoading] = useState(true)
  const [items, setItems] = useState([])

  const reFetcher = async () => {
    setLoading(true)
    await fetchStorage()
    setLoading(false)
  }

  useEffect(() => {
    reFetcher()
  }, [])

  useEffect(() => {
    if (warehouse) {
      setItems(itemsWarehouse(warehouse.Items))
    }
  }, [warehouse])

  return loading ? (
    <Loading />
  ) : failed ? (
    <Failed />
  ) : (
    <div>
      <h1 className='content-title'>
        {username}'s storage
        <Autorenew className='refresh-icon' onClick={reFetcher} />
      </h1>
      <section className='content-body'>
        <div className='content'>
          <Menu />
          <div className='storage'>
            <div
              className='inner'
              onDragStart={e => console.log(e)}
              onDragEnd={e => console.log(e)}>
              {items.map((item, key) => (
                <Item
                  key={key}
                  hex={item.hex}
                  style={{
                    top: item.top,
                    left: item.left,
                    position: 'absolute',
                    backgroundColor: 'rgba(0,0,0,0.3)'
                  }}
                  options={{ image: true, size: 26 }}
                />
              ))}
            </div>
          </div>

          <div className='storage'>
            <div className='inner'>
              <Item
                hex={'174FFF00EBC1D9805735'}
                style={{
                  top: 1,
                  left: 1,
                  position: 'absolute',
                  backgroundColor: 'rgba(0,0,0,0.3)'
                }}
                options={{ image: true, size: 26, fixed: true }}
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

const mapStateToProps = state => ({
  username: state.User.Login.username,
  Storage: state.User.Storage
})

export default connect(mapStateToProps, { fetchStorage })(Storage)
