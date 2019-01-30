module.exports = function(app) {
    var controller = require('./controller');

    app.route('/gameshow').get(controller.get_gameshow).post(controller.set_gameshow);
    app.route('/buzz/:team').post(controller.team_buzzed);
    app.route('/name/:team/').post(controller.set_name);
}