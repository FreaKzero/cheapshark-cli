const meow = require('meow')

const cli = meow(`
Usage
  $ cheapshark <input>

Options
  --num,        -n  Number of Items to show                default: 30
  --sort        -s  [price,rating,title,deal,date]         default: date
  --order       -o  Order of items: [asc,desc]             default: asc
  --store       -b  Only view deals from a specific store  default: all
  --list-stores -l  List available stores

Example
  $ cheapshark -n 3 -s title -o asc
  $ cheapshark --num 5 --store steam
`, {
  listStores: {
    store: {
      type: 'string',
      alias: 'l'
    },
  },
  flags: {
    store: {
      type: 'string',
      alias: 'b'
    },
    num: {
      type: 'string',
      alias: 'n'
    },
    order: {
      type: 'string',
      alias: 'o'
    },
    sort: {
      type: 'string',
      alias: 's'
    }
  }
})

module.exports = cli
