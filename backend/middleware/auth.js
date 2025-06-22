// Middleware to check if user is logged in
export function requireLogin(req, res, next) {
  if (req.session && req.session.user) {
    return next();
  }
  res.status(401).json({ error: "Not authenticated" });
}
