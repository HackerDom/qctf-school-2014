#!/usr/bin/python3
from urllib import request
from re import findall


data = "start"
while True:
    handle = request.Request("http://127.0.0.1:5000/" + data, headers = {"user-agent" : "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/34.0.1847.116 Safari/537.36"})
    handle = request.urlopen(handle)
    rowdata = handle.read().decode('utf-8', errors='ignore')
    link = findall("href=(.*?) c", rowdata)
    if len(link) > 0:
        data = link[0]
    else:
        print(rowdata)
        break
