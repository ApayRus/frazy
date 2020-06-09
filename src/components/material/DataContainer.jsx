import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { setData } from '../../store/dataActions'
import { fetchRequest } from '../../utils/fetch'

/**
 * this component loads data from Firebase:  material and translation, join them and pass for display
 * @param {} props
 */
export default function MaterialDataContainer(props) {
  const dispatch = useDispatch()
  const { materialId, trLang } = props.match.params
  const [isLoadedMaterial, setIsLoadedMaterial] = useState(false)
  const [isLoadedMaterialTr, setIsLoadedMaterialTr] = useState(false)
  const [isLoadedUnit, setIsLoadedUnit] = useState(false)
  const [isLoadedUnitTr, setIsLoadedUnitTr] = useState(false)
  const [unitId, setUnitId] = useState()

  // MATERIAL
  useEffect(() => {
    const fetchData = async () => {
      const materialResponse = await fetchRequest(`/api/material?_id=${materialId}`)
      const { data: material } = materialResponse
      setUnitId(material.unit)
      dispatch(setData({ material }))
      setIsLoadedMaterial(true)
    }
    fetchData()
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
    if (setIsLoadedMaterial) fetchData()
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
    </div>
  )
}
