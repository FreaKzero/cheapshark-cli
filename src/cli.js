const meow = require('meow')

const cli = meow(`
Usage
  $ cheapshark <input>
  --help            Show this usage dialog
  --list-stores     List available stores

Options
  --num         -n  Number of Items to show                default: 60
  --sort        -s  [price,rating,title,deal,date]         default: date
  --order       -o  Order of items: [asc,desc]             default: asc
  --store       -b  Only view deals from a specific store  default: all
  --page        -p  Show results in paged mode             default: false

Paged Mode Controls
  [n|return|space]  Next Page
  [p|backspace]     Previous Page
  [q|escape]        Quit 

Example
  $ cheapshark -n 3 -s title -o asc
  $ cheapshark --num 5 --store steam
`, {
  page: {
    type: 'string'
  },
  listStores: {
    type: 'string'
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
