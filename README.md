# Authentication an authorization system using jwt
Using Express JS and Postgresql
#### 1. Install Pre-requisites
1. Node.js https://nodejs.org/en/
2. Npm https://www.npmjs.com/get-npm
3. Postgresql https://www.postgresql.org/download/
#### 2. Start API
1. `git clone https://github.com/cbrzn/auth-api.git`
2. `cd auth-api`
3. `npm install` if you get a missing package error just install or update that particular package
4. Setup local DB `npm run init` it will create database and tables you need to use the api
5. Start api running `npm run dev`
6. For testing endpoints `npm test`

#### Endpoints it has
- POST sign up -> `/v1/users/signup/request` params to send: email, password return: status 200 & jwt
- PUT assign role -> `v1/users/signup/complete` params to send: JWT as bearer token & user wants to be. return: status 200 & new jwt with role
- POST log in -> `/v1/users/login` params to send: email & password. return: status 200 & jwt.
- POST log out -> `/v1/users/logout` params to send: JWT. return: status 200
- GET accessApp -> `/v1/` if the user is logged in (has a valid JWT sent as bearer token) and has already selected a role will return the email & role of user, if the user has not selected a role yet, it will send a message that it need to select one to go further.