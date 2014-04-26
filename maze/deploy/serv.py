#!/usr/bin/python3
# -*- coding: utf-8 -*-
from flask import Flask, redirect
from hashlib import md5
from flask import request


app = Flask(__name__)


@app.route("/")
def to_start():
    return redirect("/start")


@app.route("/<datastr>")
def getdata(datastr):
    arr = [chr(x+1) for x in list(datastr.encode('utf-8'))]
    gethash = md5()
    gethash.update("".join(arr).replace(":", "9").encode('utf-8'))
    hash = gethash.hexdigest()

    if "Python" in request.headers.get('User-Agent'):
        return "This is not for your Python ;)"

    if not datastr == "b1aafd69b16f47e87eb700d9cc177c0f":
        return "<a href=" + "".join(hash) + " class=\"design\">Нажми сюда</a>"
    else:
        return "Your flag is: QCTF_2vlSKFfdYdXWojf"

if __name__ == "__main__":
    app.run()
