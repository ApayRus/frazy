export const regions = [
  { end: 1.11, id: 'ovkn4s83m5o', start: 0.04, text: 'rewrited 1', color: randomColor(0.5) },
  { end: 5.63, id: '6ok7g02flig', start: 4.35, text: 'rewrited 2', color: randomColor(0.5) },
  { end: 9.24, id: '7rmfpjlqrhg', start: 7.54, text: 'rewrited 3', color: randomColor(0.5) },
  { end: 15.74, id: 'a5enr655fvo', start: 13.08, text: 'rewrited 4', color: randomColor(0.5) },
  { end: 19.06, id: 'g6ass5deea8', start: 16.37, text: 'rewrited 5', color: randomColor(0.5) },
  { end: 21.98, id: 'hbo8c1cmrio', start: 19.13, text: 'rewrited 6', color: randomColor(0.5) },
  { end: 27.29, id: 'nh16hivul3g', start: 21.98, text: 'rewrited 7', color: randomColor(0.5) },
  { end: 29.56, id: 'nrn9em65dv', start: 28.05, text: 'rewrited 8', color: randomColor(0.5) },
  { end: 31.73, id: '3m2afac1d9o', start: 29.56, text: 'rewrited 9', color: randomColor(0.5) }
]

function randomColor(alpha) {
  return (
    'rgba(' +
    [~~(Math.random() * 255), ~~(Math.random() * 255), ~~(Math.random() * 255), alpha || 1] +
    ')'
  )
}
