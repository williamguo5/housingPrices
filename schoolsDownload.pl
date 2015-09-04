#!/usr/bin/perl -w


open (F, '<sydney_suburbs4.txt') or die "Failed to open list of Sydney Suburbs";
while (my $suburb = <F>) {
	print $suburb;
	chomp $suburb;
	open (PAGE, ">schools/$suburb.txt") or die "Cannot make file";
	$suburb =~ s/ /+/g;
	$page = `curl -silent "http://www.australianschoolsdirectory.com.au/search-result.php" --data "list_state=NSW&list_region=Sydney&list_subreg=&suburbType=&list_subreg2=&flashfile=sydney&txtSuburb=$suburb&search=true" --compressed`;
	print PAGE $page;
	close PAGE;
}
close F;


foreach $file (glob "schools/*.txt") {
	open (F, "<$file") or die "Can't open file.";
	while (<F>) {
		if (m/There was an error locating the location you chose/i) {
			last;
		}
		if (m/Returned (\d+)/i) {
			if ($1 eq "0") {
				last;
			}
		}
	}
	close F;
}