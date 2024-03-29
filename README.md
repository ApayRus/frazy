<img src="https://frazy-7d371.web.app/logo.png" width="200">

# FraZy

<img src="https://user-images.githubusercontent.com/1222611/70366383-f9562980-18a7-11ea-82b3-13092feebaf9.png" align="right" hspace="10" />

[Live demo](https://frazy-7d371.web.app/material/72z3rX4hunX2eHscZZx1/ru)  

[Video demo](https://www.youtube.com/watch?v=Tk_lzrnaNfE)  

Article about the project on Medium:  
[Learning a Language by Audio — for the Chosen Few or for Everyone?](https://medium.com/@aparus/learning-by-audio-for-the-chosen-few-or-for-everyone-84de8c5f4ae9?source=friends_link&sk=334462505b464893e68c1e2b2fc32f66)

Frazy is a new kind of language learning materials.

The main idea is that **in an audio file you can play each phrase separately, and at the same time see its text and a translation**.

1. You can play the whole audio and watch captions.
2. Or you can scroll through the text and play only particular phrases.
3. You can set up a dictation and each phrase will be repeated a given number of times with a given delay.

You can also create similar materials yourself.

1. Add your audio file.
2. Highlight phrases in it.
3. Enter the language and the title.
4. Place the text so that each line corresponds to a phrase in the audio.
5. If necessary, add text for translation too.
6. Save and share with friends.
7. Then other people will offer their improvements and add translations in different languages.

**In this way, both a small poem and a large book can be adapted.**

This repository provides you with all you need to run a similar web-app on your own GoogleFirebase account.

## Install

```
git clone https://github.com/Aparus/frazy.git
cd frazy
npm install
```

## Stack

A complete backend of this app is [Google Firebase](https://firebase.google.com/).

- Authentication with Google-Provider
- Firestore for DB
- Storage for files
- Hosting
- Cloud Functions for the server code

The client side is bootstrapped with [Create-React-App](https://github.com/facebook/create-react-app) and logic is written with React and Redux.

To synchronize backend and frontend we use [React-Redux-Firebase](https://react-redux-firebase.com/).

User Interface is written on [Material-UI](https://material-ui.com/).

To visualize and control audio we use [Wavesurfer.js](https://wavesurfer-js.org/)

All these things above will be installed on your local machine after the `npm i` command, but we shared these links to help you dive into the project and get some theoretical basics about what is used here and how.

## Run and deploy

To run the whole app with your own cloud backend, you should create your own project (web-app) on [Google Firebase](https://firebase.google.com/) and you'll be provided with application credentials, which you should paste into the file `src/config/firebaseConfig`:

```
export default {
  apiKey: 'xxxx',
  authDomain: 'xxxx',
  databaseURL: 'xxxx',
  projectId: 'xxxx',
  storageBucket: 'xxxx',
  messagingSenderId: 'xxxx',
  appId: 'xxxx'
}
```

Also before running project, you should turn on all the above-mentioned Firebase elements (Auth, DB, Storage, Hosting). You can also [deploy app to Hosting](https://firebase.google.com/docs/hosting/quickstart).

The app will work properly on your machine except for uploading files from `localhost` into `Storage`. For that, you should set [cors config](https://firebase.google.com/docs/storage/web/download-files#cors_configuration).

You can also use external links to audio files in the app (mp3, ogg, etc). But make sure you're using `https` because http can be blocked by a browser while visualizing with web-audio-api.

## Data models

If you want to understand the code, there is some info about data-models in Frazy.

### Material

Material is the basic data model in the whole app. It contains the following fields:

```
 title: 'Great expectations. Chapter 1.',
 lang: 'en',
 unit: 'GreatExpectationsEn',
 order: '001',
 mediaLink: 'fileIdInStorageOrExternalHttpsLink',
 // 'folder/filename.mp3' or 'https://bbc.com/6minutEnglish.mp3'
 phrases: { 'phrase1id': { start: 1.06, end: 3.48, text: "Chapter One" }, ... },
 meta: {
    duration: 292.035, //  (seconds)
    translations: ['ru', 'es', ... ],
    revisions: { userId: { userName, time }, ... }
    created: { userId, userName, time: timestamp[13] },
    updated: { userId, userName, time: timestamp[13] }
 }
```

`lang` used for sorting materials. It can also affect display options. `lang:'ar'` loads special fonts and styles for Arabic.

`unit` used for assembling headings from the titles of materials of the same unit.

`order` is the order of a heading. If it is not set, createdAt timestamp will be applied by default.

`mediaLink` can be fileId in Cloud Storage, if you loaded your local file. Or it can be external httpS link to an audio file: mp3, ogg, etc.

`phrases` - `start`-`end` is a time interval in an audio file, and `text` is the text related to a particular phrase.

`meta` contains autogenerated data.

`duration` the length of an audio file in seconds.

`translations` \- all avaliable languages\. Array auto updates every time when someone adds new translation for the material\. Used for generating links to each translation\.

`revisions` \- short info for display revisions list\. Main data stored in subcollection 'revisions' at the document\.

`created, updated` \- assigned to the material when you add your own material or edit an existing one\. Used for ordering materials and for revisions history\.

### MaterialTr

```
title: 'Большие надежды',
lang: 'ru',
for: 'materialId',
phrases: { materialPhrase1id: { text: 'Глава первая' } },
 meta: {
    created: { userId, userName, time: timestamp[13] },
    updated: { userId, userName, time: timestamp[13] }
 }
```

Translations for Material. Phrases ids are exactly the same as in Material. Both texts will be synchronyzed by them.

Each material can have only one translation for each language. Also we use agreement, that translation id is the same like meterial's.
`translationId` = `materialId` + `_langCode`

For example:

`greatExpectationChapter1` --> `greatExpectationChapter1_ru` \- a Russian translation for the material\.

### Unit

```
title: 'Great Expectations',
author: 'Charles Dickens',
logo: 'storageId', // png, jpg
background: 'storageId',
heading: {
    materialId: {
        title: materialTitle,
        order: '001',
        created: { time },
        updated: { time }
    }, ...
}
```

The unit menu appears by clicking on the sandwich button in the bottom left corner of material screen and allows you to navigate through the materials in a unit, like chapters in a book. The heading changes every time, when someone change Material.title, and contains info for generating links to materials. It also contains ordering data such as `order`, `created` and `updated`.

At that moment you can't directly edit `Unit`. We will work on it in the future.

## Moderation flow

Every authorized user can add and edit materials. The old version of a document will be saved into the `revision` subcollection of a document. Every user has one cell for his revision. It's a guarantee that the added/edited material will be saved and will be available for you anytime. The app gets to publish the latest edition by default because every next user will do things based on the previous version and have more opportunities to improve the material/translation. If the community disagrees with a certain editor, they can 'report' to admins with a message stating what happened. It's for preventing malicious actions. After admins have done the investigation, they may decide to ban the user who did bad things to the materials.

## Import/Export format

If you done lots of work and want to save it locally, beneath Material Form click on the button `Show table`. You'll see simple table with all added by you phrases. Copy button in top left corner, will copy whole table into `clipboard`. Then you can save it in google spreadsheet. It is how export works.

If you have some data for import, srt subtitles, for example, use the same table for prepare data. Then paste them into textarea with `original text` and click button below form `Import subtitles`. Phrases will appear in waveform.

![export/import table](https://user-images.githubusercontent.com/1222611/71049958-fb946f80-2154-11ea-93c4-23f446b8ac2b.png)

## The following text has been autogenerated by Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
