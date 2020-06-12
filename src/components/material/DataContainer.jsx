/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setData, clearData, clearMaterial } from '../../store/dataActions'
import { clearPageContent } from '../../store/pageContentActions'
import { setAppStateParams } from '../../store/appStateActions'
import { fetchRequest } from '../../utils/fetch'
import Page from './Page'

/**
 * this component loads data from Firebase:  material and translation, join them and pass for display
 * @param {} props
 */
export default function MaterialDataContainer(props) {
  const dispatch = useDispatch()

  const { trLang } = useSelector(state => state.appState)

  const { isLoadedMaterial, isLoadedMaterialTr, isLoadedUnit, isLoadedUnitTr } = useSelector(
    state => state.data
  )

  const [unitId, setUnitId] = useState()
  const { materialId } = props.match.params

  // MATERIAL
  useEffect(() => {
    const { trLang } = props.match.params
    const editMode = props.location.search.match('editMode=true') ? true : false
    dispatch(setAppStateParams({ trLang, materialId, editMode }))
    if (!trLang) {
      dispatch(setData({ isLoadedMaterialTr: true }))
      dispatch(setData({ isLoadedUnitTr: true }))
    }
    return () => {
      dispatch(clearData())
      dispatch(clearPageContent())
    }
  }, [])

  useEffect(() => {
    const { materialId } = props.match.params
    dispatch(setAppStateParams({ materialId }))
  }, [materialId])

  // MATERIAL
  useEffect(() => {
    const fetchData = async () => {
      const materialResponse = await fetchRequest(`/api/material?_id=${materialId}`)
      const { data: material } = materialResponse
      setUnitId(material.unit)
      dispatch(setData({ material }))
      dispatch(setData({ isLoadedMaterial: true }))
    }
    if (materialId) {
      fetchData()
    }
    return () => {
      dispatch(clearMaterial())
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
      dispatch(setData({ isLoadedMaterialTr: true }))
    }
    if (materialId && trLang) fetchData()
  }, [materialId, trLang])

  // UNIT
  useEffect(() => {
    const fetchData = async () => {
      const unitResponse = await fetchRequest(`/api/unit?_id=${unitId}`)
      const { data: unit } = unitResponse
      dispatch(setData({ unit }))
      dispatch(setData({ isLoadedUnit: true }))
    }
    if (unitId) fetchData()
  }, [unitId])

  // TRANSLATION for UNIT
  useEffect(() => {
    const fetchData = async () => {
      const unitTrResponse = await fetchRequest(`/api/unit-tr?for=${unitId}&lang=${trLang}`)
      const { data: unitTr } = unitTrResponse
      dispatch(setData({ unitTranslations: { [trLang]: unitTr } }))
      dispatch(setData({ isLoadedUnitTr: true }))
    }
    if (unitId && trLang) fetchData()
  }, [unitId, trLang])

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
