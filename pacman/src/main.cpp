#include <malloc.h>
#include <stdio.h>
#include <string.h>
#include <Windows.h>
#include <WinCrypt.h>

const char verse1[] = "����� ������� ���-�� � ����\n"
					  "��������� ������ ���,\n"
					  "�� ���������� ������� -\n"
					  "�� ��������� �����.\n"
					  "\n"
					  "���������� ��� �� �����,\n"
					  "���� ������ �������,\n"
					  "� ��� �� �����, ����,\n"
					  "� ��������� �������.\n"
					  "\n"
					  "����� �� ����, ����� �����,\n"
					  "��������� ��� ������.\n"
					  "� ��������, ���� ����� -\n"
					  "����� ����� �������.\n"
					  "\n"
					  "���� ���� �������� �����,\n"
					  "���� ����������� �������� -\n"
					  "��� �� �������� �� �����...\n"
					  "��� �� ������� � ����!\n";
const char verse3[] = "��� ���� ��� �� ����, ����� ���� ������ ������.\n"
					  "�� ���������� �� ���� ������ ������!\n"
					  "� ���� �� �����, �� ��� �� ������\n"
					  "����� ����� �� ������!\n";
const char verse2[] = "���, ����, ������, ������ -\n"
					  "����� ������� ��������\n"
					  "����� ��� �� �������� -\n"
					  "��������� ����� �����\n"
					  "��������� � ���� ����,\n"
					  "� ������ - ���� ������,\n"
					  "�����������, ������ ����.\n"
					  "�������� ���� ������\n"
					  "�� ������ � ���������,\n"
					  "����������� � ����� ������.\n"
					  "������ ��������, ������ -\n"
					  "���� ������������ ��.\n"
					  "�� ����� �� �������\n"
					  "���� � ������ - �� � ���,\n"
					  "���� ���� ����� ������.\n"
					  "���� ��� ������� �����,\n"
					  "������� ��� ���� -\n"
					  "������ � ��� �� �����.\n"
					  "�� ����� ����� �� ��� -\n"
					  "��������: \"��-����-����\"!\n"
					  "��� ����� � �������� �����,\n"
					  "��� �������, ��� ��������\n"
					  "������ ��� �����\n"
					  "������� � �������� �����.\n"
					  "�� �������� �������� -\n"
					  "��� ������� ��� �������,\n"
					  "���� ����� ��������\n"
					  "��� � ����� ������ ����,\n"
					  "� ���� ������ ������,\n"
					  "��� ������� ������� -\n"
					  "�� �������� �� �������,\n"
					  "���� ������� ������.\n"
					  "����� ������, ��� ��������,\n"
					  "������, ����� ��� ����������\n"
					  "���� ����, �� ��� ���,\n"
					  "������� ����� ������.\n";

int main()
{
	WORD verse1_len = strlen(verse1);
	WORD verse2_len = strlen(verse2);

	HCRYPTPROV hProv;
	HCRYPTHASH hHash;

	if (!CryptAcquireContext(&hProv, NULL, NULL, PROV_RSA_AES, CRYPT_VERIFYCONTEXT))
		return 1;
	if (!CryptCreateHash(hProv, CALG_MD4, 0, 0, &hHash)) {
		CryptReleaseContext(hProv, 0);
		return 2;
	}

	printf("This program will calculate the flag for you. Please wait...\n");

	BYTE *data;
	WORD verse1_pos = 0, verse2_pos = 0;
	for (DWORD i = 1; i <= 10000000; i++) {
		data = (BYTE*)malloc(2048);

		for (WORD k = 0; k < 2048; k++) {
			data[k] = verse1[verse1_pos++] ^ verse2[verse2_pos++];

			if (verse1_pos == verse1_len)
				verse1_pos = 0;
			if (verse2_pos == verse2_len)
				verse2_pos = 0;
		}

		if (!CryptHashData(hHash, data, 2048, 0)) {
			free(data);

			CryptDestroyHash(hHash);
			CryptReleaseContext(hProv, 0);
			return 3;
		}

		// if (i % 100000 == 0)
		// 	printf("%d\n", i);
	}

	free(data);

	if (!CryptHashData(hHash, (BYTE*)verse3, strlen(verse3), 0)) {
		CryptDestroyHash(hHash);
		CryptReleaseContext(hProv, 0);
		return 3;
	}

	DWORD hash_len, data_len = sizeof(DWORD);
	if (!CryptGetHashParam(hHash, HP_HASHSIZE, (BYTE*)&hash_len, &data_len, 0)) {
		CryptDestroyHash(hHash);
		CryptReleaseContext(hProv, 0);
		return 4;
	}

	data = (BYTE*)malloc(hash_len);
	if (!CryptGetHashParam(hHash, HP_HASHVAL, data, &hash_len, 0)) {
		CryptDestroyHash(hHash);
		CryptReleaseContext(hProv, 0);
		return 4;
	}

	printf("\nCongratulation!! The key is: QCTF_");
	for (DWORD i = 0; i < hash_len; i++)
		printf("%02x", data[i]);

	free(data);
	return 0;
}
