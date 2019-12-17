import React, { useEffect, useState } from 'react'
import { Tooltip } from '@material-ui/core'
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles'
import { connect } from 'react-redux'

// Components
import Loading from 'components/reusables/Loading'

// Actions
import { Logout, fetchResources } from 'redux/actions/User'

const UserArea = ({ Resources, fetchResources }) => {
  const [loading, setLoading] = useState(true)
  const [resources, setResources] = useState([])

  useEffect(() => {
    const getResources = async () => {
      await fetchResources()
      setLoading(false)
    }

    getResources()
  }, [fetchResources])

  useEffect(() => {
    const theme = createMuiTheme({
      overrides: {
        MuiTooltip: {
          tooltip: {
            backgroundColor: 'black'
          }
        }
      }
    })

    let list = []
    for (let key in Resources.data) {
      const res = Resources.data[key]

      list.push(
        <MuiThemeProvider theme={theme} key={key}>
          <Tooltip title={res.name}>
            <div className='wrapper'>
              <div
                className='resource'
                style={{
                  background: `url('/images/items/resources/${key}.gif') no-repeat center center/25px 25px, url('/images/items/slot.png') no-repeat center center/contain`
                }}>
                <span className='amount'>{res.amount}</span>
              </div>
            </div>
          </Tooltip>
        </MuiThemeProvider>
      )
    }

    setResources(list)
  }, [Resources])

  const styles = {
    wrapper: {
      width: '100%',
      height: 'auto'
    },
    resource: { background: 'rgb(14, 14, 14)', padding: 5 },
    credits: {
      float: 'right',
      color: 'rgb(122, 130, 9)'
    }
  }

  return (
    <>
      <div className='user-resources'>
        {loading ? (
          <Loading size={35} onlyIcon={true} />
        ) : Resources.failed ? (
          'Resources failed to load'
        ) : (
          resources
        )}
      </div>
      {!loading && !Resources.failed && (
        <div className='wrapper' style={styles.wrapper}>
          <div
            className='resource'
            style={{ ...styles.resource, color: '#1d3c05' }}>
            Zen {Resources.others.zen}
            <span style={styles.credits}>cr. {Resources.others.credits}</span>
          </div>
        </div>
      )}
    </>
  )
}

const mapStateToProps = state => ({
  Login: state.User.Login,
  Resources: state.User.Resources
})

export default connect(mapStateToProps, { Logout, fetchResources })(UserArea)
