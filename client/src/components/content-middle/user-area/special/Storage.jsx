import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'

import Menu from './Menu'
import { Autorenew } from '@material-ui/icons'
import Loading from 'components/reusables/Loading'
import Failed from 'components/reusables/Failed'
import Item from 'components/reusables/Item'

import { fetchWarehouse } from 'redux/actions/User'
import { itemsWarehouse } from 'helpers/User'

const Storage = ({
  username,
  Storage: { warehouse, failed },
  fetchWarehouse
}) => {
  const [loading, setLoading] = useState(true)
  const [items, setItems] = useState([])

  const reFetcher = async () => {
    setLoading(true)
    await fetchWarehouse()
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
            <div className='inner'>
              {items.map((item, key) => (
                <Item key={key} hex={item} />
              ))}
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

export default connect(mapStateToProps, { fetchWarehouse })(Storage)
