import { sql } from "../config/db.js"

export async function getTransactionsByID(req,res) {
    try {
        const {userID} = req.params
        console.log(user_id)

        const transactions = await sql`
        SELECT * FROM transactions WHERE user_id = ${user_id}
        `

        res.status(201).json(transactions)
    } catch (error) {
        // Send response with status 500 with message
        res.status(500).json({"message" : "Internal server error" + error})
    }
}

export async function getSummaryByID(req,res){
    try {
        const {userID} = req.params

        const balanceResult = await sql`
        SELECT COALESCE(SUM(amount), 0) as balance FROM transaction WHERE user_id = ${userID}`

        const incomeResult = await sql`
        SELECT COALESCE(SUM(amount), 0) as income FROM transaction WHERE user_id = ${userID} AND amount > 0`

        const expensesResult = await sql`
        SELECT COALESCE(SUM(amount), 0) as expenses FROM transaction WHERE user_id = ${userID} AND amount < 0
        `

        res.status(200).json({
            "balance" : balanceResult[0].balance,
            "income" : incomeResult[0].income,
            "expensesResult" : expensesResult[0].expenses,

        })

    } catch (error) {
                // Send response with status 500 with message
        res.status(500).json({"message": "Internal server error" + error, })
    }
}

export async function createTransaction(req,res) {
    // Title, amount, category, user_id
    try {
        const {title, amount, user_id, category} = req.body
        // Validate body 
        if(!title || amount === undefined || !user_id || !category){
            // Send response back with error status 400 with message
            res.status(400).json({"message" : "All fields are required"})
        }
 
        // Insert fields to DB 
        const transaction = await sql`
        INSERT INTO transaction(user_id,title,amount,category)
        VALUES (${user_id},${title},${amount},${category})
        RETURNING *
        `

        res.status(201).json(transaction[0])
    } catch (error) {
        // Send response with status 500 with message
        res.status(500).json({"message": "Internal server error" + error, })
    }
}

export async function deleteTransaction(req,res) {
    try {
        const {id} = req.params

        // Check if id is not a number
        if(isNaN(parseInt(id))){
            return res.status(400).json({"message": "Input is not valid"})
        }

        // Run query
        const result = await sql`
        DELETE FROM transaction WHERE user_id = ${userID}
        RETURNING *
        `

        // Check number of row was deleted
        if(result.length === 0){
            return res.status(404).json({"message": "Transction not found"})
        }

        res.status(200).json({"message" : "Deleted transaction sucessfully"})
    } catch (error) {
        // Send response with status 500 with message
        res.status(500).json({"message": "Internal server error" + error, })
    }
}