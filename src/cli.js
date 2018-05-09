const meow = require('meow');

const cli = meow(`
Usage
  $ cheapshark <input>

Options
  --num,   -n  Number of Items to show          default: 30
  --sort   -s  Sort by: [ price|rating|title ]  default: price
  --order  -o  Order of items [ asc|desc ]      default: desc

Example
  $ cheapshark -n 3 -s title -o asc
`, {
	flags: {
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
});

module.exports = cli;