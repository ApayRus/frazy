import React, { useEffect, useState } from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'
import AddIcon from '@material-ui/icons/Add'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { firestoreConnect, isLoaded } from 'react-redux-firebase'
// import * as moment from 'moment'
import ButtonWithAuthPopover from '../auth/ButtonWithAuthPopover'
import Grid from '@material-ui/core/Grid'
import LastEvents from './LastEvents'
import local from '../../localization/en'

function MainPage(props) {
  const { lastEventsDoc } = props

  const [isDataLoaded, setIsDataLoaded] = useState(false)

  useEffect(() => {
    if (isLoaded(lastEventsDoc)) {
      setIsDataLoaded(true)
    }
    return () => {
      //on unmount
    }
  }, [lastEventsDoc])

  const materialAddLink = 'material/add'

  const addButton = (
    <div style={{ position: 'fixed', bottom: 2, zIndex: 1, right: 2 }}>
      <ButtonWithAuthPopover
        redirectUrl={materialAddLink}
        message={local.loginButtonMessageForAddMaterial}
        buttonIcon={<AddIcon />}
      />
    </div>
  )

  const eventList = (
    <Grid container>
      <div style={{ textAlign: 'center', width: '100%', marginTop: 3 }}>
        <div
          style={{
            backgroundImage: 'url(/logo.png)',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            width: 150,
            height: 94,
            display: 'inline-block'
          }}
        ></div>
      </div>
      <Grid item xs={12} sm={12} md={6}>
        {isDataLoaded ? (
          <LastEvents lastEventsDoc={lastEventsDoc} />
        ) : (
          <div style={{ textAlign: 'center' }}>
            <CircularProgress />
          </div>
        )}
      </Grid>
      <Grid item xs={12} sm={12} md={6}></Grid>
    </Grid>
  )

  return (
    <div>
      {eventList}
      {addButton}
    </div>
  )
}

const mapStateToProps = state => {
  return { lastEventsDoc: state.firestore.data.lastEventsDoc }
}

export default compose(
  connect(mapStateToProps),
  firestoreConnect(props => {
    return [
      {
        collection: 'lastEvents',
        doc: 'main',
        storeAs: 'lastEventsDoc'
      }
    ]
  })
)(MainPage)
