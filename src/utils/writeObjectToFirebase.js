/**
 * this module uploads documents to firestore database
 */

import admin from 'firebase-admin'
import firebaseConfig from '../config/firebaseConfig.js'
import serviceAccount from '../config/firebaseAdminKey.json'

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: firebaseConfig.databaseURL
})

const db = admin.firestore()

const addObjectToCollection = (collection, object, id) => {
  //if id is undefined it will be generated
  if (id) {
    db.collection(collection)
      .doc(id)
      .set(object)
      .then(snapshot => console.log(snapshot))
      .catch(error => console.log('error', error))
  } else {
    db.collection(collection)
      .add(object)
      .then(snapshot => console.log(snapshot))
      .catch(error => console.log('error', error))
  }
}

const mainPageNew = {
  theAutobiographyOfBenjaminFranklinEn: {
    materialId: '8LdsVeYZdzk7Xfy1nhFE',
    actions: ['material updated'],
    lang: 'en',
    time: 1578005375593,
    title: 'The Autobiography of Benjamin Franklin. Chapter one (1) ',
    trLang: 'ru',
    trTitle: 'Автобиография Бенджамина Франклина. Глава первая (1) ',
    translations: ['ru']
  },
  faustGoetheDe: {
    materialId: 'RJbp5BWLA6gIPubpEfiR',

    actions: ['translation updated'],
    lang: 'de',
    time: 1578530781691,
    title: 'Faust. Prolog im Himmel (1)',
    trLang: 'en',
    trTitle: 'Faust. Prologue in Heaven (1)',
    translations: ['ru', 'en']
  },
  LeAvventureDiPinocchioIt: {
    materialId: 'G0DoG500nhN7qbD6Gndr',
    unit: 'LeAvventureDiPinocchioIt',
    actions: ['translation added'],
    lang: 'it',
    time: 1578317609723,
    title: 'Le avventure di Pinocchio. Capitolo primo',
    trLang: 'en',
    trTitle: 'The Adventures of Pinocchio. Chapter One',
    translations: ['ru', 'en']
  },
  prideAndPrejudiceEn: {
    materialId: 'UNFLNMBNl2z1bQFlykXm',

    actions: ['material added', 'translation added'],
    lang: 'en',
    time: 1577543906108,
    title: 'Pride and Prejudice. Chapter 4',
    trLang: 'ru',
    trTitle: 'Гордость и предубеждение. Глава 4',
    translations: ['ru']
  },
  lePetitPrinceFr: {
    material: 'UAFvcWZLjJT1rzIDR8Ak',

    actions: ['material updated'],
    lang: 'fr',
    time: 1577296667880,
    title: 'Le petit prince. Chapitre un',
    trLang: 'en',
    trTitle: 'The Little Prince. Chapter One',
    translations: ['ru', 'en']
  },
  turkishPoetryTr: {
    materialId: 'Z8Nr6JMIHnfd73yTEShW',

    actions: ['translation updated'],
    lang: 'tr',
    time: 1576954508126,
    title: 'Orhan Veli Kanık: İstanbul’u Dinliyorum',
    trLang: 'ru',
    trTitle: 'Орхан Вели Канык: Я слушаю Стамбул',
    translations: ['ru']
  },
  englishSongs: {
    materialId: '9s4UflPhrhohKy2kUSht',

    actions: ['material updated', 'translation added'],
    lang: 'en',
    time: 1576931424757,
    title: 'Imagine Dragons: Believer',
    trLang: 'ru',
    trTitle: 'Imagine Dragons: Верующий',
    translations: ['ru']
  },
  englishPoetry: {
    materialId: 'cdI6OzL9MCzl8O2FisS7',
    unit: 'englishPoetry',
    actions: ['material updated'],
    lang: 'en',
    time: 1576906462375,
    title: 'Sara Teasdale: Let it be forgotten',
    trLang: 'ru',
    trTitle: 'Сара Тисдейл: Пусть это будет забыто ',
    translations: ['ru']
  },

  SpanishSongs: {
    materialId: 'X0JWwlDLv7rOgi1O14fc',

    actions: ['material updated'],
    lang: 'es',
    time: 1576897216700,
    title: 'Luis Fonsi: Despacito',
    trLang: 'ru',
    trTitle: 'Медленно',
    translations: ['ru']
  },
  HebrewSongs: {
    materialId: '0K6S12rQonKHsYe6wQUI',

    actions: ['translation updated'],
    lang: 'he',
    time: 1576891679224,
    title: 'אריק איינשטיין - כשאת בוכה את לא יפה ',
    trLang: 'en',
    trTitle: "Arik Einstein - When You Cry You Aren't Pretty",
    translations: ['ru', 'en']
  },
  '3000SpokenChinesePhrases': {
    materialId: '1U3RZP1kHVLgIbQcMcDa',

    actions: ['translation updated'],
    lang: 'ch',
    time: 1576795219186,
    title: '常用汉语句 1. 从起床到出门 ',
    trLang: 'en',
    trTitle: 'Spoken Chinese. 1. From waking up to going out',
    translations: ['ru', 'en']
  },
  lezgiPoetry: {
    materialId: 'YwFofmdGJzBWx7h1jb2L',

    actions: ['material updated'],
    lang: 'lz',
    time: 1576748027365,
    title: 'Чlалакай баллада. Седакъет Керимова',
    trLang: 'ru',
    trTitle: 'Баллада о языке',
    translations: ['ru']
  },
  '6minuteEnglishFromBBC': {
    materialId: '72z3rX4hunX2eHscZZx1',

    actions: ['material updated'],
    lang: 'en',
    time: 1576733149526,
    title: 'Does your age affect your political views?',
    trLang: 'ru',
    trTitle: 'Влияет ли ваш возраст на политические взгляды?',
    translations: ['ru']
  },
  '3000SpokenEnglishPhrases': {
    materialId: 'NlD2LSoMa80u7cpMwxcK',

    actions: ['material updated'],
    lang: 'en',
    time: 1576548192743,
    title: 'Unit 3. I Wanna Take a Nap',
    trLang: 'ru',
    trTitle: '§ 3. Я хочу вздремнуть',
    translations: ['ru']
  },
  EineFrauEinMann: {
    materialId: 'GZFuSgsGtsUnM37n5WEy',
    unit: 'EineFrauEinMann',
    actions: ['translation added'],
    lang: 'de',
    time: 1576143188442,
    title: 'Tanners Party',
    trLang: 'ru',
    trTitle: 'Вечеринка у Таннера',
    translations: ['ru']
  },
  hobbit: {
    materialId: 'hobbit1_1',

    actions: ['material updated', 'translation added'],
    lang: 'en',
    time: 1575503360603,
    title: '1.1. comfortable hole',
    trLang: 'ru',
    trTitle: '1.1. Комфортабельная нора ',
    translations: ['ru']
  }
}
// addObjectToCollection('material', object)
addObjectToCollection('lastEvents', mainPageNew, 'main')
