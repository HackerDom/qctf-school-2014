all: s.keys.png
	chmod 444 s.keys.png

@PHONE: all clean cleanAll

s.keys.png: clear.pl makefile s.tmp.png
	./clear.pl s.tmp.png s.keys.png
	sccs admin -z s.keys.png 2> /dev/null

s.tmp.png: create.pl makefile desk.txt
	./create.pl tmp.png key.txt 2> /dev/null > /dev/null

clean:
	-rm -f s.tmp.png

cleanAll: clean
	-rm -f s.keys.png 
