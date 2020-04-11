export const playerSettings = {
  lang: 'en',
  playerSettings: 'Player settings',
  display: 'Display',
  showSlideshow: 'Slideshow',
  showWaveform: 'Waveform',
  showOriginalText: 'Original text',
  showTranslation: 'Translation',
  playback: 'Playback',
  volume: 'Volume',
  playbackRate: 'Speed',
  dictation: 'Dictation',
  repeats: 'Number of repetitions',
  delay: 'Delay between repetitions (* phrase length)',
}

export const loginDialog = {
  loginButtonMessageForAddMaterial: 'You have to log in to add new material.',
  loginButtonMessageForEditMaterial: 'You have to log in to edit the material.',
}

export const donate = {
  message: `Please donate to us via 
<a target='_blank' rel='noopener noreferrer' href='https://www.paypal.me/aparus'>
PayPal</a> or <a target='_blank' rel='noopener noreferrer' href='https://money.yandex.ru/to/41001512310147'>
YandexMoney</a>. 

What do we need money for?
`,
  expansionPanel: [
    {
      title: `Software Product`,
      content: `First of all, our project is a software product that is available to everyone both as a source code and an online service.

Coding is preceded by research, design and experiments.

<a target="_blank" rel='noopener noreferrer' href="https://github.com/aparus/frazy">
The code is open</a>
and you can trace the entire history of its creation from the first letter and estimate the volume.
We also publish future plans, current tasks and work process at
<a target="_blank" rel='noopener noreferrer' href="https://github.com/Aparus/frazy/projects/1">
Github projects</a>.
You can estimate their volume and usefulness.
`,
    },
    {
      title: `Technical costs`,
      content: `The service is hosted by Google Firebase and so far fits into the free 'Spark' tariff: 2 GB of file storage and 1 GB for the database. But as soon as we reach this limit, there will be monthly expenses based on this
<a target="_blank" rel='noopener noreferrer' href="https://firebase.google.com/pricing">
price list</a>.
`,
    },
    {
      title: `Content`,
      content: `In order to show the essence of the idea and its universality, we have added at least one material for each of the six official UN languages ​​with an English translation.

Although we expect users to add content themselves, we commit ourselves to moderation work.

Sometimes we will have to show an example, set the pace.
Content priorities and the work process are also published at
<a target="_blank" rel='noopener noreferrer' href="https://github.com/Aparus/frazy/projects/1">
Github projects</a>. These are only the first steps and we are looking for the best strategy for content.

The project includes many conceptual things that need to be worked out in detail and described in the form of text and video.
This implies creating documentation, lessons and articles on how things work, how to do this or that and why this or that decision is made.
`,
    },
    {
      title: `Priorities`,
      content: `1) Technical costs (without them, the site will not be able to function properly)

2) Completing planned work on the web platform. This is another $5k (based on $1k per month of work).

3) Content. We will add audiobooks, podcasts and other available materials based on user preferences.

4) SMM, creating and spreading information about us, searching for partners in universities, schools, diasporas and language forums.

5) Design.

6) We also want to cover our expenses for creating the first version of the program and launching the service.
    With all the code, demos and articles, it's $5k. (4 months of hard work of a programmer and a translator)
`,
    },
    {
      title: `Reporting`,
      content: `So that you don't accidentally send us extra or undeserved money, each donation will be reported in the following format:

      Date | Amount | Comment

A summary report will be published at the end of a month. All our work is open and can be followed on Github (for code), the site (for content), and social media (for news).
So, you can always estimate the amount of funds received by us and how we spent them.

As the project grows, we will apply for sponsorship to platforms supporting educational and open source projects.
At this stage, we are limited by a number of factors such as the lack of the Stripe payment system in our country and even a small number of stars on Github.
  `,
    },
    {
      title: `If there is no money`,
      content: `If we cannot raise the right amount of money to support the project, the site will work randomly with no guarantees and might even be closed.`,
    },
  ],
}

export const materialEditHelpers = {
  mediaAddDelete: `<div>
  Required. <br />
  If you are uploading a file, <br />
  it should be less than 10 MB. <br />
  If you are pointing to an external link, <br />
  it's better to be https, otherwise player can block it.
</div>`,
  unitInput: `<div>
Optional. <br />
<strong>Unique, without spaces.</strong> <br />
Unit is an ID for set of materials. <br />
If you are adding piece of book, <br />
then book name will be a Unit. <br />
Materials with the same Unit will be joined <br />
in the Menu at left-bottom corner.
</div>`,
  orderInput: `<div>
Optional. <br />
The order of the material <br />
among other materials of the same Unit.
</div>`,
  langInput: `<div>
Required. <br />
Official ISO 639-1 code of language. <br />
ar - Arabic <br />
ch - Chinese <br />
en - English <br />
es - Spanish <br />
fr - French <br />
ru - Russian <br />
You can use 
<a   target='_blank'   rel='noopener noreferrer'
  href='https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes'
>
  this table</a> 
  for choose right one.
</div>`,
}
