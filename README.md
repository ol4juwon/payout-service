# ***PYOUT SERVICE API V1***

## Language and frameworks

- Nodejs (18.x)
- Postgresql
- Expressjs
- Sequelize
-

## Endpoints

- Auth [/auth]
  1. Login [/][post]

- Users [/Users]
  1. Create users [/][post]
  2. Get All User [/][get] {page, limit, orderBy, sort, all}
  3. Get User details [/:id/][get]
  4. Blacklist User [/:id/blacklist][put]
  5. Toggle active [/:id/status/:toggle][put]

- Providers [/providers]
  1. Create Provider [/][post]
  2. Get All Providers [/][get]
  3. Get Provider Details[/:id][get]
  4. Toggle Status [/:id/toggleStatus][patch]
  5. setDefault [/:id/setDefault][patch]

- Bankcodes [/bankcodes]
  1. Get all Bankcodes [/][get]
- Wallets [/wallets]
  1. Create Wallet[/][post]
  2. Get all wallets[/][get]
  3. Get wallet details [/:id][get]
  4. Fund/credit wallet [/:id/fund][post]
- Transactions [/transactions]
  1. Get all transactions [/][get]
  2. Get user transactions [/:userId/user][get]
  3. Initiate Payouts [/initiatePayouts][post]
  4. Get Collection Balance [/getBalance][get]
  5. Name Enquiry [/nameEnquiry][post]

- Beneficiary [/beneficiaries]
  1. Add Beneficiary [/][post]
  2. Get All Beneficiary [/][get]

## TASKS

- [x] Auth
- [x] Users
- [x] Transactions
- [x] Bankcodes
- [x] Beneficiaries
- [x] Wallet
- [x] Payout
- [x] Setup Postgres
- [x] Setup Server
- [x] Deploy to a server
- [x] Unit tests
- [x] Coverage
- [ ] Optimize payouts using interface for providers
  
## Links

- [Home](https://vend-payout.onrender.com)
- [Api v1 Base URl](https://vend-payout.onrender.com/api/v1)
- [Frontend app](https://payout-service-fe.vercel.app/)
- [Postman Doc](https://api.postman.com/collections/14081034-0774abd2-41fc-4664-9675-2af7444c6472?access_key=) please request for a key
  
## Installation instructions

- Download the code from github (Main branch)
- create .env file with fields provided in .env section
- npm i to install dependencies
- npm run db:create to create db
- npm run db:migrate:dev to migrate tables for dev
- npm run db:seed:dev to seed the db for production
- npm run dev to start development server
- npm start for production
- n/b replace dev in the above migration commands with prod for the production variant
  
## Running Tests instructions

- if First time running test please run npm run db:create:test
- before running each test always run npm run db:reset:test
- run npm run pretest
- then finally npm run test
  
## Requests Authorization & Authentication

All Requests are validated by adding a header of x-access-token.
Unauthenticated routes do not need a any further auth mechanism
Auth routes are authenticated by the use of jwt bearer token specified in the header.

## Environment Variables

- NODE_ENV
- APP_NAME
- PORT
- POSTGRES_DBNAME
- POSTGRES_USER
- POSTGRES_PASSWORD
- POSTGRES_PORT
- POSTGRES_HOST
- JWT_SECRET
- TOKEN_MINUTES
- REFRESH_MINUTES
- ACCESSKEY
- SENDGRID_APIKEY
- SQUAD_APIKEY
- SQUAD_BASEURL
- SQUAD_MERCHANT_ID
- SPAY_KEY
- SPAY_IV
- SPAY_APP_ID
- SPAY_BASEURL

***HAPPY CODING***
:grin:
:rocket: :rocket: :rocket: :rocket: :rocket: :rocket:
