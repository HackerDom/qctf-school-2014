#include <stdio.h>
#include <Windows.h>
#include <Wincrypt.h>

BOOL getmd5(char* buf, int key)
{
	HCRYPTPROV hProv = 0;
    HCRYPTHASH hHash = 0;
	DWORD cbHash = 16;
	BYTE rgbHash[16];

	if (!::CryptAcquireContext(&hProv, NULL, NULL, PROV_RSA_FULL, CRYPT_VERIFYCONTEXT))
    {
		printf("Error! CryptAcquireContext fails with errorcode: %d", ::GetLastError());
		return FALSE;
	}

	if (!::CryptCreateHash(hProv, CALG_MD5, 0, 0, &hHash))
	{
		printf("Error! CryptCreateHash fails with errorcode: %d", ::GetLastError());
		::CryptReleaseContext(hProv, 0);
		return FALSE;
	}

	_itoa_s(key, buf, 32, 10);

	if (!CryptHashData(hHash, (BYTE*) buf, strlen(buf), 0))
	{
		printf("Error! CryptHashData fails with errorcode: %d", ::GetLastError());
		::CryptDestroyHash(hHash);
		::CryptReleaseContext(hProv, 0);
		return FALSE;
	}

	if (!CryptGetHashParam(hHash, HP_HASHVAL, rgbHash, &cbHash, 0))
	{
		printf("Error! CryptGetHashParam fails with errorcode: %d", ::GetLastError());
		::CryptDestroyHash(hHash);
		::CryptReleaseContext(hProv, 0);
		return FALSE;
	}

	for (int i = 0; i < 16; i++)
		sprintf_s(&buf[i*2], 3, "%02X", rgbHash[i]);

	::CryptDestroyHash(hHash);
	::CryptReleaseContext(hProv, 0);

	return TRUE;
}

int main()
{
	char* buf = (char*)malloc(100);
	int len = 0, key = 0;
	memset(buf, 0, 100);
	char* filePath = (char*)malloc(MAX_PATH);
	memset(filePath, 0, MAX_PATH);
	char* md5 = (char*)malloc(33);
	memset(md5, 0, 33);
	printf("Hello, this is simple crypter\n");
	printf("Write data for crypt: ");
	scanf_s("%s", buf, 100);
	len = strlen(buf);
	printf("Would you like to write key? If not, write zero.\n");
	scanf_s("%d", &key);

	if (key == 0)
	{
		key = ::GetModuleFileNameA(NULL, filePath, MAX_PATH);
		if (key == 0)
		{
			printf("Error! GetModuleFileName fails with errorcode: %d", ::GetLastError());
			return -1;
		}
	}

	if (!getmd5(md5, key))
		return -2;

	for (int i = 0; i < len; i++)
		buf[i] ^= md5[i%32];

	printf("%s", buf);

	free(buf);
	free(filePath);
	free(md5);

	return 0;
}
