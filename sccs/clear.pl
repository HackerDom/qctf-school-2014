#! /usr/bin/perl

use strict;
use warnings;
use DateTime;
use DateTime::Duration;

srand(0);
my $name = "Creator";

if ($#ARGV < 1) {
	print "usage: $0 <input sccs file> <output sccs file>\n";
	exit 1;
}

open IN, '<', $ARGV[0] or die "can't open input sccs file: $!\n";

binmode IN;
undef $/;

my $td = DateTime -> now();

$_ = <IN>;

close IN;

s!(d\sD\s.*\s)\d\d/\d\d/\d\d(\s)\d\d:\d\d:\d\d(\s)\S+(\s)! 
	my $dur = DateTime::Duration -> new (minutes => 1 + int rand 10000); 
	$td -> subtract_duration($dur); 
	$1 . $td -> ymd('/') . $2 . $td -> hms() . $3 . $name . $4;
!ge;

open OUT, '>', $ARGV[1] or die "can't open output sccs file: $!\n";

print OUT;

close OUT;
