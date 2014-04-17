#!/usr/bin/perl

use strict;
use warnings;
use constant (KEY => 17);
use constant (DIR => '624fe4afc0b781bad39e');

$\ = $/;

my @alph = ('a' .. 'z');

sub genName {
	my $res = '';
	$res .= $alph[int rand @alph] for 1 .. 20;
	return $res;
}

sub caesar {
	my ($text, $key) = @_;
	$key = $key || KEY;
	my @a = (@alph[$key .. $#alph], @alph[0 .. $key - 1]);
	my $alph = join '', @alph;
	my $a = join '', @a;
	eval "\$text =~ tr/$alph/$a/";
	return $text;
}

sub atbash {
	my ($text) = @_;
	my @a = reverse @alph;
	my $alph = join '', @alph;
	my $a = join '', @a;
	eval "\$text =~ tr/$alph/$a/";
	return $text;
}

sub unknown {
	my ($text) = @_;
	$text =~ s/([a-z]+)/caesar($1, length $1)/ge;
	return $text
}

my @subs = reverse (\&atbash, \&caesar, \&unknown);
my $html = '<html></body><a href="!next.html">go</a></body></html>';

open IN, '<key.txt' or die "can't open key.txt: $!\n";
my $key = <IN>;
close IN;

my $name = genName();
open OUT, '>', DIR."/$name.html" or die "can't open output file: $!\n";
print OUT $key;
close OUT;

my $oldname = $name;

for (@subs) {
	$name = genName();
	my $text = $html;

	$text =~ s/!next/$oldname/g;

	open OUT, '>', DIR."/$name.html" or die "can't open output file: $!\n";
	print OUT $_ -> ($text);
	close OUT;

	$oldname = $name;
}

my $text = $html;
$text =~ s/!next/$oldname/g;
$text =~ s/go/start!/g;
open OUT, '>', DIR."/index.html" or die "can't open output file: $!\n";
print OUT $text;
close OUT;

