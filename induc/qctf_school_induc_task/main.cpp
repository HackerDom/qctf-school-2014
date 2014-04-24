#include <stdio.h>
#include <Windows.h>

int main()
{
	char* buf = (char*)malloc(100);
	memset(buf, 0, 100);
	printf("Hello, this is simple crypter\n");
	printf("Write data for crypt: ");
	scanf_s("%s", buf, 100);
	int len = strlen(buf);
	
	for (int i = 0; i < len; i++)
	{
		if (buf[i] > 0x60)
			buf[i] += 5;
		
		if ((buf[i] > 0x2f) && (buf[i] < 0x3a))
			buf[i] -= 7;

		buf[i] ^= 5;
	}

	printf("%s", buf);
	free(buf);

	return 0;
}
