import React from 'react'
import { Fab } from '@material-ui/core'
import { Add as AddIcon } from '@material-ui/icons'
import { Link } from 'react-router-dom'

function MainPage() {
  const AddButton = () => {
    return (
      <Fab
        component={Link}
        to='material/add'
        color='primary'
        size='medium'
        style={{ position: 'fixed', bottom: 2, zIndex: 1, right: 2 }}
      >
        <AddIcon />
      </Fab>
    )
  }

  return (
    <div>
      <AddButton />
    </div>
  )
}

export default MainPage
