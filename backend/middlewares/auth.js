const jwt = require("jsonwebtoken");

function auth(req, res, next) {
  const token = req.cookies.token; // <-- read from cookie
  if (!token) return res.status(401).json({ message: "No token" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // contains { id, name, role }
    next();
  } catch (err) {
    return res.status(403).json({ message: "Invalid token" });
  }
}


module.exports = auth;
