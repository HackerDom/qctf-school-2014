function help() {
    console.log("There are few functions whitch allowed to you. Gotta Catch 'Em All!");
}

function pokemon() {
    console.info("It is right, dude!");
    //window.location.replace("http://google.ru");
}

funcs = ["help", "alert", "pokemon"];
if (window.webkitURL) {
    var ish, _call = Function.prototype.call;
    Function.prototype.call = function () {
        if (arguments.length > 0 && this.name === "evaluate" && arguments[0].constructor.name === "InjectedScriptHost") {
            ish = arguments[0];
            ish.evaluate = function (e) {
                var exists = false;
                var func = "";
                for (key in funcs){
                    if (String(parseInt(key, 10)) === key && funcs.hasOwnProperty(key)) {
                        if (e.indexOf(funcs[key]) !== -1) {
                            exists = true;
                            func = e.slice(e.indexOf(funcs[key]), -2)
                            f (func.indexOf(';') !== -1) {
                                func = func.slice(0, func.indexOf(';') + 1);
                            }
                            break;
                        }
                    }
                }
                if (!exists) {throw new Error ('Permission denied!');}

                eval(func);
            };
            Function.prototype.call = _call;
            return _call.apply(this, arguments);
        }
    }
}
