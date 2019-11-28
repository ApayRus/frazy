import React from 'react'
import Event from './Event'
import { orderBy, map } from 'lodash'
import Typography from '@material-ui/core/Typography'

function LastEvents(props) {
  const lastEventsDoc = {
    'material-1': {
      action: 'material added',
      lang: 'en',
      trLang: '',
      title: 'A comfortable hole.',
      trTitle: '',
      avaliableTranslations: ['ru', 'ch', 'es'],
      updatedAt: 3
    },
    'material-2': {
      action: 'translation added',
      lang: 'en',
      trLang: 'au',
      title: 'A comfortable hole.',
      trTitle: 'Комфортабельная нора',
      avaliableTranslations: ['de', 'au', 'ar'],
      updatedAt: 2
    },
    'material-3': {
      action: 'translation updated',
      lang: 'en',
      trLang: 'fr',
      title: 'A comfortable hole.',
      trTitle: 'Комфортабельная нора',
      avaliableTranslations: ['fr', 'jp', 'es'],
      updatedAt: 1
    }
  }

  let lastEvents = map(lastEventsDoc, (elem, key) => {
    return {
      id: key,
      ...elem
    }
  })

  lastEvents = orderBy(lastEvents, 'updatedAt').reverse()

  return (
    <div>
      <Typography align='center' variant='h5'>
        Last updates
      </Typography>
      {lastEvents.map(event => (
        <Event {...event} />
      ))}
    </div>
  )
}

export default LastEvents
