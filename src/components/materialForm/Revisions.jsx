/**
 * this component represents all revision of document (material or translation)
 * and by the click on "downgrade" downloads that old version of document
 * and replace with it stored in redux phrases
 */

import React, { useState } from 'react'
import { map, orderBy } from 'lodash'
import clsx from 'clsx'
import * as moment from 'moment'
import Button from '@material-ui/core/Button'
import ButtonBase from '@material-ui/core/ButtonBase'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import Collapse from '@material-ui/core/Collapse'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import { updateFromMaterial, updateFromTranslation } from '../../store/pageContentActions'
import firebase from '../../firebase/firebase'
import { useSelector, useDispatch } from 'react-redux'

const useStyles = makeStyles(theme => ({
  collapsedBlock: {
    backgroundColor: theme.palette.grey[50]
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
  const classes = useStyles()
  const dispatch = useDispatch()

  const revisionsDoc = useSelector(state => {
    const { materialRevisions, translationRevisions } = state.pageContent
    return props.collection === 'material' ? materialRevisions : translationRevisions
  })
  const [expanded, setExpanded] = useState(false)

  const loadRevision = (collection, docId, revisionId) => event => {
    const action = collection === 'material' ? updateFromMaterial : updateFromTranslation
    db.collection(collection)
      .doc(docId)
      .collection('revisions')
      .doc(revisionId)
      .get()
      .then(doc => {
        console.log('doc revision', doc.data())
        dispatch(action({ doc: doc.data() }))
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

  revisions = orderBy(revisions, 'meta.updated.time').reverse()

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
          <List>
            {revisions.map((elem, index) => {
              const isNotLastElem = index === revisions.length - 1 ? false : true
              return (
                <ListItem key={elem.id} divider={isNotLastElem}>
                  <ListItemText disableTypography>
                    <Typography variant='body2'>
                      {elem.userName}, {moment(elem.time).fromNow()}
                    </Typography>
                  </ListItemText>
                  <ListItemSecondaryAction>
                    <Button
                      style={{ color: 'skyblue', fontSize: 10, float: 'right' }}
                      size='small'
                      variant='text'
                      onClick={loadRevision(props.collection, props.docId, elem.id)}
                    >
                      Downgrade
                    </Button>
                  </ListItemSecondaryAction>
                </ListItem>
              )
            })}
          </List>
        </div>
      </Collapse>
    </div>
  )
}

export default Revisions
