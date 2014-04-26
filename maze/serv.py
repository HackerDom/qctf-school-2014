#!/usr/bin/python3
# -*- coding: utf-8 -*-
from flask import Flask
from hashlib import md5
from flask import request


app = Flask(__name__)

@app.route("/<datastr>")
def hello(datastr):
    arr = [chr(x+1) for x in list(datastr.encode('utf-8'))]
    gethash = md5()
    gethash.update("".join(arr).replace(":", "9").encode('utf-8'))
    hash = gethash.hexdigest()

    if "Python" in request.headers.get('User-Agent'):
        return ""

    if not datastr == "57f0eb9a206a640c97ce739791c75ff3":
        return "<a href=" + "".join(hash) + " class=\"design\">Ссылка</a>"
    else:
        return "Your flag is: QCTF_2vlSKFfdYdXWojf"

if __name__ == "__main__":
    app.run()
