from hashlib import md5


for i in range(1, 261):
    text = [ord(x) for x in list("H[0%hLR7*jX5^V]")]
    hash = md5(str(i).encode('utf-8'))
    for j in range(len(text)):
        text[j] ^= ord(str(hash.hexdigest()).upper()[j])
    print("".join(chr(x) for x in text))

