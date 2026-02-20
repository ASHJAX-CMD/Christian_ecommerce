const jwt = require("jsonwebtoken");

const role = (roles) => {
  return (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: "Access denied! No token" });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;

      if (!roles.includes(req.user.role)) {
        return res.status(403).json({ message: "Forbidden! You do not have permission" });
      }

      next();
    } catch (err) {
      console.error("JWT verification failed:", err);
      return res.status(403).json({ message: "Invalid or expired token" });
    }
  };
};

module.exports = role;
