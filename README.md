# DeGiro Trading Broker API

![stars](https://badgen.net/github/stars/icastillejogomez/degiro-api)
![stars](https://badgen.net/github/open-issues/icastillejogomez/degiro-api)
![stars](https://badgen.net/github/license/icastillejogomez/degiro-api)

![DeGiro Logo](https://raw.githubusercontent.com/icastillejogomez/degiro-api/master/.assets/degiro.png)

This is an unofficial Node.js API client for DeGiro's trading platform. Using this module you can easily automate your orders (buy and sell) and get information about orders, funds or products.

DeGiro is Europe's fastest growing online stockbroker. DeGiro distinguishes itself by offering institutional fees to retail investors.

⚠️  DeGiro could change their API at any moment, if something is not working, please open an issue.

## Install 

```sh
# using npm
npm install --save degiro-api

# using yarn
yarn add degiro-api
```

## How to use?

### Create an instance of DeGiro

Basic log into DeGiro Platform. All endpoint needs a session key before those can be call them. You can pass credentials to DeGiro constructor or export in your terminal prompt sesion as `DEGIRO_USER` and `DEGIRO_PWD`

```js
const DeGiro = require('degiro-api')

const degiro = new DeGiro({
  username: 'username',
  pwd: '*****'
})

degiro.login()
  .then(() => console.log('Log in success'))
  .catch(console.error)

// or creating with the static create method

const degiro = DeGiro.create({ username: '*****', pwd: '*****' })
await degiro.login()

// or create with env credentials

const degiro = new DeGiro() // <-- Use DEGIRO_USER & DEGIRO_PWD
await degiro.login()
```

### Active Debug mode

```js
$ export DEGIRO_DEBUG=1
$ yarn start
```

### Generating docs

Run the next command and open index.html file inside doc folder.

```sh
$ yarn doc
yarn run v1.22.4
$ typedoc --out docs src

Using TypeScript 3.9.2 from ....../degiro-api/node_modules/typescript/lib
Rendering [========================================] 100%

Documentation generated at ....../degiro-api/docs

✨  Done in 3.94s.
```

### Running tests set

Before run the test set you must set DEGIRO_USER & DEGIRO_PWD env export variables to attach an account to the test sets.

```js
$ yarn install && yarn test
yarn run v1.22.4
$ mocha -r ts-node/register tests/**/*.spec.ts


  Environment variables
    ✓ DEGIRO_USER env var should exists
    ✓ DEGIRO_PWD env var should exists

  Create DeGiro instance
    ✓ should create an instance of DeGiro class from env vars
    ✓ should create an instance of DeGiro class from constructor params

  DeGiro login process
    ✓ should successfully log in with environment credentials (641ms)
    ✓ should return a valid account config from server (635ms)
    ✓ should return a valid account data from server (700ms)

  DeGiro logout process
    ✓ should successfully log out after sign in (724ms)


  8 passing (3s)

✨  Done in 4.69s.
```

### Get account details

Get account info using `await`:

```js
import DeGiro from 'degiro-api'

(async () => {
  const degiro = new DeGiro({
    username: 'username',
    pwd: '*****'
  })

  await degiro.login()

  const accountData = await degiro.getAccountData()
  // console.log(accountData)
})()
```

### Get portfolio

`getPortfolio(config: GetPorfolioConfigType): Promise<any[]>`

`getPortfolio` config parameter could have:
* **type**: set the types or positions you want to fetch. Could be:
  * ALL: Gets the response without filter it
  * ALL_POSITIONS: Gets only positions in products. Exclude positions like 'CASH', etc.
  * OPEN: Gets only opened positions. 
  * CLOSED: Gets only the closed positions in your portfolio.

* **getProductDetails**: if is set to true the positions results will have a `productData` field with all the product details.

Get all **open** positions:

```js
import DeGiro, { DeGiroEnums, DeGiroTypes } from 'degiro-api'
const { PORTFOLIO_POSITIONS_TYPE_ENUM } = DeGiroEnums

(async () => {

  const degiro: DeGiro = new DeGiro({
    username: 'your_username_here',
    pwd: '**********',
  })

  await degiro.login()

  const portfolio = await degiro.getPortfolio({ 
    type: PORTFOLIO_POSITIONS_TYPE_ENUM.ALL, 
    getProductDetails: true,
  })
  console.log(JSON.stringify(portfolio, null, 2))
})()
```

Also you can fetch your portfolio data this way:

```js
import DeGiro, { DeGiroEnums, DeGiroTypes } from 'degiro-api'
const { PORTFOLIO_POSITIONS_TYPE_ENUM } = DeGiroEnums

(async () => {

  const degiro: DeGiro = new DeGiro({
    username: 'your_username_here',
    pwd: '**********',
  })

  await degiro.login()

  const portfolio = await degiro.getPortfolio({ type: PORTFOLIO_POSITIONS_TYPE_ENUM.ALL })
  console.log(JSON.stringify(portfolio, null, 2))
})()
```

And getting product details too

```js
import DeGiro, { DeGiroEnums, DeGiroTypes } from 'degiro-api'
const { PORTFOLIO_POSITIONS_TYPE_ENUM } = DeGiroEnums

(async () => {

  const degiro: DeGiro = new DeGiro({
    username: 'your_username_here',
    pwd: '**********',
  })

  await degiro.login()

  const portfolio = await degiro.getPortfolio({ 
    type: PORTFOLIO_POSITIONS_TYPE_ENUM.ALL, 
    getProductDetails: true,
  })
  console.log(JSON.stringify(portfolio, null, 2))
})()
```

### Search product, stock and much more in broker

`degiro.searchProduct(options): Promise<SearchProductResultType[]>`

* **options**: 
  * **text**: *required* string,
  * **type**: *optional* DeGiroProducTypes
  * **limit**: *optional* number default=10,
  * **offset**: *optional* number default=0,

`DeGiroProducTypes`

* *shares*: 1
* *bonds*: 2
* *futures*: 7
* *options*: 8
* *investmendFunds*: 13
* *leveragedProducts*: 14
* *etfs*: 131
* *cfds*: 535
* *warrants*: 536

Search the text "AAPL" without any limitation

```js
import DeGiro from 'degiro-api'

(async () => {

  const degiro: DeGiro = new DeGiro({
    username: 'your_username_here',
    pwd: '***********',
  })

  await degiro.login()

  const result = await degiro.searchProduct({ text: 'AAPL' })
  console.log(JSON.stringify(result, null, 2))
})()
```

Search TSLA stock

```js
import DeGiro, { DeGiroEnums, DeGiroTypes } from 'degiro-api'
const { DeGiroProducTypes } = DeGiroEnums

(async () => {

  const degiro: DeGiro = new DeGiro({
    username: 'your_username_here',
    pwd: '***********',
  })

  await degiro.login()

  const result = await degiro.searchProduct({
    text: 'TSLA',
    type: DeGiroProducTypes.shares,
    limit: 1,
  })
  console.log(JSON.stringify(result, null, 2))
})()
```

## DeGiro Orders

### Create a new order

`degiro.createOrder(order: OrderType): Promise<CreateOrderResultType>`

* **OrderType**
  * **buySell**: DeGiroActions,
  * **orderType**: DeGiroMarketOrderTypes,
  * **price**: *optional* Number,
  * **productId**: string,
  * **size**: number,
  * **stopPrice**: *optional* number,
  * **timeType**: DeGiroTimeTypes,


* **DeGiroActions**
  * **BUY**: 'BUY',
  * **SELL**: 'SELL',


* **DeGiroMarketOrderTypes**
  * **LIMITED**: 0,
  * **MARKET**: 2,
  * **STOP_LOSS**: 3,
  * **STOP_LOSS_LIMIT**: 1,

* **DeGiroTimeTypes**
  * **DAY**: 1,
  * **PERMANENT**: 3,

* **CreateOrderResultType**
  * **confirmationId**: String,
  * **freeSpaceNew**: Number,
  * **transactionFees**: [TransactionFeeType],


* **TransactionFeeType**
  * **amount**: Number,
  * **currency**: String,
  * **id**: Number,


```js
import DeGiro, { DeGiroEnums, DeGiroTypes } from 'degiro-api'
const { DeGiroActions, DeGiroMarketOrderTypes, DeGiroTimeTypes } = DeGiroEnums
const { OrderType } = DeGiroTypes

(async () => {

  const degiro: DeGiro = new DeGiro({
    username: 'your_username_here',
    pwd: '************'
  })

  await degiro.login()

  const order: OrderType = {
    buySell: DeGiroActions.BUY,
    orderType: DeGiroMarketOrderTypes.LIMITED,
    productId: '331868', // $AAPL - Apple Inc
    size: 1,
    timeType: DeGiroTimeTypes.DAY,
    price: 272, // limit price [Degiro could reject this value]
    // stopPrice: 2,
  }

  const { confirmationId, freeSpaceNew, transactionFees } = await degiro.createOrder(order)
  console.log(JSON.stringify({ confirmationId, freeSpaceNew, transactionFees }, null, 2))
})()
```

###  Execute an order

```js
import DeGiro, { DeGiroEnums, DeGiroTypes } from 'degiro-api'
const { DeGiroActions, DeGiroMarketOrderTypes, DeGiroTimeTypes } = DeGiroEnums
const { OrderType } = DeGiroTypes

(async () => {

  try {
    const degiro: DeGiro = new DeGiro({
      username: 'nachoogoomezomg',
      pwd: <string>process.env.DEGIRO_PWD,
    })

    await degiro.login()

    const order: OrderType = {
      buySell: DeGiroActions.BUY,
      orderType: DeGiroMarketOrderTypes.LIMITED,
      productId: '331868', // $AAPL - Apple Inc
      size: 1,
      timeType: DeGiroTimeTypes.DAY,
      price: 270, // limit price
      // stopPrice: 2,
    }

    const { confirmationId, freeSpaceNew, transactionFees } = await degiro.createOrder(order)
    const orderId = await degiro.executeOrder(order, confirmationId)
    console.log(`Order executed with id: ${orderId}`)
  } catch (error) {
    console.error(error)
  }
})()
```

### Remove an order

```js
import DeGiro, { DeGiroEnums, DeGiroTypes } from 'degiro-api'
const { DeGiroActions, DeGiroMarketOrderTypes, DeGiroTimeTypes } = DeGiroEnums
const { OrderType } = DeGiroTypes

(async () => {

  const degiro: DeGiro = new DeGiro({
    username: 'nachoogoomezomg',
    pwd: <string>process.env.DEGIRO_PWD,
  })

  await degiro.login()

  const order: OrderType = {
    buySell: DeGiroActions.BUY,
    orderType: DeGiroMarketOrderTypes.LIMITED,
    productId: '331868', // $AAPL - Apple Inc
    size: 1,
    timeType: DeGiroTimeTypes.DAY,
    price: 272, // limit price
    // stopPrice: 2,
  }

  const { confirmationId, freeSpaceNew, transactionFees } = await degiro.createOrder(order)
  const orderId = await degiro.executeOrder(order, confirmationId)
  console.log(`Order executed with id: ${orderId}`)

  // Wait few seconds to avoid "Rate limit for the given request exceeded" error
  const TIMEOUT_SECONDS = 2 * 1000
  const deleteOrderFunction = async () => {
    try {
      await degiro.deleteOrder(orderId)
      console.log('Order removed')
    } catch (error) {
      console.error(error)
    }
  }
  setTimeout(deleteOrderFunction, TIMEOUT_SECONDS)
})()
```

## Degiro Command Line Interface (CLI)

[degiro-cli](https://github.com/icastillejogomez/degiro-cli) is an usefull command line interface that help us dealing with DeGiro platform through the terminal. You can see your portfolio status, create and execute orders and much more (may in the future)

```sh
$ degiro
Usage: DeGiro Command Line Interface [options] [command]

DeGiro CLI provide you access to DeGiro Broker across the terminal

Options:
  -V, --version   output the version number
  -h, --help      display help for command

Commands:
  login           validate credentials with DeGiro platform
  search          Search products in DeGiro
  portfolio       show account portfolio in real-time
  help [command]  display help for command
```
## License

MIT


## TO DO List

1. Two factor
2. Get prices

