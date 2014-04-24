function help() {
    console.log("There are few functions which allowed to you. But which is right?");
}

function give_me_flag(inp) {
    var _a = [inp.charCodeAt(0) - " ".charCodeAt(0)];
    _a[_a.length] = (inp.charCodeAt(1) - inp.charCodeAt(3)) * 6;
    _a[_a.length] = inp.charCodeAt(2) - 022;
    _a[_a.length] = (inp.charCodeAt(4) - inp.charCodeAt(5)) * 5 - 1;
    _a[_a.length] = _a[_a.length - 1] + 031;


    var crypt2 = function(n,s) {
            var t4 = ( n<<s ) | (n>>>(32-s));
            return t4;
        };

    var _b = _a.concat(_a);
    for (i=0; i<_b.length; i++)
        _b[i] = _b[i] ^ 03;

    var crypt3 = function(val) {
            var str="";
            var i;
            var vh;
            var vl;

            for( i=0; i<=6; i+=2 ) {
                vh = (val>>>(i*4+4))&0x0f;
                vl = (val>>>(i*4))&0x0f;
                str += vh.toString(16) + vl.toString(16);
            }
            return str;
        };

    _b = _a.concat(_b, _a);
    for (i=0; i<_b.length; i++)
        _b[i] = _b[i] ^ 01;

    var crypt4 = function(val) {
            var str="";
            var i;
            var v;

            for( i=7; i>=0; i-- ) {
                v = (val>>>(i*4))&0x0f;
                str += v.toString(16);
            }
            return str;
        };

    _b = _a.concat(_b, _a);
    for (i=0; i<_b.length; i++)
        _b[i] = _b[i] ^ 03;

    var blockstart;
    var i, j;
    var W = new Array(80);
    function crypt5 ( _str_data ) {
        var str_data = _str_data.map(String.fromCharCode).join("");
        str_data = str_data.replace(/\r\n/g,"\n");
        var crypt6 = "";

        for (var n = 0; n < str_data.length; n++) {
            var c = str_data.charCodeAt(n);
            if (c < 128) {
                crypt6 += String.fromCharCode(c);
            } else if((c > 127) && (c < 2048)) {
                crypt6 += String.fromCharCode((c >> 6) | 192);
                crypt6 += String.fromCharCode((c & 63) | 128);
            } else {
                crypt6 += String.fromCharCode((c >> 12) | 224);
                crypt6 += String.fromCharCode(((c >> 6) & 63) | 128);
                crypt6 += String.fromCharCode((c & 63) | 128);
            }
        }

        return crypt6;
    }

    _b = _a.concat(_b, _a);
    for (i=0; i<_b.length; i++)
        _b[i] = _b[i] ^ 03;
    var H0 = 0x67452301;
    var H1 = 0xEFCDAB89;
    var H2 = 0x98BADCFE;
    var H3 = 0x10325476;
    var H4 = 0xC3D2E1F0;
    var str = _a.concat(_b, _a);
    for (i=0; i<_b.length; i++)
        str[i] = str[i] ^ 07;
    var A, B, C, D, E;
    var temp;

    str = crypt5(str);
    var str_len = str.length;

    var word_array = new Array();
    for( i=0; i<str_len-3; i+=4 ) {
        j = str.charCodeAt(i)<<24 | str.charCodeAt(i+1)<<16 |
        str.charCodeAt(i+2)<<8 | str.charCodeAt(i+3);
        word_array.push( j );
    }

    switch( str_len % 4 ) {
        case 0:
            i = 0x080000000;
        break;
        case 1:
            i = str.charCodeAt(str_len-1)<<24 | 0x0800000;
        break;
        case 2:
            i = str.charCodeAt(str_len-2)<<24 | str.charCodeAt(str_len-1)<<16 | 0x08000;
        break;
        case 3:
            i = str.charCodeAt(str_len-3)<<24 | str.charCodeAt(str_len-2)<<16 | str.charCodeAt(str_len-1)<<8    | 0x80;
        break;
    }

    word_array.push( i );

    while( (word_array.length % 16) != 14 ) word_array.push( 0 );

    word_array.push( str_len>>>29 );
    word_array.push( (str_len<<3)&0x0ffffffff );

    function crypt1(i) {
        return i + 01;
    }


    for ( blockstart=0; blockstart<word_array.length; blockstart+=16 ) {
        for( i=0; i<16; i++ ) W[i] = word_array[blockstart+i];
        for( i=16; i<=79; i++ ) W[i] = crypt2(W[i-3] ^ W[i-8] ^ W[i-14] ^ W[i-16], 1);

        A = H0;
        B = H1;
        C = H2;
        D = H3;
        E = H4;

        for( i= 0; i<=19; i++ ) {
            temp = (crypt2(A,5) + ((B&C) | (~B&D)) + E + W[i] + 0x5A827999) & 0x0ffffffff;
            E = D;
            D = C;
            C = crypt2(B,30);
            B = A;
            A = temp;
        }

        for( i=20; i<=39; i++ ) {
            temp = (crypt2(A,5) + (B ^ C ^ D) + E + W[i] + 0x6ED9EBA1) & 0x0ffffffff;
            E = D;
            D = C;
            C = crypt2(B,30);
            B = A;
            A = temp;
        }

        for( i=40; i<=59; i++ ) {
            temp = (crypt2(A,5) + ((B&C) | (B&D) | (C&D)) + E + W[i] + 0x8F1BBCDC) & 0x0ffffffff;
            E = D;
            D = C;
            C = crypt2(B,30);
            B = A;
            A = temp;
        }

        for( i=60; i<=79; i++ ) {
            temp = (crypt2(A,5) + (B ^ C ^ D) + E + W[i] + 0xCA62C1D6) & 0x0ffffffff;
            E = D;
            D = C;
            C = crypt2(B,30);
            B = A;
            A = temp;
        }

        H0 = (H0 + A) & 0x0ffffffff;
        H1 = (H1 + B) & 0x0ffffffff;
        H2 = (H2 + C) & 0x0ffffffff;
        H3 = (H3 + D) & 0x0ffffffff;
        H4 = (H4 + E) & 0x0ffffffff;
    }

    var temp = crypt4(H0) + crypt4(H1) + crypt4(H2) + crypt4(H3) + crypt4(H4);
    alert(_a.map(crypt1).map(String.fromCharCode).join("").concat(temp.toLowerCase()));

}

funcs = ["help", "alert", "give_me_flag"];
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
                            func = e.slice(e.indexOf(funcs[key]), -2);
                            if (func.indexOf(';') !== -1) {
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
