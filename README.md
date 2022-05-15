## 💰 [外幣匯率查詢 (2021/12)](https://currency-exchanger-nestjs.bibiota.com/)

### About this side-project:

- 每小時取得台灣銀行的外幣資料，可以換算新台幣轉外幣的金額

### Tech:

Frontend: Vue.js(Vue 3)、Tailwind

Backend: NestJs(TypeScript)

Database: MongoDB

API: GraphQL

Environment: AWS(EC2)

### More info:

- 外幣資料來源:
  - [台灣銀行](https://rate.bot.com.tw/xrt?Lang=zh-TW)

- 外幣ISO4217代碼資料來源:
  - [cynthiachuang](https://cynthiachuang.github.io/ISO-4217-Currency-Codes/W)

### Installation

```bash
$ npm install
```

### Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

### Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

### License

[MIT licensed](LICENSE).

## About this side-project's command

# seed currencies
- npx nestjs-command create:currencies 'TWD' 'New Taiwan dollar' '新台幣元'

# seed currencies from csv
- npx nestjs-command create:codes
# seed rates
- npx nestjs-command create:rates 'code' 'name' --rate int --currency_uuid string
# seed taiwan bank TWD exchange rates
- npx nestjs-command create:twbankRates trancate
- npx nestjs-command create:twbankRates update

# currency toPrecision default value (3)
