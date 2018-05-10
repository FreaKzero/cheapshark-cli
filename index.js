#! /usr/bin/env node

const Table = require('cli-table')
const format = require('./src/format')
const cli = require('./src/cli')
const request = require('request')
const ora = require('ora')

const spinStores = ora('Fetching stores from cheapshark').start()

if (cli.flags.listStores) {
  request('http://www.cheapshark.com/api/1.0/stores', (error, response, stores) => {
    if (error) {
      spinStores.fail(error.message)
      process.exit()
    }

    spinStores.succeed()

    try {
      const data = JSON.parse(stores).filter(store => store.isActive === 1)
      const table = new Table({
        head: ['StoreID', 'Store Name']
      })

      data.map(store => {
        table.push(
          [store.storeID, store.storeName]
        )
      })

      console.log(table.toString())
      process.exit()
    } catch (e) {
      console.log(e)
      process.exit()
    }
  })
}

request('http://www.cheapshark.com/api/1.0/stores', (error, response, stores) => {
  if (error) {
    spinStores.fail(error.message)
    process.exit()
  }
  spinStores.succeed()
  const spinDeals = ora('Fetching deals from cheapshark').start()

  request('http://www.cheapshark.com/api/1.0/deals', (error, response, deals) => {
    if (error) {
      spinDeals.fail(error.message)
      process.exit()
    }
    spinDeals.succeed()

    try {
      const dealsJson = JSON.parse(deals)
      const storesJson = JSON.parse(stores)

      const data = dealsJson.map(item => ({
        ...item,
        store: storesJson.find(store => store.storeID === item.storeID).storeName
      }))

      const list = cli.flags.num
        ? format(data, cli).slice(0, cli.flags.num)
        : format(data, cli)

      if (!list.length) {
        ora('Sorry no deals found :(').fail()
        process.exit()
      }

      if (cli.flags.page) {
        const paging = require('./src/paging')
        paging(list)
      } else {
        console.log(list.join('\n'))
      }
    } catch (e) {
      console.log(e)
    }
  })
})
