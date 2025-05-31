import express from "express"
import { createTransaction, deleteTransaction, getSummaryByID, getTransactionsByID } from "../controller/transactionsContoller.js"

const router = express.Router()

// GET
// Get a transaction by ID 
router.get("/:userID", getTransactionsByID)

// Get Summary 
router.get("/summary/:userID", getSummaryByID)

// POST
// Create a transaction 
router.post("/", createTransaction)

// DELETE
// Delete a transaction 
router.delete("/:id",deleteTransaction)


export default router