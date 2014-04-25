#include <stdio.h>
#include <string.h>

void print_flag() {
	char flag[32];
	FILE *hFile;

	hFile = fopen("flag", "r");
	fgets(flag, sizeof(flag), hFile);
	fclose(hFile);
	printf("Your flag is %s\n", flag);
}

int main() {
	char name[32];
	
	printf("Hey, what is your name? ");
	gets(name);
	printf("%s, help me! I want to give you a flag, but the programmer "
	"has forbidden me to do it! I know what you should do:\n"
	"- you should know what are stack frame and calling convention\n"
	"- I heard that it is comfortable to use python and Linux pipe\n"
	"- open me in IDA\n"
	"- look for vulnerabilities. I'm sure that the programmer used unsafe functions\n"
	"- use it to run a function print_flag (as you can see in IDA, print_flag at %p)\n"
	"- if you want, you can play with me in gdb\n", name, print_flag);
	fflush(stdout);

	return 0;
}