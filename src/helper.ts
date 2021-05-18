export function getRandom(min: number, max: number) {
  const first = Math.ceil(min)
  const last = Math.floor(max)
  return Math.floor(Math.random() * (last - first + 1)) + first
}

function getNewRandom(theRandom) {
  return (theRandom = {
    ENCDPS: getRandom(2200, 4500),
    'damage%': `${getRandom(3, 28)}%`,
    'crithit%': `${getRandom(0, 76)}%`,
    'healed%': `${getRandom(0, 30)}%`,
    ENCHPS: getRandom(0, 6000),
    deaths: getRandom(0, 3),
  })
}

var timer = setInterval(function (ActXivData) {
  const combatant = ActXivData.Combatant
  let theRandom
  for (const i in combatant) {
    getNewRandom(theRandom)
    combatant[i] = { ...combatant[i], ...theRandom }
  }
  ActXivData.Combatant = combatant
  var event = new CustomEvent('onOverlayDataUpdate', { detail: ActXivData })
  document.dispatchEvent(event)
}, 2000)
