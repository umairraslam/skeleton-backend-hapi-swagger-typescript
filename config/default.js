module.exports = {
    server: {
        port: 8000,
        routePrefix: "",
        plugins: ["swagger"]
    },
    database: {
        connectionString: "mongodb://localhost:27017/skeleton-webapp-db"
    }
}