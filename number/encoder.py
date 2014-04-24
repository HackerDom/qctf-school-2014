import sys

def big_endian(s):
	return int(s.encode('hex'),16)

def little_endian(s):
	return big_endian(''.join(reversed(list(s))))

def main():
	print "Little endian:", little_endian(sys.argv[1])
	print "Big endian:", big_endian(sys.argv[1])

if __name__ == '__main__':
	main()