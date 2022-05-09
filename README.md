This API serves JSON data for a front-end mobile application, consisting of parks, maps and user information. It then uses these to create multiple endpoints each with a specific uses, detailed in GET/api.

https://be-treasure-hunt.herokuapp.com/api

# ----Cloning the repo----

Please start by cloning this repo.

- Fork repo, and copy code URL.
- In VS code run command 'git clone url'

# ----Set up infomation----

- Run `npm install`. This will download dependencies from package.JSON.
- Run `npm run setup-dbs`. This will initialise the database ready to be populated
- Run `npm run seed`. This will seed the newly set up database with values and data.
- Run `npm run test`. This is will enable testing suite to run.

# ----Dependencies used----

These will be installed from package.JSON, but are here in list form for reference:

- postgres 🐘
- husky 🌭
- express 📮
- jest 🃏
- jest-extended 🤡
- pg-format 🤖
- supertest 🦸‍♀️
- dotenv 🌳

# ----Minimum Versions ----

Please run with a minimum of the following version types:

- npm: '8.3.1',
- node: '16.14.0',
- v8: '9.4.146.24-node.20',
- pg: '^8.7.3'

# ----ENV----

Please create enviroment variables to be able to clone and locally run this file succesfully. Please create the following files and double check they are succesfully in git ignore:

- `.env.test` - In the body of this file please add PGDATABASE=be_treasure_hunt_test
- `.env.development` - In the body of this file please add PGDATABASE=be_treasure_hunt
