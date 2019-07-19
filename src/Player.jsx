import React from 'react'
import { Typography } from '@material-ui/core'
import PlayerControls from './PlayerControls'
import Phrases from './Phrases'
import { exampleChapter } from './dumyData/exampleChapter'
import { map } from 'lodash'

function Player() {
  let { phrases } = exampleChapter //object
  phrases = map(phrases, (elem, key) => {
    return { id: key, ...elem }
  }) //array

  return (
    <div>
      <Typography variant='h3'>Player</Typography>
      <PlayerControls />
      <Phrases phrases={phrases} />
    </div>
  )
}

export default Player
