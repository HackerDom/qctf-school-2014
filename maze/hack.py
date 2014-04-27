#!/usr/bin/python3
from urllib import request
from re import findall
from time import time
from sys import stdout


data = "start"
counter = 0
started = time()
while True:
    stdout.write("Round " + str(counter) + "\r")
    counter += 1
    handle = request.Request("http://clicknwin.qctf.ru/" + data, headers = {"user-agent" : "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/34.0.1847.116 Safari/537.36"})
    handle = request.urlopen(handle)
    rowdata = handle.read().decode('utf-8', errors='ignore')
    link = findall("href=(.*?) c", rowdata)
    if len(link) > 0:
        data = link[0]
    else:
        print("\n" + str(time()-started))
        print(rowdata)
        break
