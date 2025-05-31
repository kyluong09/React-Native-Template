import express from "express";
import "dotenv/config"
import {initDB, sql} from "./config/db.js"
import rateLimiter from "./middleware/rateLimiter.js";
import transcationRoutes from "./routers/transactionRoute.js";

const app = express()
const PORT = process.env.PORT || 5001
// Middleware: action between request and response
// Convert response and request to JSON
app.use(express.json())
// Rate Litmiting
app.use(rateLimiter)
app.use("/api/transactions", transcationRoutes)

initDB().then(() => {
    app.listen(PORT, () => {
        console.log("Server is up and running on PORT: ", PORT)
    })
})
