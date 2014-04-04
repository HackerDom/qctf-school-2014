#! /usr/bin/perl

use strict;
use warnings;
use Imager;

use constant (PREF => 'QCTF_');

srand 0;

my @alph = ('0' .. '9', 'a' .. 'z');

sub createList {
	my $pref = shift;
	my @res;
	for (0 .. 100 + int rand 100) {
		my $key = 'QCTF_';
		$key .= $alph[int rand 16] for (1 .. 32);
		push @res, $key;
	}
	return @res;
}


if ($#ARGV < 1) {
	print STDERR "usage: $0 <task file> <key file>";
	exit 1;
}

my $file = $ARGV[0];
my $keyFile = $ARGV[1];

open KEY, '<', $keyFile or die "can't open key file: $!";

my $key = <KEY>;
chomp $key;
print $key, "\n";

my $xsize = 32 * length $key;
my $ysize = 40;

my $font = Imager::Font -> new(file => 'technicality.ttf', size => 32, color => 'white') or die Imager -> errstr."\n";
my @keys = (createList(PREF), $key, createList(PREF));

my $sfile = "s.$file";
print `sccs admin -b -n -y -tdesk.txt $sfile`;

#my $ver = 0;

for (@keys) {
	my $rev = 1 + int rand 10;
	print `sccs edit -r$rev $sfile`;
	my $img = Imager -> new(xsize => $xsize, ysize => $ysize);
	$img -> string(x => 5, y => 35, string => $_, font => $font);
	$img -> write(file => $file) or die $img -> errstr;
#	$img -> write(file => sprintf "%04d.png", ++$ver) or die $img -> errstr;
	my $mess = $_ eq $key ? 'right' : 'wrong!!!';
	print `sccs delta -y'$mess' $sfile`;
}
