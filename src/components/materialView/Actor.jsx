import React from 'react'

import { makeStyles } from '@material-ui/core/styles'
import Avatar from '@material-ui/core/Avatar'
import PersonIcon from '@material-ui/icons/Person'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles((theme) => ({
  actor: (props) => {
    return {
      display: 'flex',
      alignItems: 'baseline',
      marginBottom: -3,
      marginTop: 10,
      direction: props.direction,
    }
  },
  avatar: { width: 14, height: 14 },
  name: (props) => {
    const margin = props.direction === 'ltr' ? { marginLeft: 3 } : { marginRight: 3 }
    return { display: 'flex', ...margin }
  },
}))

function Phrases(props) {
  const { direction } = props
  const classes = useStyles({ direction })
  return (
    <div className={classes.actor}>
      <Avatar className={classes.avatar}>
        <PersonIcon style={{ fontSize: 14 }} />
      </Avatar>
      <Typography className={classes.name} variant='body1' color='textSecondary'>
        {props.actor.name}
      </Typography>
    </div>
  )
}

export default Phrases
