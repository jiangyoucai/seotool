# coding:utf-8
import sys
import requests
from pyquery import PyQuery

reload(sys)
sys.setdefaultencoding('utf-8')


def get_rank(keyword, domains):
    # 拼接url
    url = 'http://www.baidu.com/s?wd=%s&rn=50' % keyword
    # 格式化
    doc = PyQuery(requests.get(url).text)
    # 存储排名结果，key：网址，value：排名
    result = {}
    # 循环父标签
    for i, d in enumerate(doc('.c-container')):
        # 格式化子标签
        d = PyQuery(d)
        # 获取网址字符串，非百度网址：.f13 .g，百度网址：.c-showurl
        host = '%s%s' % (d('.f13 .g'), d('.c-showurl'))
        # 如果不为空，获取网址内容，切割为域名形式，空值结果为百度新闻，跳过
        if host != '':
            host = PyQuery(host)('span').text().split('/')[0].split(' ')[0].split('...')[0]
            # 存储key，value
            result[host] = i + 1
    # 存储排名返回值
    rank = ''
    # 循环域名
    for domain in domains:
        # 字典key值查询，如果有排名，则结果为value值，没有，则结果为0
        if result.has_key(domain):
            rank += ' %s' % result[domain]
        else:
            rank += ' 0'
    return rank


def main():
    # 关键词
    keywords = ['千岛湖', '东方明珠']
    # 域名
    domains = ['ticket.lvmama.com', 'menpiao.tuniu.com', 'piao.ctrip.com', 'www.ly.com']
    # 循环
    for keyword in keywords:
        # 查排名
        rank = get_rank(keyword, domains)
        print keyword, rank


if __name__ == '__main__':
    main()
