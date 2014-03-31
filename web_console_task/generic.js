Object.defineProperty(window, "console", {
    value: console,
    writable: false,
    configurable: false
});

var i = 0;
function showWarningAndThrow() {
    if (!i) {
        setTimeout(function () {
            console.log("%cCan't touch this", "color: black; background-color: yellow;");
        }, 1);
        i = 1;
    }
    throw "Console is disabled";
}

function help() {
    console.log("All disabled, except me");
}

var l, n = {
        set: function (o) {
            l = o;
        },
        get: function () {
            //showWarningAndThrow();
            //console.log(arguments.identity) 
            throw arguments.callee.name;
            //return l
        }
    };
Object.defineProperty(console, "_commandLineAPI", n);
Object.defineProperty(console, "__commandLineAPI", n);

