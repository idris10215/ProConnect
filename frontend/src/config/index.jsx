const { default: axios } = require("axios");


const createServer = axios.create(
    {
        baseURL: "http://localhost:8000",
    }
)