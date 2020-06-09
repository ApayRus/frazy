import React from 'react'

import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'

import { useSelector } from 'react-redux'

export default function Heading(props) {
  const {
    title,
    author,
    lang,
    description,
    trTitle,
    trAuthor,
    trLang,
    trDescription,
    logoUrl,
    backgroundUrl
  } = useSelector(state => state.menu)

  const useStyles = makeStyles(theme => ({
    header: {
      textAlign: 'center',
      padding: 20,
      backgroundImage: `linear-gradient(rgba(255,255,255,0.9), rgba(255,255,255,0.7)), url(${backgroundUrl})`,
      backgroundSize: 'cover',
      backgroundRepeat: 'round',
      backgroundPosition: 'center center'
    }
  }))

  const classes = useStyles()

  const Title = props => {
    const { title, lang, author } = props
    return (
      <>
        <Typography variant='h6'>{title}</Typography>
        <Typography variant='body2' style={{ marginTop: -11 }} color='primary'>
          {lang}
        </Typography>
        <Typography variant='subtitle1' style={{ marginTop: -7 }}>
          {author}
        </Typography>
      </>
    )
  }

  return (
    <div className={classes.header}>
      <Title {...{ title, lang, author }} />
      {logoUrl && <img style={{ maxWidth: 200, borderRadius: 100 }} alt={title} src={logoUrl} />}
      <Title {...{ title: trTitle, lang: trLang, author: trAuthor }} />
      <div style={{ textAlign: 'left' }}>
        {description && (
          <>
            <hr />
            <Typography variant='body1'>{description}</Typography>
          </>
        )}
        {trDescription && (
          <>
            <hr />
            <Typography variant='body1'>{trDescription}</Typography>
          </>
        )}
      </div>
    </div>
  )
}
