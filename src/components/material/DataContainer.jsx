import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setData } from '../../store/dataActions'
import { setAppStateParams } from '../../store/appStateActions'
import { fetchRequest } from '../../utils/fetch'
import Page from './Page'

/**
 * this component loads data from Firebase:  material and translation, join them and pass for display
 * @param {} props
 */
export default function MaterialDataContainer(props) {
  const dispatch = useDispatch()
  const { materialId, trLang } = useSelector(state => state.appState)
  const [isLoadedMaterial, setIsLoadedMaterial] = useState(false)
  const [isLoadedMaterialTr, setIsLoadedMaterialTr] = useState(false)
  const [isLoadedUnit, setIsLoadedUnit] = useState(false)
  const [isLoadedUnitTr, setIsLoadedUnitTr] = useState(false)
  const [unitId, setUnitId] = useState()

  // MATERIAL
  useEffect(() => {
    const { materialId, trLang } = props.match.params
    dispatch(setAppStateParams({ trLang, materialId }))
  }, [])

  // MATERIAL
  useEffect(() => {
    const fetchData = async () => {
      const materialResponse = await fetchRequest(`/api/material?_id=${materialId}`)
      const { data: material } = materialResponse
      setUnitId(material.unit)
      dispatch(setData({ material }))
      setIsLoadedMaterial(true)
    }
    if (materialId) {
      fetchData()
    }
  }, [materialId])

  // TRANSLATION for MATERIAL
  useEffect(() => {
    const fetchData = async () => {
      const translationResponse = await fetchRequest(
        `/api/material-tr?for=${materialId}&lang=${trLang}`
      )
      const { data: translation } = translationResponse
      dispatch(setData({ materialTranslations: { [trLang]: translation } }))
      setIsLoadedMaterialTr(true)
    }
    if (setIsLoadedMaterial && trLang) fetchData()
  }, [materialId, trLang, setIsLoadedMaterial])

  // UNIT
  useEffect(() => {
    const fetchData = async () => {
      const unitResponse = await fetchRequest(`/api/unit?_id=${unitId}`)
      const { data: unit } = unitResponse
      dispatch(setData({ unit }))
      setIsLoadedUnit(true)
    }
    if (unitId) fetchData()
  }, [unitId])

  // TRANSLATION for UNIT
  useEffect(() => {
    const fetchData = async () => {
      const unitTrResponse = await fetchRequest(`/api/unit-tr?for=${unitId}&lang=${trLang}`)
      const { data: unitTr } = unitTrResponse
      dispatch(setData({ unitTranslations: { [trLang]: unitTr } }))
      setIsLoadedUnitTr(true)
    }
    if (unitId) fetchData()
  }, [unitId])

  return (
    <div>
      {JSON.stringify(
        { isLoadedMaterial, isLoadedMaterialTr, isLoadedUnit, isLoadedUnitTr },
        null,
        2
      )}
      <Page />
    </div>
  )
}
