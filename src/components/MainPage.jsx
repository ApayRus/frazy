import React, { useEffect, useState } from 'react'
import { List, ListItem, ListItemText, CircularProgress } from '@material-ui/core'
import { Add as AddIcon } from '@material-ui/icons'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { firestoreConnect, isLoaded } from 'react-redux-firebase'
import * as moment from 'moment'
import ButtonWithAuthPopover from './ButtonWithAuthPopover'

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

  const AddButton = () => {
    return (
      <div style={{ position: 'fixed', bottom: 2, zIndex: 1, right: 2 }}>
        <ButtonWithAuthPopover
          redirectUrl={materialAddLink}
          message={`You should login before add a material. `}
          buttonIcon={<AddIcon />}
        />
      </div>
    )
  }

  const EventList = () => {
    return isDataLoaded ? (
      <List>
        {events.map(event => {
          const { id, materialId, lang, trLang, title, trTitle, time, unit } = event
          const primaryText = `${lang}: ${title}`
          const secondaryText = `${trLang}: ${trTitle}, unit: ${unit}, time: ${moment(
            time
          ).fromNow()}`
          return (
            <ListItem
              key={id}
              component={Link}
              to={`/material/${materialId}/${trLang}`}
              button
              divider
            >
              <ListItemText primary={primaryText} secondary={secondaryText} />
            </ListItem>
          )
        })}
      </List>
    ) : (
      <CircularProgress />
    )
  }

  return (
    <div>
      <EventList />
      <AddButton />
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
