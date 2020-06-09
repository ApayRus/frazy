import React from 'react'

import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'

import { useSelector } from 'react-redux'

function Heading(props) {
  const { title, author, logoUrl, backgroundUrl } = useSelector(state => state.menu)

  const useStyles = makeStyles(theme => ({
    header: {
      textAlign: 'center',
      padding: 20,
      backgroundImage: `linear-gradient(rgba(255,255,255,0.9), rgba(255,255,255,0.7)), url(${backgroundUrl})`,
      backgroundSize: 'cover',
      backgroundRepeat: 'round',
      backgroundPosition: 'center center'
    }
  }))

  const classes = useStyles()

  return (
    <div className={classes.header}>
      <Typography variant='h6'>{title}</Typography>
      <Typography variant='subtitle1'>{author}</Typography>
      {logoUrl && <img style={{ maxWidth: 200, borderRadius: 100 }} alt={title} src={logoUrl} />}
    </div>
  )
}

export default Heading
