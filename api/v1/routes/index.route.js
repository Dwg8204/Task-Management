// const systemConfig = require('../../config/system')
// const middlewareAuth = require('../../middlewares/admin/auth.middleware');
const taskRoutes = require('./task.route');
const userRoutes = require('./user.route');
// const authController = require('../../controllers/admin/auth.controller');

module.exports = (app) => {
    const version = "/api/v1";
    app.use(version + "/tasks", taskRoutes);
    app.use(version + "/users", userRoutes);
}