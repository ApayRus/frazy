import React, { useState } from 'react'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import { setAppStateParams } from '../../store/appStateActions'
import { Link } from 'react-router-dom'
import orderBy from 'lodash/orderBy'
import { useDispatch, useSelector } from 'react-redux'
import { getDownloadUrlById } from '../../utils/firebase'

function Heading(props) {
  const { title, author, heading, logo, background } = useSelector(state => state.menu)
  const [logoUrl, setLogoUrl] = useState()
  const [backgroundUrl, setBackgroundUrl] = useState()
  getDownloadUrlById([logo, background]).then(result => {
    setLogoUrl(result[0])
    setBackgroundUrl(result[1])
  })
  const { trLang } = useSelector(state => state.pageContent)
  const dispatch = useDispatch()

  const headingOrdered = orderBy(heading, ['created.time'], ['asc'])

  const useStyles = makeStyles(theme => ({
    header: {
      textAlign: 'center',
      padding: 20,
      backgroundImage: `linear-gradient(rgba(255,255,255,0.9), rgba(255,255,255,0.7)), url(${backgroundUrl})`,

      backgroundSize: 'cover',
      backgroundRepeat: 'round',
      backgroundPosition: 'center center'
    },
    listItem: {
      paddingTop: 0,
      paddingBottom: 0,
      fontSize: '12px',
      lineHeight: 1
    }
  }))

  const classes = useStyles()

  const handleClick = () => {
    dispatch(setAppStateParams({ showHeadingDrawer: false }))
    // dispatch(clearCachedDocs())
  }

  return (
    <div>
      <div className={classes.header}>
        <Typography variant='h6'>{title}</Typography>
        <Typography variant='subtitle1'>{author}</Typography>
        {logo && <img style={{ maxWidth: 200, borderRadius: 100 }} alt={title} src={logoUrl} />}
      </div>
      <List>
        {headingOrdered.map(elem => {
          return (
            <ListItem
              component={Link}
              to={`/material/${elem._id}/${trLang}`}
              className={classes.listItem}
              button
              divider
              onClick={handleClick}
              key={`heading-${elem._id}`}
            >
              <ListItemText primary={elem.title} /* secondary={elem.title.ru} */ />
            </ListItem>
          )
        })}
      </List>
    </div>
  )
}

export default Heading
