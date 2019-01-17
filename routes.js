module.exports = function(app) {
    var controller = require('./controller');

    app.route('/stopwatch/tick/:time');
    app.route('/stopwatch/pause');
    app.route('/stopwatch/reset');
    app.route('/stopwatch/count/:direction');
    app.route('/stopwatch/set/:time');
    app.route('/stopwatch/time');

    app.route('/team-name/:team');
    app.route('/team-name/:team/:len');

    app.route('/images/logo').get(controller.get_logo);
    app.route('/images/:team');

    app.route('/grid');

    app.route('/bug').get(controller.get_bug).post(controller.set_bug);

    app.route('/lower-third').get(controller.get_lowerThird);
    app.route('/lower-third/show/:location').post(controller.show_lowerThird);
    app.route('/lower-third/hide/:location').post(controller.hide_lowerThird);

    app.route('/roses/total');
    app.route('/roses/lanc');
    app.route('/roses/york');
;
    app.route('/sport/:sport').get(controller.get_sport);
    /**
     * boxing
     * football
     * rugby
     * darts
     * swimming
     * basketball
     * archery
     * badminton
     * tennis
     * netball
     * waterpolo
     */
}