const options = {
    client: "sqlite3",
    connection: {
        filename: "./DB/db.sqlite",
    },
    useNullAsDefault: true,
};

module.exports = {
    options,
};