import React, { Fragment, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import CopyIcon from '@material-ui/icons/FileCopy'
import Collapse from '@material-ui/core/Collapse'
import Button from '@material-ui/core/Button'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'

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

function MaterialExportTable(props) {
  const {
    lang,
    trLang = '',
    title,
    trTitle = '',
    phrases = [],
    mediaLink,
    materialId,
    unit,
    order
  } = useSelector(state => state.pageContent)

  const classes = useStyles()

  const [isCopied, setIsCopied] = useState(false)
  const [expanded, setExpanded] = useState(false)

  const textAreaRef = useRef() //needed for copieng from clipboard
  const tableRef = useRef() //

  const copyToClipboard = e => {
    textAreaRef.current.value = tableRef.current.innerText
    textAreaRef.current.select()
    document.execCommand('copy')
    setIsCopied(true)
    setTimeout(() => setIsCopied(false), 2000)
  }

  const tableHead = (
    <Fragment>
      <tr>
        <th>
          <IconButton onClick={copyToClipboard} variant='contained' title='copy to clipboard'>
            <CopyIcon />
          </IconButton>
        </th>
        <th>materialId</th>
        <th>mediaLink</th>
        <th>unit</th>
        <th>order</th>
      </tr>
      <tr>
        <td></td>
        <td>{materialId}</td>
        <td>{mediaLink}</td>
        <td>{unit}</td>
        <td>{order}</td>
      </tr>
      <tr>
        <th>id</th>
        <th>start</th>
        <th>end</th>
        <th>
          {lang}: {title}
        </th>
        <th>
          {trLang}: {trTitle}
        </th>
      </tr>
    </Fragment>
  )

  const tableBody = phrases.map(elem => {
    const { id, start, end, text: orText, translations: { [trLang]: { text: trText = '' } } = {} } =
      elem || {}
    return (
      <tr style={{ backgroundColor: elem.color }} key={id}>
        <td>{id.replace('wavesurfer_', '')}</td>
        <td>{start.toFixed(2)}</td>
        <td>{end.toFixed(2)}</td>
        <td>{orText}</td>
        <td>{trText}</td>
      </tr>
    )
  })

  const table = (
    <table
      ref={tableRef}
      style={{ tableLayout: 'fixed', width: '100%', overflowWrap: 'break-word', fontSize: 12 }}
    >
      <thead>{tableHead}</thead>
      <tbody>{tableBody}</tbody>
    </table>
  )

  const buttonExpand = (
    <Button variant='contained' onClick={() => setExpanded(!expanded)}>
      Show table
      <ExpandMoreIcon
        size='small'
        edge='start'
        className={clsx(classes.expand, {
          [classes.expandOpen]: expanded
        })}
      />
    </Button>
  )

  const copiedStatusMessage = isCopied ? (
    <Typography style={{ display: 'inline', marginLeft: 10 }} color='secondary'>
      copied to clipboard
    </Typography>
  ) : (
    ''
  )

  return (
    <div style={{ padding: 10 }}>
      {buttonExpand}
      {copiedStatusMessage}
      <Collapse in={expanded} timeout='auto' unmountOnExit>
        {table}
        <textarea ref={textAreaRef}></textarea>
      </Collapse>
    </div>
  )
}

export default MaterialExportTable
