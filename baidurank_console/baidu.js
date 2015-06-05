/**
 * Created by andy on 15-5-27.
 */
var net = require('./common/net.js');
var cheerio = require('cheerio');
function get_data(keyword, domain, callback) {
    var url = "http://www.baidu.com/s?wd=" + keyword + "&rn=50";
    net.get(url, function (data) {
        var $ = cheerio.load(data);
        var results = $('.f13 .g');
        var rank = 0;
        var len = results.length;
        for (var i = 0; i < len; i++) {
            var result = $(results[i]).html();
            if (result && result.indexOf(domain) > 0) {
                rank = i + 1;
                break;
            }
        }
        var data = keyword + '\t' + rank;
        callback(data);
    });
}

function start() {
    var keywords = ['韩国旅游景点','大理旅游景点','云南旅游景点'];
    var len = keywords.length;
    for (var i = 0; i < len; i++) {
        var keyword = keywords[i];
        var domain = 'lvmama.com';
        get_data(keyword, domain, function (data) {
            console.log(data);
        });
    }
}
start();