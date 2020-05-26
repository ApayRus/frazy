import React, { useRef } from 'react'
import firebase from '../../firebase/firebase'

function Testnetworking() {
  let valueRef = useRef()

  const onSubmit = async () => {
    const reqObject = JSON.parse(valueRef.current.value)

    /* 
    const reqObject = {
      "url": "http://localhost:3000/api/materials",
      "options": {
        "method": "GET"
      }
    }
 */
    const currentUser = firebase.auth().currentUser
    const authtoken = await currentUser.getIdToken(true)

    // console.log('authtoken', authtoken)
    const { displayName, uid } = firebase.auth().currentUser
    console.log('currentUser', displayName, uid)
    reqObject.options.headers = {
      'Content-Type': 'application/json',
    }
    reqObject.options.headers.authtoken = authtoken
    console.log(authtoken)
    reqObject.options.body = JSON.stringify(reqObject.options.body)
    console.log('options', reqObject.options)
    const requestResult = await fetch(reqObject.url, reqObject.options)

    console.log('response', await requestResult.json())
  }

  return (
    <div>
      <textarea ref={valueRef}></textarea>
      <br />
      <button onClick={onSubmit}>Submit</button>
    </div>
  )
}

export default Testnetworking
