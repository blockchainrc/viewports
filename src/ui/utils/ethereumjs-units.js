var BigNumber = require('bignumber.js')

var Units = {}

var rawUnits = {
  "wei":          "1",
  "kwei":         "1000",
  "Kwei":         "1000",
  "babbage":      "1000",
  "femtoether":   "1000",
  "mwei":         "1000000",
  "Mwei":         "1000000",
  "lovelace":     "1000000",
  "picoether":    "1000000",
  "gwei":         "1000000000",
  "Gwei":         "1000000000",
  "shannon":      "1000000000",
  "nanoether":    "1000000000",
  "nano":         "1000000000",
  "szabo":        "1000000000000",
  "microether":   "1000000000000",
  "micro":        "1000000000000",
  "finney":       "1000000000000000",
  "milliether":   "1000000000000000",
  "milli":        "1000000000000000",
  "ether":        "1000000000000000000",
  "eth":          "1000000000000000000",
  "kether":       "1000000000000000000000",
  "grand":        "1000000000000000000000",
  "mether":       "1000000000000000000000000",
  "gether":       "1000000000000000000000000000",
  "tether":       "1000000000000000000000000000000"
};
var units = {}

Object.keys(rawUnits).map(function (unit) {
  units[unit] = new BigNumber(rawUnits[unit], 10)
})

Units.units = rawUnits

var re = RegExp(/^[0-9]+\.?[0-9]*$/)

Units.convert = function (value, from, to) {
  // if (!re.test(value)) {
  //   throw new Error('Unsupported value')
  // }

  from = from.toLowerCase()
  if (!units[from]) {
    throw new Error('Unsupported input unit')
  }

  to = to.toLowerCase()
  if (!units[to]) {
    throw new Error('Unsupported output unit')
  }

  return new BigNumber(value, 10).times(units[from]).div(units[to]).toString(10)
}

Units.lazyConvert = function (value, to) {
  var tmp = value.split(' ')
  if (tmp.length !== 2) {
    throw new Error('Invalid input')
  }
  return Units.convert(tmp[0], tmp[1], to) + ' ' + to
}
// //console.log(Units.convert('0x0','wei','eth'))

module.exports = Units
