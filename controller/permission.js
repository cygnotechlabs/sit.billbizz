const User = require('../database/model/user');
const Role = require('../database/model/role');
const ActivityLog = require('../database/model/activityLog');

const checkPermission = (permissionAction) => {
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

      // Find the permission in the role's permissions array
      const permission = role.permissions.find(p => p.action === permissionAction);

      // If the permission exists, log the activity and grant access
      if (permission) {
        const activity = new ActivityLog({
          username: user.username, // Assuming your User model has a username field
          activity: permission.note, // Log the note associated with the permission
          timestamp: new Date(),
        });
        await activity.save();

        return next();  // Permission granted, move to next middleware or route handler
      } else {
        // Permission not found, deny access
        return res.status(403).json({ message: 'Access denied: Insufficient permissions' });
      }
    } catch (err) {
      console.error('Error in checkPermission:', err);
      return res.status(500).json({ message: 'Internal server error' });
    }
  };
};

module.exports = checkPermission;
