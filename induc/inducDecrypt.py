from sys import argv
if len(argv) < 2:
	exit()
str = argv[1]
buf = []
for i in range(len(str)):
	temp = ord(str[i])
	temp ^= 5
	if (temp > 0x28) and (temp < 0x33):
		temp += 7
	elif temp > 0x65:
		temp -= 5
	buf.append(temp)
print("".join([chr(x) for x in buf]))



			
	
	
				
			
							
				