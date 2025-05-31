import rateLimit from "../config/upstash.js"


const rateLimiter = async (req,res,next) => {
    try {
        // Limit specific user only, not all users
        
        const {success} = await rateLimit.limit("my-rate-limit")

        if(!success){
            return res.status(429).json({
                "message" : "Too many requests, please try again later"
            })
        }
        next()
    } catch (error) {
        next(error)
    }
}

export default rateLimiter