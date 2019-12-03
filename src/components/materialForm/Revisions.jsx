/**
 * this component represents all revision of document (material or translation)
 * and by the click on "downgrade" downloads that old version of document
 * and replace with it stored in redux phrases
 */

import React, { useState } from 'react'
import { map } from 'lodash'
import clsx from 'clsx'
import * as moment from 'moment'
import Button from '@material-ui/core/Button'
import ButtonBase from '@material-ui/core/ButtonBase'
import Collapse from '@material-ui/core/Collapse'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import firebase from '../../firebase/firebase'

const useStyles = makeStyles(theme => ({
  collapsedBlock: {
    backgroundColor: theme.palette.grey[100],
    padding: 10
  },
  title: {
    color: 'skyblue',
    margin: 10,
    cursor: 'pointer'
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest
    })
  },
  expandOpen: {
    transform: 'rotate(180deg)'
  }
}))

function Revisions(props) {
  const db = firebase.firestore()
  const { revisions: revisionsDoc } = props
  const classes = useStyles()
  const [expanded, setExpanded] = useState(false)

  const loadRevision = (collection, docId, revisionId) => event => {
    db.collection(collection)
      .doc(docId)
      .collection('revisions')
      .doc(revisionId)
      .get()
      .then(doc => {
        console.log('revision doc.data()', doc.data())
      })
      .catch(error => console.log(error))
  }

  let revisions = map(revisionsDoc, (elem, key) => {
    const { userName, time } = elem
    return {
      id: key,
      userName,
      time
    }
  })

  return (
    <div>
      <Typography
        component={ButtonBase}
        onClick={() => setExpanded(!expanded)}
        className={classes.title}
        variant='body2'
      >
        Revisions ({revisions.length})
        <ExpandMoreIcon
          size='small'
          edge='start'
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded
          })}
        />
      </Typography>

      <Collapse in={expanded} timeout='auto' unmountOnExit>
        <div className={classes.collapsedBlock}>
          {revisions.map(elem => (
            <Typography variant='body2' key={elem.id}>
              {elem.userName}, {moment(elem.time).fromNow()}{' '}
              <Button
                style={{ color: 'skyblue', fontSize: 10, float: 'right' }}
                size='small'
                variant='text'
                onClick={loadRevision(props.collection, props.docId, elem.id)}
              >
                Downgrade
              </Button>
            </Typography>
          ))}
        </div>
      </Collapse>
    </div>
  )
}

export default Revisions
