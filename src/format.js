const chalk = require('chalk')
const getSort = require('./getSort')
const moment = require('moment')

const format = (data, cli) => {
  const ratingGreen = [
    'Overwhelmingly Positive',
    'Very Positive',
    'Positive'
  ]

  const ratingYellow = [
    'Mostly Positive',
    'Mixed'
  ]

  const colorRating = (rating) => {
    if (ratingGreen.indexOf(rating) > -1) return chalk.bold.green(rating)
    if (ratingYellow.indexOf(rating) > -1) return chalk.bold.yellow(rating)
    return chalk.red(rating)
  }

  const colorCritic = (critic) => {
    if (parseFloat(critic) > 70) return chalk.bold.green(`(${critic} Points)`)
    if (parseFloat(critic) > 55) return chalk.bold.yellow(`(${critic} Points)`)
    return chalk.bold.red(`(${critic} Points)`)
  }

  const colorPriceRate = (rate, savings) => {
    if (parseFloat(rate) > 9) return chalk.bold.green(`${rate} | ${parseInt(savings)}% Savings`)
    if (parseFloat(rate) > 7.5) return chalk.bold.yellow(`${rate} | ${parseInt(savings)}% Savings`)
    return chalk.bold.grey(`${rate} | ${parseInt(savings)}% Savings`)
  }

  const deals = cli.flags.store
    ? data.filter(item => item.store.toUpperCase() === cli.flags.store.toUpperCase())
    : data

  return deals.sort(getSort(cli.flags.sort, cli.flags.order)).map((data, idx) => {
    const {
      dealID,
      dealRating,
      title,
      store,
      salePrice,
      normalPrice,
      lastChange,
      metacriticLink,
      metacriticScore,
      steamRatingText,
      steamRatingCount,
      steamRatingPercent,
      savings
    } = data

    return `
  ${chalk.bold.cyanBright(`${idx + 1}. ${title}`)} ${chalk.black.bgCyan(` ${store} `)} 
    ${chalk.grey('Price:')}      ${chalk.bold.cyan(salePrice + ' €')} (${normalPrice} €)
    ${chalk.grey('Dealrate:')}   ${colorPriceRate(dealRating, savings)}
    ${chalk.grey('Rating:')}     ${colorRating(steamRatingText)} (${steamRatingCount} Ratings | ${steamRatingPercent}%) 
    ${chalk.grey('Offered:')}    ${moment.unix(lastChange).format('ddd, D. MMMM')}
    ${chalk.grey('MetaCritic:')} ${colorCritic(metacriticScore)} http://metacritic.com${metacriticLink}
    http://www.cheapshark.com/redirect?dealID=${dealID}`
  })
}

module.exports = format
