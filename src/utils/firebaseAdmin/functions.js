/**
 * written for Firestore query result iteration doc, gets
 * doc.createTime or doc.updateTime, and returns js timestamp
 * @example
 * doc //is { createTime, updateTime, id, data, ... }
 * doc.createTime and doc.updateTime //is { seconds: 1574183421, nanoseconds: 658019000}
 * //we need standart js timestamp Date.now(), 13 symbols
 * docTimestamps(doc) // { createdAt: 1574183421658 , updatedAt: 1574183421658 }
 */
export function docTimestamps(doc) {
  const joinAndCut = docTime => `${docTime.seconds}${docTime.nanoseconds}`.substr(0, 13)
  const createdAt = joinAndCut(doc.createTime)
  const updatedAt = joinAndCut(doc.updateTime)
  return { createdAt, updatedAt }
}
