import {neon} from "@neondatabase/serverless"
import "dotenv/config"

// Create a SQL connection 
export const sql = neon(process.env.DATABASE)

export async function initDB() {
    try {

        // Create a new transaction DB

        await sql`CREATE TABLE IF NOT EXISTS transaction(
        id SERIAL PRIMARY KEY,
        user_id VARCHAR(255) NOT NULL,
        title VARCHAR(255) NOT NULL,
        amount DECIMAL(10,2) NOT NULL,
        category VARCHAR(255) NOT NULL,
        created_at DATE NOT NULL DEFAULT CURRENT_DATE
        )`

        console.log("Database initilize successfully")
    } catch (error) {
        console.log("Error initilizgin DB", error)
        // Status 1 means failure and 0 means success
        process.exit(1)
    }
}