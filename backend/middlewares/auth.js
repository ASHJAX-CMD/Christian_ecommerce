const jwt = require("jsonwebtoken");

async function auth(req, res, next) {
  const token =
    req.cookies.token ||
    req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "No token" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // ✅ Attach user directly from token
    req.user = {
      id: decoded.id,
      name: decoded.name,
      role: decoded.role,
    };

    next();
  } catch (err) {
    return res.status(403).json({ message: "Invalid token" });
  }
}

module.exports = auth;