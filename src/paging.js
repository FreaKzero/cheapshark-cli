const termSize = require('term-size')
const readline = require('readline')
const chalk = require('chalk')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

function chunker (a, l) {
  if (a.length == 0) return []
  else return [a.slice(0, l)].concat(chunker(a.slice(l), l))
}

const paging = (arr, linesPerItem = 8) => {
  const tsize = termSize()
  const availableLines = tsize.rows
  const print = Math.floor(availableLines / linesPerItem)
  const chunks = chunker(arr, print)
  let cursor = 0

  console.log(chunks[0].join('\n'))

  process.stdin.on('keypress', (str, key) => {
    if (key.name === 'escape' || key.name === 'q' || (key.ctrl && key.name === 'c') || cursor > (chunks.length - 2)) {
      process.exit()
    } else {
      switch (key.name) {
        case 'p':
        case 'backspace':
          if (cursor > 0) cursor--
          break
        case 'n':
        case 'return':
        case 'space':
          cursor++
          break
      }
    }
    
    process.stdout.write('\033c');   // eslint-disable-line no-octal
    console.log('')
    console.log('Cheapshark CLI:    (n)ext | (p)revious | (q)uit')
    console.log(chunks[cursor].join('\n'))
  })
}

module.exports = paging
