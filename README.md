# Authentication an authorization system using jwt
Using Express JS and Postgresql
#### 1. Install Pre-requisites
1. Node.js https://nodejs.org/en/
2. Npm https://www.npmjs.com/get-npm
3. Postgresql https://www.postgresql.org/download/
#### 2. Start API
1. `git clone https://github.com/cbrzn/auth-api`
2. `cd auth-api`
3. `npm install` if you get a missing package error just install or update that particular package
4. Setup local DB `npm run init` it will creata database and tables you need to use the api
5. Start api running `npm run dev`

#### Endpoints it has
- POST sign up -> `/v1/users/signup` params to send: email, password & role. return: status 200, user & jwt
- POST log in -> `/v1/users/login` params to send: email & password. return: status 200, user & jwt
- POST log out -> `/v1/users/logout` params to send: JWT. return: status 200
- GET accessApp -> `/v1/` if the user is logged in (has a valid JWT sent via header as bearer token) will return the email & role of user, otherwise status 401