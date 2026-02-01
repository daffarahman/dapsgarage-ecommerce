import jwt from "jsonwebtoken";

export function authenticateToken(req, res, next) {
    console.log(req.headers)
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(" ")[1];
    if (!token) return res.status(401).json({ error: "You are not authenticated!" });
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.status(403).json({ error: "Token is not valid!" });
        req.user = user;
        next();
    });
}