import React from 'react'
import { useFirestoreConnect, isLoaded } from 'react-redux-firebase'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import CircularProgress from '@material-ui/core/CircularProgress'

export default function MaterialList(props) {
  useFirestoreConnect(props => {
    return {
      collection: 'material',
      where: ['unit', '==', ''],
      storeAs: 'customMaterialList'
    }
  })

  const { customMaterialList } = useSelector(state => state.firestore.ordered)

  return (
    <div>
      {isLoaded(customMaterialList) ? (
        <ol>
          {customMaterialList.map(elem => {
            const { title, id } = elem
            return (
              <li key={id}>
                <Link to={`/material/${id}`}>{title}</Link>
                <br />
                <small>{id}</small>
              </li>
            )
          })}
        </ol>
      ) : (
        <CircularProgress />
      )}
    </div>
  )
}
