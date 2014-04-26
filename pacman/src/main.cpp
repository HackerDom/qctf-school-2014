#include <malloc.h>
#include <stdio.h>
#include <string.h>
#include <Windows.h>
#include <WinCrypt.h>

const char verse1[] = "Между строчек где-то в коде\n"
					  "Притаился хитрый баг,\n"
					  "Он логический наверно -\n"
					  "Не дебажится никак.\n"
					  "\n"
					  "Планомерно шаг за шагом,\n"
					  "Кучу тестов написал,\n"
					  "И его по логам, гада,\n"
					  "В процедуре отыскал.\n"
					  "\n"
					  "Вслед за ифом, перед фором,\n"
					  "Обнаружен был злодей.\n"
					  "И пофикшен, ясен перец -\n"
					  "Сразу стало веселей.\n"
					  "\n"
					  "Чтоб душе спокойно стало,\n"
					  "Тест контрольный запустил -\n"
					  "Баг по прежнему на месте...\n"
					  "Так бы сволочь и убил!\n";
const char verse3[] = "Мой стек уже не пуст, пуста лишь только память.\n"
					  "Не получается на вход массив подать!\n"
					  "А если ты ламер, то так не бывает…\n"
					  "Червю поэта не понять!\n";
const char verse2[] = "Два, один, четыре, восемь -\n"
					  "Маску битиков набросим\n"
					  "Кнута что ли почитать -\n"
					  "Алгоритмы чтобы знать\n"
					  "Кернигана с Ричи тоже,\n"
					  "А забыть - себе дороже,\n"
					  "Страуструпа, Шилдта надо.\n"
					  "Создадим себе ограду\n"
					  "Из диезов и астриксов,\n"
					  "Сервиспаков с кучей фиксов.\n"
					  "Вместо сладкого, конфет -\n"
					  "Есть коммерческое эт.\n"
					  "Мы пошлём по адресам\n"
					  "Спам и вирусы - всё к Вам,\n"
					  "Ящик мыла будет полным.\n"
					  "Есть ещё пакетов волны,\n"
					  "Атакуют Ваш АйПи -\n"
					  "Никому к Вам не зайти.\n"
					  "Не поймём никак мы Вас -\n"
					  "Говорите: \"Си-плас-плас\"!\n"
					  "Вот тогда в контакте будем,\n"
					  "Как кукушка, Вас разбудим\n"
					  "Аськой или АВеПи\n"
					  "Хрюкнет в Виндовсе эКсПи.\n"
					  "Не удасться полежать -\n"
					  "Дум заменит Вам кровать,\n"
					  "Пару импов замочить\n"
					  "Или в Кваке фрагов бить,\n"
					  "В поле шарики гонять,\n"
					  "Или кирпичи сбивать -\n"
					  "От соблазна не сбежать,\n"
					  "Даже некогда жевать.\n"
					  "Может только, так банально,\n"
					  "Пакмэн, Снейк нам виртуально\n"
					  "Пищу даст, не для ума,\n"
					  "Отдохнёт пусть голова.\n";

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
