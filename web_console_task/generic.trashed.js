
funcs = ["help"];
function help() {
    console.log("There are few functions which allowed to you. But which is right?");
}

function get_me_flag() {
    var _a = ["Q".charCodeAt(0)];
    _a[_a.length] = "C".charCodeAt(0);
    _a[_a.length] = "T".charCodeAt(0);
    _a[_a.length] = "F".charCodeAt(0);
    _a[_a.length] = "_".charCodeAt(0);

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
                vl = (val>>>(i*4))&0xff;
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
    var H1 = 0xEFCDBB99;
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
        return i + 02;
    }


    for ( blockstart=0; blockstart<word_array.length; blockstart+=16 ) {
        for( i=0; i<16; i++ ) W[i] = word_array[blockstart+i];
        for( i=16; i<=79; i++ ) W[i] = W[i-3] ^ W[i-8] ^ W[i-14] ^ W[i-16];

        A = H0;
        B = H1;
        C = H2;
        D = H3;
        E = H4;

        for( i= 0; i<=19; i++ ) {
            temp = (A + ((B&C) | (~B&D)) + E + W[i] + 0x5A827999) & 0x0ffffffff;
            E = D;
            D = C;
            C = B;
            B = A;
            A = temp;
        }

        for( i=20; i<=39; i++ ) {
            temp = (A + (B ^ C ^ D) + E + W[i] + 0x6ED9EBA1) & 0x0ffffffff;
            E = D;
            D = C;
            C = B;
            B = A;
            A = temp;
        }

        for( i=40; i<=59; i++ ) {
            temp = (A + ((B&C) | (B&D) | (C&D)) + E + W[i] + 0x8F1BBCDC) & 0x0ffffffff;
            E = D;
            D = C;
            C = B;
            B = A;
            A = temp;
        }

        for( i=60; i<=79; i++ ) {
            temp = (A + (B ^ C ^ D) + E + W[i] + 0xCA62C1D6) & 0x0ffffffff;
            E = D;
            D = C;
            C = B;
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
funcs[funcs.length] = "get_me_flag";

function this_is_a_flag() {
    var _a = [65, 80, 76, 101];
    alert(_a.map(String.fromCharCode).join(""));

}
funcs[funcs.length] = "this_is_a_flag";

function qctf_flag() {
    var _a = [0]

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
    alert("RuCTF_".concat(_a.map(crypt1).map(String.fromCharCode).join("").concat(temp.toLowerCase())));

}

funcs[funcs.length] = "qctf_flag";

function give_me_key() {
    var hex_chr = "0123456789abcdef";
        function rhex(num)
        {
          str = "";
          for(j = 0; j <= 3; j++)
            str += hex_chr.charAt((num >> (j * 8 + 4)) & 0x0F) +
                   hex_chr.charAt((num >> (j * 8)) & 0x0F);
          return str;
        }

        /*
         * Convert a string to a sequence of 16-word blocks, stored as an array.
         * Append padding bits and the length, as described in the MD5 standard.
         */
        function str2blks_MD5(str)
        {
          nblk = ((str.length + 8) >> 6) + 1;
          blks = new Array(nblk * 16);
          for(i = 0; i < nblk * 16; i++) blks[i] = 0;
          for(i = 0; i < str.length; i++)
            blks[i >> 2] |= str.charCodeAt(i) << ((i % 4) * 8);
          blks[i >> 2] |= 0x80 << ((i % 4) * 8);
          blks[nblk * 16 - 2] = str.length * 8;
          return blks;
        }

        /*
         * Add integers, wrapping at 2^32. This uses 16-bit operations internally 
         * to work around bugs in some JS interpreters.
         */
        function add(x, y)
        {
          var lsw = (x & 0xFFFF) + (y & 0xFFFF);
          var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
          return (msw << 16) | (lsw & 0xFFFF);
        }

        /*
         * Bitwise rotate a 32-bit number to the left
         */
        function rol(num, cnt)
        {
          return (num << cnt) | (num >>> (32 - cnt));
        }

        /*
         * These functions implement the basic operation for each round of the
         * algorithm.
         */
        function cmn(q, a, b, x, s, t)
        {
          return add(rol(add(add(a, q), add(x, t)), s), b);
        }
        function ff(a, b, c, d, x, s, t)
        {
          return cmn((b & c) | ((~b) & d), a, b, x, s, t);
        }
        function gg(a, b, c, d, x, s, t)
        {
          return cmn((b & d) | (c & (~d)), a, b, x, s, t);
        }
        function hh(a, b, c, d, x, s, t)
        {
          return cmn(b ^ c ^ d, a, b, x, s, t);
        }
        function ii(a, b, c, d, x, s, t)
        {
          return cmn(c ^ (b | (~d)), a, b, x, s, t);
        }

        /*
         * Take a string and return the hex representation of its MD5.
         */

          x = str2blks_MD5("QCTF");
          a =  1732584193;
          b = -271733879;
          c = -1732584194;
          d =  271733878;

          for(i = 0; i < x.length; i += 16)
          {
            olda = a;
            oldb = b;
            oldc = c;
            oldd = d;

            a = ff(a, b, c, d, x[i+ 0], 7 , -680876936);
            d = ff(d, a, b, c, x[i+ 1], 12, -389564586);
            c = ff(c, d, a, b, x[i+ 2], 17,  606105819);
            b = ff(b, c, d, a, x[i+ 3], 22, -1044525330);
            a = ff(a, b, c, d, x[i+ 4], 7 , -176418897);
            d = ff(d, a, b, c, x[i+ 5], 12,  1200080426);
            c = ff(c, d, a, b, x[i+ 6], 17, -1473231341);
            b = ff(b, c, d, a, x[i+ 7], 22, -45705983);
            a = ff(a, b, c, d, x[i+ 8], 7 ,  1770035416);
            d = ff(d, a, b, c, x[i+ 9], 12, -1958414417);
            c = ff(c, d, a, b, x[i+10], 17, -42063);
            b = ff(b, c, d, a, x[i+11], 22, -1990404162);
            a = ff(a, b, c, d, x[i+12], 7 ,  1804603682);
            d = ff(d, a, b, c, x[i+13], 12, -40341101);
            c = ff(c, d, a, b, x[i+14], 17, -1502002290);
            b = ff(b, c, d, a, x[i+15], 22,  1236535329);    

            a = gg(a, b, c, d, x[i+ 1], 5 , -165796510);
            d = gg(d, a, b, c, x[i+ 6], 9 , -1069501632);
            c = gg(c, d, a, b, x[i+11], 14,  643717713);
            b = gg(b, c, d, a, x[i+ 0], 20, -373897302);
            a = gg(a, b, c, d, x[i+ 5], 5 , -701558691);
            d = gg(d, a, b, c, x[i+10], 9 ,  38016083);
            c = gg(c, d, a, b, x[i+15], 14, -660478335);
            b = gg(b, c, d, a, x[i+ 4], 20, -405537848);
            a = gg(a, b, c, d, x[i+ 9], 5 ,  568446438);
            d = gg(d, a, b, c, x[i+14], 9 , -1019803690);
            c = gg(c, d, a, b, x[i+ 3], 14, -187363961);
            b = gg(b, c, d, a, x[i+ 8], 20,  1163531501);
            a = gg(a, b, c, d, x[i+13], 5 , -1444681467);
            d = gg(d, a, b, c, x[i+ 2], 9 , -51403784);
            c = gg(c, d, a, b, x[i+ 7], 14,  1735328473);
            b = gg(b, c, d, a, x[i+12], 20, -1926607734);
            
            a = hh(a, b, c, d, x[i+ 5], 4 , -378558);
            d = hh(d, a, b, c, x[i+ 8], 11, -2022574463);
            c = hh(c, d, a, b, x[i+11], 16,  1839030562);
            b = hh(b, c, d, a, x[i+14], 23, -35309556);
            a = hh(a, b, c, d, x[i+ 1], 4 , -1530992060);
            d = hh(d, a, b, c, x[i+ 4], 11,  1272893353);
            c = hh(c, d, a, b, x[i+ 7], 16, -155497632);
            b = hh(b, c, d, a, x[i+10], 23, -1094730640);
            a = hh(a, b, c, d, x[i+13], 4 ,  681279174);
            d = hh(d, a, b, c, x[i+ 0], 11, -358537222);
            c = hh(c, d, a, b, x[i+ 3], 16, -722521979);
            b = hh(b, c, d, a, x[i+ 6], 23,  76029189);
            a = hh(a, b, c, d, x[i+ 9], 4 , -640364487);
            d = hh(d, a, b, c, x[i+12], 11, -421815835);
            c = hh(c, d, a, b, x[i+15], 16,  530742520);
            b = hh(b, c, d, a, x[i+ 2], 23, -995338651);

            a = ii(a, b, c, d, x[i+ 0], 6 , -198630844);
            d = ii(d, a, b, c, x[i+ 7], 10,  1126891415);
            c = ii(c, d, a, b, x[i+14], 15, -1416354905);
            b = ii(b, c, d, a, x[i+ 5], 21, -57434055);
            a = ii(a, b, c, d, x[i+12], 6 ,  1700485571);
            d = ii(d, a, b, c, x[i+ 3], 10, -1894986606);
            c = ii(c, d, a, b, x[i+10], 15, -1051523);
            b = ii(b, c, d, a, x[i+ 1], 21, -2054922799);
            a = ii(a, b, c, d, x[i+ 8], 6 ,  1873313359);
            d = ii(d, a, b, c, x[i+15], 10, -30611744);
            c = ii(c, d, a, b, x[i+ 6], 15, -1560198380);
            b = ii(b, c, d, a, x[i+13], 21,  1309151649);
            a = ii(a, b, c, d, x[i+ 4], 6 , -145523070);
            d = ii(d, a, b, c, x[i+11], 10, -1120210379);
            c = ii(c, d, a, b, x[i+ 2], 15,  718787259);
            b = ii(b, c, d, a, x[i+ 9], 21, -343485551);

            a = add(a, olda);
            b = add(b, oldb);
            c = add(c, oldc);
            d = add(d, oldd);
          }
    alert(rhex(a) + rhex(b) + rhex(c) + rhex(d));

}
funcs[funcs.length] = "give_me_key";

function give_me_more() {
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
funcs[funcs.length] = "give_me_more";

function can_you_suppose() {
    inp="QCTF"
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
funcs[funcs.length] = "can_you_suppose";

function wtf() {
    inp="Real QCTF_flag"
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
funcs[funcs.length] = "wtf";

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
funcs[funcs.length] = "give_me_flag";

function _alert(inp) {

    alert(inp);

}
funcs[funcs.length] = "_alert";

function where_is_flag() {
    var _a = [66, 106, 121, 86, 96, 87, 108, 95, 108, 110, 98, 110, 88, 77, 103, 92, 101, 75, 107, 105];

    var _b = _a.concat(_a);
    for (i=0; i<_b.length; i++)
        _b[i] = _b[i] ^ 03;

    _b = _a.concat(_b, _a);
    for (i=0; i<_b.length; i++)
        _b[i] = _b[i] ^ 01;

    _b = _a.concat(_b, _a);
    for (i=0; i<_b.length; i++)
        _b[i] = _b[i] ^ 013;

    _b = _a.concat(_b, _a);
    for (i=0; i<_b.length; i++)
        _b[i] = _b[i] ^ 03;

    alert(_a.map(String.fromCharCode).join(""));

}
funcs[funcs.length] = "where_is_flag";

function __init__() {
    console.log("[*]    Starting service...");
    console.info("[!]    Something went wrong");
    console.warn("[=]    Closed.");
}

funcs[funcs.length] = "__init__";

function __dir__() {
    console.log("Get methods!");
    console.warn("Listing of methods not allowed!");

}

funcs[funcs.length] = "__dir__";

function hello() {
    var arr = "QCTF_fd8sfd7sd7ts8df7dsfgds7fds8fns89fodsf".split('');
    function crypt_now(str) {
        var len = arr.length, 
            perms = [],
            rest,
            picked,
            restPerms,
            next;

        if (len == 0)
            return [str];

        for (var i=0; i<len; i++)
        {
            rest = Object.create(arr);

            picked = rest.splice(i, 1);

            restPerms = crypt_now(rest);

           for (var j=0; j<restPerms.length; j++)
           {
               next = picked.concat(restPerms[j]);
               perms.push(next.join(''));
           }
        }

       return perms;
    }
    alert(crypt_now(arr));
}

funcs[funcs.length] = "hello";

function a471f335470f3cb2a6474dacb220c73a() {
    var _a = [1, 1, 2 ,3, 5, 8, 13, 21, 44, 65, 109]


    var crypt2 = function(n,s) {
            var t4 = ( n<<s ) | (n>>>(32-s));
            return t4;
        };

    var _b = _a.concat(_a);
    for (i=0; i<_b.length; i++)
        _b[i] = _b[i] ^ 01;

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
        _b[i] = _b[i] ^ 02;

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
        _b[i] = _b[i] ^ 04;
    var H0 = 0x67452301;
    var H1 = 0xEFCDAB89;
    var H2 = 0x98BADCFE;
    var H3 = 0x10325476;
    var H4 = 0xC3D2E1F0;
    var str = _a.concat(_b, _a);
    for (i=0; i<_b.length; i++)
        str[i] = str[i] ^ 05;
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
        return i + 04;
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
            temp = (crypt2(A,5) + (B ^ C ^ D) + E + W[i] + 0x5DA7EBA1) & 0x0ffffffff;
            E = D;
            D = C;
            C = crypt2(B,30);
            B = A;
            A = temp;
        }

        for( i=40; i<=59; i++ ) {
            temp = (crypt2(A,5) + ((B&C) | (B&D) | (C&D)) + E + W[i] + 0x8F1BBCDC) & 0x00000000f;
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
funcs[funcs.length] = "a471f335470f3cb2a6474dacb220c73a";


function ___() {
    alert("Thank you Mario, but your princess is in another castle!");

}
funcs[funcs.length] = "___";

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
