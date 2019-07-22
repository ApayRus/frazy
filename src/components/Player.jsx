import React from 'react'
import { Typography } from '@material-ui/core'
import PlayerControls from './PlayerControls'
import Phrases from './Phrases'
import { exampleChapter } from '../dumyData/exampleChapter'
import { map } from 'lodash'
import DrawerHeading from './DrawerHeading'
import DrawerSettings from './DrawerSettings'

function Player() {
  let { phrases } = exampleChapter //object
  phrases = map(phrases, (elem, key) => {
    return { id: key, ...elem }
  }) //array

  import('../text/dynamicImport').then(module => {
    console.log(module.or1_1, module.ti1_1, module.tr1_1)
  })

  return (
    <div>
      <DrawerHeading />
      <DrawerSettings />
      <Typography variant='h3'>Player</Typography>
      <PlayerControls />
      <Phrases phrases={phrases} />
    </div>
  )
}

export default Player
