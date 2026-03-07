const jwt = require("jsonwebtoken");
const User = require("../models/mysql/User")
async function auth(req, res, next) {
  const token = req.cookies.token; // <-- read from cookie
  if (!token) return res.status(401).json({ message: "No token" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findByPk(decoded.id);
    if(!user){
      return res.status(404).json({message: "user not found"})
    }
    req.user = decoded; // contains { id, name, role }

    next();
  } catch (err) {
    return res.status(403).json({ message: "Invalid token" });
  }
}


module.exports = auth;
