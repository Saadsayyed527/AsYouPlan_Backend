// middleware/role.middleware.js
export const authorizeRole = (...allowedRoles) => {
  return (req, res, next) => {
    const user = req.user;

    if (!user || !allowedRoles.includes(user.role)) {
      return res.status(403).json({
        message: 'Access denied: Insufficient permissions'
      });
    }

    next();
  };
};