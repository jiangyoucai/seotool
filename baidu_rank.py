#coding:utf-8
import sys
import requests
from pyquery import PyQuery

reload(sys)
sys.setdefaultencoding('utf-8')

def get_rank(keyword,domain):
    url='http://www.baidu.com/s?wd=%s'%keyword
    doc=PyQuery(requests.get(url).text)
    rank=0
    for i,d in enumerate(doc('.c-container')):
        d=PyQuery(d)
        result='%s%s'%(d('.f13 .g'),d('.c-showurl'))
        host=PyQuery(result)('span').text()
        if domain in str(host):
            rank=i+1
    return rank

def main():
    keywords=['上海旅游']
    domain='mafengwo.cn'
    for keyword in keywords:
        rank=get_rank(keyword,domain)
        print keyword,rank
    
if __name__ == '__main__':
    main()