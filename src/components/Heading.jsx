import React from 'react'
import bookInfo from '../content/GENERATEDheading.js'
import { List, ListItem, ListItemText, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { connect } from 'react-redux'
import { toggleHeadingDrawer } from '../store/appStateActions'
import { Link } from 'react-router-dom'

const useStyles = makeStyles(theme => ({
  header: {
    textAlign: 'center',
    padding: 20,
    background: 'url("../img/menu-background.jpg")'
  },
  listItem: {
    paddingTop: 0,
    paddingBottom: 0,
    fontSize: '12px',
    lineHeight: 1
  }
}))

function Heading(props) {
  const { toggleHeadingDrawer } = props
  const classes = useStyles()
  const heading = bookInfo.heading
  const bookTitle = bookInfo.title.ru
  const bookAuthor = bookInfo.author.ru

  const handleClick = () => {
    toggleHeadingDrawer({ showHeadingDrawer: false })
  }

  return (
    <div>
      <div className={classes.header}>
        <Typography variant='h6'>{bookTitle}</Typography>
        <Typography variant='subtitle1'>{bookAuthor}</Typography>
        <img alt={bookTitle} src='../img/logo.png' />
      </div>

      <List>
        {heading.map(elem => {
          return (
            <ListItem
              component={Link}
              to={`/material/${elem.id}`}
              className={classes.listItem}
              button
              divider
              onClick={handleClick}
              key={`heading-${elem.id}`}
            >
              <ListItemText primary={elem.title.en} secondary={elem.title.ru} />
            </ListItem>
          )
        })}
      </List>
    </div>
  )
}

const mapDispatchToProps = dispatch => {
  return {
    toggleHeadingDrawer: payload => dispatch(toggleHeadingDrawer(payload))
  }
}

export default connect(
  null,
  mapDispatchToProps
)(Heading)
