import React from 'react'
import Event from './Event'
import { orderBy, map } from 'lodash'
import Typography from '@material-ui/core/Typography'

function LastEvents(props) {
  const { lastEventsDoc } = props

  let lastEvents = map(lastEventsDoc, (elem, key) => {
    return {
      unit: key,
      ...elem
    }
  })

  lastEvents = orderBy(lastEvents, 'time').reverse()

  return (
    <div style={{ marginTop: 20 }}>
      <Typography align='center' color='primary' variant='h5'>
        Last updates
      </Typography>
      {lastEvents.map(event => (
        <Event key={event.unit} {...event} />
      ))}
    </div>
  )
}

export default LastEvents
