module.exports = {
    server: {
        port: 8000,
        routePrefix: "",
        plugins: ["swagger"]
    },
    database: {
        database: "postgres",
        username: "postgres",
        password: "root",
        params: {
            host: "localhost",
            dialect: "postgres",
            operatorsAliases: false
        }
    }
}