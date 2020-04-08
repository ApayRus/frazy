import React, { useEffect, useState } from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'
import AddIcon from '@material-ui/icons/Add'
import { useSelector } from 'react-redux'
import { useFirestoreConnect, isLoaded } from 'react-redux-firebase'
// import * as moment from 'moment'
import ButtonWithAuthPopover from '../auth/ButtonWithAuthPopover'
import Grid from '@material-ui/core/Grid'
import LastEvents from './LastEvents'
import local from '../../localization/en'
import SocialMedia from '../layout/SocialMedia'
import Donate from '../donate/Donate'
import TopButtons from './TopButtons'
import FullscreenDialog from '../layout/FullscreenDialog'
import ToolBar from './ToolBar'

function MainPage() {
  const [isDataLoaded, setIsDataLoaded] = useState(false)

  useFirestoreConnect(() => [
    {
      collection: 'lastEvents',
      doc: 'main',
      storeAs: 'lastEventsDoc',
    },
  ])

  const { lastEventsDoc } = useSelector((state) => state.firestore.data)

  useEffect(() => {
    if (isLoaded(lastEventsDoc)) {
      setIsDataLoaded(true)
    }
    return () => {
      //on unmount
    }
  }, [lastEventsDoc])

  const materialAddLink = 'material/add'

  const AddButton = () => (
    <div style={{ position: 'fixed', bottom: 2, zIndex: 1, right: 2 }}>
      <ButtonWithAuthPopover
        redirectUrl={materialAddLink}
        message={local.loginButtonMessageForAddMaterial}
        buttonIcon={<AddIcon />}
      />
    </div>
  )

  const Heading = () => (
    <div style={{ textAlign: 'center', width: '100%', marginTop: 10 }}>
      <a href='http://frazy.me'>
        <img src='/logo.png' alt='main logo' style={{ width: 150, height: 94 }} />
      </a>
      <SocialMedia />
      <TopButtons />
    </div>
  )

  const LastEventsGrid = () => (
    <Grid container>
      <Grid item sm={2} md={3}></Grid>
      <Grid item xs={12} sm={8} md={6}>
        {isDataLoaded ? (
          <LastEvents lastEventsDoc={lastEventsDoc} />
        ) : (
          <div style={{ textAlign: 'center', marginTop: 20 }}>
            <CircularProgress />
          </div>
        )}
      </Grid>
      <Grid item sm={2} md={3}></Grid>
    </Grid>
  )

  return (
    <div>
      <Heading />
      <div style={{ height: 20 }} />
      <ToolBar />
      <LastEventsGrid />
      <div style={{ height: 55 }} />
      <AddButton />
      <FullscreenDialog title='Donate' contentComponent={<Donate />} />
    </div>
  )
}

export default MainPage
