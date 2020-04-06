import React from 'react'
import Typography from '@material-ui/core/Typography'
import htmlParser from 'html-react-parser'

/**
 * get plainText and return paragraphs with html inside (if necessary)
 * @param {*} props
 */
function PlainTextToParagraphs(props) {
  return (
    <div>
      {props.text.split(/\n\n/).map((paragraphContent, index) => {
        paragraphContent = htmlParser(paragraphContent)
        return (
          <Typography key={index} paragraph={true}>
            {paragraphContent}
          </Typography>
        )
      })}
    </div>
  )
}

export default PlainTextToParagraphs
