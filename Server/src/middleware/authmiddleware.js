const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = (req, res, next) => {
    try {
        console.log("Entered try block");
        
        const authHeader = req.header('Authorization');
        const token = authHeader?.split(" ")[1];
        
        if (!token) {
            return res.status(401).json({ message: "Token not Found" });
        }

        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        console.log('Decoded user:', req.user);

        next();
    } catch (error) {
        console.error("JWT Verification Error:", error.message);
        res.status(401).json({ message: "Invalid Token" });
    }
};