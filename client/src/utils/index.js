export function millisToMinutesAndSeconds(millis, text) {
  var minutes = Math.floor(millis / 60000)
  var seconds = ((millis % 60000) / 1000).toFixed(0)
  var minText = ':'
  var secText = ''
  if (text) {
    minText = minutes > 1 ? ' minutes ' : ' minute '
    secText = seconds > 1 ? ' seconds ' : ' second '
  }

  return minutes + minText + (seconds < 10 ? '0' : '') + seconds + secText
}
