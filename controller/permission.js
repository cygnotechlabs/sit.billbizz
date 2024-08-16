const User = require('../database/model/user');
const Role = require('../database/model/role');

const checkPermission = (permission) => {
  return async (req, res, next) => {
    try {
      // Fetch user using userId from req.user
      const user = await User.findById(req.user.id);
      if (!user) {
        return res.status(401).json({ message: 'User not found' });
      }

      // Fetch the role associated with the user
      const role = await Role.findOne({ roleName: user.roleName });
      if (!role) {
        return res.status(401).json({ message: 'Role not found' });
      }

      // Check if the user's role has the required permission
      if (role.permissions && role.permissions.includes(permission)) {
        return next();  // Permission granted, move to next middleware or route handler
      } else {
        return res.status(403).json({ message: 'Access denied: Insufficient permissions' });
      }
    } catch (err) {
      console.error('Error in checkPermission:', err);
      return res.status(500).json({ message: 'Internal server error' });
    }
  };
};

module.exports = checkPermission;
