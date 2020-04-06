import React from 'react'
import { useDispatch } from 'react-redux'

import { Button } from '@material-ui/core'
import OndemandVideoIcon from '@material-ui/icons/OndemandVideo'
import FavoriteIcon from '@material-ui/icons/Favorite'

import { setAppStateParam } from '../../store/appStateActions'

function TopButtons() {
  const dispatch = useDispatch()

  const handleDonateOpen = () => {
    dispatch(setAppStateParam({ showFullscreenDialog: true }))
  }

  return (
    <div style={{ marginTop: 5 }}>
      <Button
        target='_blank'
        href='https://www.youtube.com/watch?v=Tk_lzrnaNfE'
        variant='outlined'
        startIcon={<OndemandVideoIcon color='primary' />}
      >
        Demo
      </Button>
      <Button
        style={{ marginLeft: 15 }}
        variant='outlined'
        endIcon={<FavoriteIcon color='secondary' />}
        onClick={handleDonateOpen}
      >
        Donate
      </Button>
    </div>
  )
}

export default TopButtons
