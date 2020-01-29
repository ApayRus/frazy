import React from 'react'
import IconButton from '@material-ui/core/IconButton'
import { YouTube, Twitter, Mail, GitHub } from '@material-ui/icons'

function SocialMedia(props) {
  const socialMedias = [
    { title: 'Twitter', icon: <Twitter />, href: 'https://twitter.com/frazy_me' },
    {
      title: 'YouTube',
      icon: <YouTube />,
      href: 'https://www.youtube.com/channel/UCBVpYXb_SqRR-qc-oIprj-w'
    },
    { title: 'Mail', icon: <Mail />, href: 'mailto:admin@frazy.me' },
    {
      title: 'GitHub',
      icon: <GitHub style={{ fontSize: 20 }} />,
      href: 'https://github.com/Aparus/frazy'
    }
  ]

  return (
    <div>
      {socialMedias.map((elem, index) => (
        <a key={index} target='_blank' rel='noopener noreferrer' href={elem.href}>
          <IconButton title={elem.title} size='small'>
            {elem.icon}
          </IconButton>
        </a>
      ))}
    </div>
  )
}

export default SocialMedia
