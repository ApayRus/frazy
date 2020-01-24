import React from 'react'

import { makeStyles } from '@material-ui/core/styles'
import Avatar from '@material-ui/core/Avatar'
import PersonIcon from '@material-ui/icons/Person'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles(theme => ({
  actor: { display: 'flex', alignItems: 'baseline', marginBottom: -3, marginTop: 3 },
  avatar: { width: 12, height: 12 },
  name: { display: 'flex', marginLeft: 3 }
}))

function Phrases(props) {
  const classes = useStyles()
  return (
    <div className={classes.actor}>
      <Avatar className={classes.avatar}>
        <PersonIcon style={{ fontSize: 10 }} />
      </Avatar>
      <Typography className={classes.name} variant='caption' color='textSecondary'>
        {props.actor.name}
      </Typography>
    </div>
  )
}

export default Phrases
