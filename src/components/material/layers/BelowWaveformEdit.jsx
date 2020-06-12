import React from 'react'
import MaterialExportTable from '../../materialForm/ExportTable'
import ParallelTextareas from '../../materialForm/MaterialFormPhrases'
import ButtonSubmit from '../../materialForm/ButtonSubmit'
import ButtonImportSubtitles from '../../materialForm/ButtonImportSubtitles'

export default function MaterialForm(props) {
  return (
    <>
      <div>
        <ParallelTextareas />
      </div>
      <div style={{ textAlign: 'left' }}>
        <MaterialExportTable />
      </div>
      <div style={{ textAlign: 'right' }}>
        <ButtonImportSubtitles />
        <ButtonSubmit />
      </div>
    </>
  )
}
