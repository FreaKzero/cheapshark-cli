const format = require('./src/format');
const cli = require('./src/cli');
const request = require('request');
const ora = require('ora');

const spinner = ora('Fetching from cheapshark').start();
request('http://www.cheapshark.com/api/1.0/deals',  (error, response, body) => {
  spinner.stop();
  try {
    const json = JSON.parse(body);
    
    const list = cli.flags.num ? 
      format(json, cli).slice(0, cli.flags.num) :
      format(json, cli);

    list.forEach(item => {
      console.log(item);
    }); 
  } catch(e) {
    console.log(e);
  }
 });


