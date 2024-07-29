const User = require('../database/model/user');
const Role = require('../database/model/role');

const checkPermission = (permission) => {
  return async (req, res, next) => {
    try {
      const user = await User.findById(req.user.id);
      if (!user) {
        return res.status(401).json({ message: 'User not found' });
      }

      const role = await Role.findOne({ roleName: user.roleName });
      if (!role) {
        return res.status(401).json({ message: 'Role not found' });
      }

      if (role.permissions.includes(permission)) {
        next();
      } else {
        res.status(403).json({ message: 'Access denied' });
      }
    } catch (err) {
      res.status(500).json({ message: 'Internal server error' });
    }
  };
};

module.exports = checkPermission;
