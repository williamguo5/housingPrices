#!/usr/bin/perl -w
# pass in the .csv file to simplify
use constant TRUE => 1;
use constant FALSE => 0;

open (SUBURBS, "<$ARGV[0]") or die "Cannot open suburbNames.txt";
open (DATAFILE, "<$ARGV[1]") or die "Can't open csv file";
open (ENDFILE, ">realEstate.csv") or die "Can't open csv destination file.";
%suburbs = ();

while (my $suburb = <SUBURBS>) {
	chomp $suburb;
	$suburbs{lc($suburb)} = 0;
}
while (my $entry = <DATAFILE>) {
	(my $name = lc($entry)) =~ s/[^,]+,[^,]+,[^,]+,[^,]+,\"([^,\"]+)\",.*/$1/;
	chomp $name;
	if (exists $suburbs{$name}) {
		print ENDFILE $entry;
		$suburbs{$name} += 1;
	}
}
print "\nPLACES NOT FOUND\n";
print "########################\n";
foreach my $key (keys %suburbs) {
	if ($suburbs{$key} == 0) {
		print "$key\n";
	}
}
print "########################\n";
close ENDFILE;
close DATAFILE;
close SUBURBS;