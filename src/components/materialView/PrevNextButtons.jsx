import React from 'react'
import orderBy from 'lodash/orderBy'
import findIndex from 'lodash/findIndex'
import Button from '@material-ui/core/Button'
import ArrowRightIcon from '@material-ui/icons/ArrowRight'
import ArrowLeftIcon from '@material-ui/icons/ArrowLeft'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { clearCachedDocs } from '../../store/appStateActions'

function PrevNextButtons(props) {
  const {
    unit: { heading }
  } = useSelector(state => state.data)
  const { materialId, trLang } = useSelector(state => state.appState)
  const dispatch = useDispatch()
  const headingOrdered = orderBy(heading, ['created.time'], ['asc'])
  const materialIndex = findIndex(headingOrdered, { _id: materialId })
  const nextMaterial = headingOrdered[materialIndex + 1]
  const prevMaterial = headingOrdered[materialIndex - 1]

  const handleClick = () => {
    dispatch(clearCachedDocs())
  }

  return (
    <div style={{ marginBottom: 52, display: 'inline-block', width: '99%' }}>
      {nextMaterial && (
        <Button
          component={Link}
          to={`/material/${nextMaterial._id}/${trLang}`}
          onClick={handleClick}
          variant='contained'
          style={{ float: 'right', marginTop: 2 }}
          endIcon={<ArrowRightIcon />}
          title='next material'
        >
          {nextMaterial.title}
        </Button>
      )}
      {prevMaterial && (
        <Button
          component={Link}
          to={`/material/${prevMaterial._id}/${trLang}`}
          onClick={handleClick}
          variant='contained'
          style={{ float: 'left', marginTop: 2 }}
          startIcon={<ArrowLeftIcon />}
          title='previous material'
        >
          {prevMaterial.title}
        </Button>
      )}
    </div>
  )
}

export default PrevNextButtons
