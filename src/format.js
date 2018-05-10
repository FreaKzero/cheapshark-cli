const chalk = require('chalk')
const getSort = require('./getSort')

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

  const colorPriceRate = (rate) => {
    if (parseFloat(rate) > 9) return chalk.bold.green(`${rate}`)
    if (parseFloat(rate) > 7.5) return chalk.bold.yellow(`${rate}`)
    return chalk.bold.grey(`${rate}`)
  }
  return data.sort(getSort(cli.flags.sort, cli.flags.order)).map(data => {
    const {
      dealID,
      dealRating,
      title,
      salePrice,
      normalPrice,
      metacriticLink,
      metacriticScore,
      steamRatingText,
      steamRatingCount,
      steamRatingPercent
    } = data

    return `
  ${chalk.bold.cyan(title)} 
  ${chalk.grey('Price:')}      ${chalk.bold.cyan(salePrice + ' €')} (${normalPrice} €)
  ${chalk.grey('Dealrate:')}   ${colorPriceRate(dealRating)}
  ${chalk.grey('Rating:')}     ${colorRating(steamRatingText)} (${steamRatingCount} Ratings | ${steamRatingPercent}%) 
  ${chalk.grey('MetaCritic:')} ${colorCritic(metacriticScore)} http://metacritic.com${metacriticLink}
  http://www.cheapshark.com/redirect?dealID=${dealID}
  `
  })
}

module.exports = format
