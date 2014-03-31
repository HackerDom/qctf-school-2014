#define BYTE unsigned char
#define WORD unsigned short
#define DWORD unsigned int

typedef struct {
	BYTE data[16];
	BYTE state[48];
	BYTE checksum[16];
	BYTE len;
} MD2_CTX;

#ifdef  __cplusplus
extern "C" {
#endif
void md2_init(MD2_CTX *ctx);
void md2_update(MD2_CTX *ctx, BYTE data[], DWORD len);
void md2_final(MD2_CTX *ctx, BYTE hash[]);
#ifdef  __cplusplus
}
#endif