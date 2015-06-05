/**
 * Created by andy on 15-5-12.
 */
var request = require('request');
//net get
exports.get = function get(url, callback) {
    request.get(url, function (err, res, body) {
        if (!err && res.statusCode == 200) {
            callback(body);
        }
    });
};
