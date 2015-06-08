/**
 * Created by andy on 15-6-4.
 */
//引入依赖库
var $ = require('jquery');
var net = require('./net.js');
var cheerio = require('cheerio');
var urlencode = require('urlencode');
//点击开始按钮
$('.start').on('click', function () {
    var domain = $('.domain').val();
    var keywords = $('.keywords').val();
    if (domain.length > 0 && keywords.length > 0) {
        format_data(domain, keywords);
    } else {
        alert('输入空值，请您重试！')
    }
});
//点击重置按钮
$('.reset').on('click', function () {
    $('.domain').val('');
    $('.keywords').val('');
});
//切换关键词和排名
$('.bar span').on('click', function () {
    change_view($(this).index());
});
//切换试图
function change_view(number) {
    var temp = $('.bar span:eq(' + number + ')');
    if (!temp.attr('class')) {
        temp.addClass('current').siblings().removeClass('current');
        if (number == 0) {
            $('.keywords').show();
            $('.results').hide();
        } else {
            $('.keywords').hide();
            $('.results').show();
        }
    }
}
//检测域名
function check_domain(str) {
    var RegUrl = new RegExp();
    RegUrl.compile("^[A-Za-z0-9-_]+\\.[A-Za-z0-9-_%&\?\/.=]+$");
    if (!RegUrl.test(str)) {
        return false;
    }
    return true;
}
//数组去重
function list_duplication(data) {
    data.sort();
    var result = [data[0]];
    for (var i = 1; i < data.length; i++) {
        if (data[i] !== result[result.length - 1]) {
            result.push(data[i]);
        }
    }
    return result;
}
//格式化数据（用户输入）
function format_data(domain, keywords) {
    if (check_domain(domain)) {
        var keywords = list_duplication(keywords.split('\n'));
        var len = keywords.length;
        set_data(domain, keywords, len);
    } else {
        alert('域名有误，请您重试！');
    }
}
//设置数据（查询输出）
function set_data(domain, keywords, len) {
    change_view(1);
    $('.results').empty();
    for (var i = 0; i < len; i++) {
        var keyword = keywords[i];
        if (keyword) {
            get_data(keyword, domain, function (data) {
                $('.results').append(data);
            });
        }
    }
}
//查询数据
function get_data(keyword, domain, callback) {
    var url = "http://www.baidu.com/s?wd=" + urlencode(keyword) + "&rn=50";
    net.get(url, function (data) {
        var $ = cheerio.load(data);
        var results = $('.f13 .g');
        var rank = 0;
        var len = results.length;
        for (var i = 0; i < len; i++) {
            var result = $(results[i]).html();
            if (result && result.indexOf(domain) >= 0) {
                rank = i + 1;
                break;
            }
        }
        var data = keyword + '\t' + rank + '\n';
        callback(data);
    });
}
