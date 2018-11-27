const pgtools = require("pgtools");
const prompt = require("prompt");
const fs = require("fs");
const path = require("path");
prompt.start();

const prompMenu = (resolve, reject) => {
    prompt.get(
        [
            {
                name: "DB_USER",
                description: "PostgreSQL User (Default is postgres)",
                default: "postgres"
            },
            {
                name: "DB_PASSWORD",
                description: "PostgreSQL Password (hidden)",
                hidden: true
            },
            {
                name: "DB_PORT",
                description: "PSQL Server port (Default is 5432)",
                default: "5432"
            },
            {
                name: "DB_HOST",
                description: "PSQL Server running host (Default is localhost)",
                default: "localhost"
            },
            {
                name: "DB_NAME",
                description: "Database name (Default is upstack)",
                default: "upstack"
            }
        ],
        function(err, result) {
            if (err) reject(err);
            resolve(result);
        }
    );
}

const createEnvFile = environmentVariables => {
    const newFilePromise = (resolve, reject) => {
        const outputDirectory = path.join(__dirname, "../..", ".env")
        environmentVariables.SECRET_KEY = "changeThis"
        const output = Object.keys(environmentVariables).reduce((output, variable) => `${output}${variable}=${environmentVariables[variable]}\n`, "");
        const resolvePromise = err => {
            if (err) reject(err);
            resolve(environmentVariables);
        }
        fs.writeFile(outputDirectory, output, "utf8", resolvePromise);
    }
    return new Promise(newFilePromise);
}

new Promise(prompMenu).then(createEnvFile).then(({ DB_USER, DB_HOST, DB_NAME, DB_PORT, DB_PASSWORD }) => {
    return pgtools.createdb(
        { user: DB_USER, password: DB_PASSWORD, port: DB_PORT, host: DB_HOST },
        DB_NAME
    );
}).then(() => {
        require("./tables")();
}).then(() => {
    console.log("Successful DB created");
});

