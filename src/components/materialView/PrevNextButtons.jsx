import React from 'react'
import map from 'lodash/map'
import orderBy from 'lodash/orderBy'
import findIndex from 'lodash/findIndex'
import Button from '@material-ui/core/Button'
import ArrowRightIcon from '@material-ui/icons/ArrowRight'
import ArrowLeftIcon from '@material-ui/icons/ArrowLeft'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { clearCachedDocs } from '../../store/appStateActions'

function PrevNextButtons(props) {
  const { heading } = useSelector(state => state.menu)
  const { materialId, trLang } = useSelector(state => state.pageContent)
  const dispatch = useDispatch()
  let headingOrdered = map(heading, (elem, key) => ({ id: key, ...elem }))
  headingOrdered = orderBy(headingOrdered, ['order'], ['asc'])
  const materialIndex = findIndex(headingOrdered, { id: materialId })
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
          to={`/material/${nextMaterial.id}/${trLang}`}
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
          to={`/material/${prevMaterial.id}/${trLang}`}
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
