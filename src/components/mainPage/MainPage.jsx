import React, { useEffect, useState } from 'react'
import { CircularProgress } from '@material-ui/core'
import { Add as AddIcon } from '@material-ui/icons'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { firestoreConnect, isLoaded } from 'react-redux-firebase'
// import * as moment from 'moment'
import ButtonWithAuthPopover from '../auth/ButtonWithAuthPopover'
import Grid from '@material-ui/core/Grid'
import LastEvents from './LastEvents'

function MainPage(props) {
  const { events } = props

  const [isDataLoaded, setIsDataLoaded] = useState(false)

  useEffect(() => {
    if (isLoaded(events)) {
      setIsDataLoaded(true)
    }
    return () => {
      //on unmount
    }
  }, [events])

  const materialAddLink = 'material/add'

  const addButton = (
    <div style={{ position: 'fixed', bottom: 2, zIndex: 1, right: 2 }}>
      <ButtonWithAuthPopover
        redirectUrl={materialAddLink}
        message={`You should login before add a material. `}
        buttonIcon={<AddIcon />}
      />
    </div>
  )

  const eventList = (
    <Grid container>
      <Grid item xs={12} sm={12} md={6}>
        {isDataLoaded ? <LastEvents /> : <CircularProgress />}
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
  return { events: state.firestore.ordered.events }
}

export default compose(
  connect(mapStateToProps),
  firestoreConnect(props => {
    return [{ collection: 'events', orderBy: [['time', 'desc']] }]
  })
)(MainPage)
