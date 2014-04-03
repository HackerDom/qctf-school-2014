#include <stdio.h>
#include <Windows.h>

int main()
{
	char str[] = "SQCTF:no8fdX9qeA55";
	int len = strlen(str);
	
	for (int i = 0; i < len; i++)
	{
		if (str[i] > 0x60)
			str[i] += 5;
		
		if ((str[i] > 0x2f) && (str[i] < 0x3a))
			str[i] -= 7;

		str[i] ^= 5;
	}

	
	printf("%s", str);

	return 0;
}
