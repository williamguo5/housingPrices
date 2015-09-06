#!/usr/bin/perl -w
open (CSV, ">schools.txt") or die "Can't create/open schools file";
foreach my $file (glob "pages/*.html") {
	open (F, "<$file") or die "Can't open file.";
	$suburbName = $file;
	$suburbName =~ s/.*?\///;
	$suburbName =~ s/\.html//;

	my $addressFlag = FALSE;
	my $typeFlag = FALSE;
	my $schoolFlag = FALSE;
	my $school = "";
	my $address = "";
	my $type = "";
	while (<F>) {
		if (m/There was an error locating the location you chose/i) {
			last;
		}
		# If no results are found, skip file (as there are nearby schools in other suburbs)
		if (m/Returned (\d+)/i) {
			if ($1 eq "0") {
				last;
			}
		}
		# School name
		#f (m/<a[^>]+?href="\/\d+\/[a-zA-Z-_]+?">.*?([a-zA-Z_\-\ ',\(\)&6]+)<\/a>/) {
		if ($schoolFlag eq FALSE && m/<a[^>]+?href="\/\d+\/.*>(.*)<\/a>$/) {
			$school = $1;
			$schoolFlag = TRUE;
		}

		# School address 
		
		if ($addressFlag eq TRUE) {
			chomp $_;
			$address .= $_;
			if (m/<\/p>/) {
				$addressFlag = FALSE;
			}
		}
		if (m/<p class="address">/) {
			$addressFlag = TRUE;
		}

		# School category (Primary, High, Catholic, Private)
		if ($typeFlag eq TRUE) {
			chomp $_;
			$type .= $_;
			if (m/<\/div>/) {
				# Tidy stuff up
				$school =~ s/^\s+//;
				$school =~ s/\s+$//;
				$type =~ s/\s+/ /g;
				$type =~ s/<\/li> <li>/, /g;
				$type =~ s/<[^>]*?>//g;
				$type =~ s/^\s+//;
				$type =~ s/\s+$//;
				$address =~ s/\s+/ /g;
				$address =~ s/<br>/,/g;
				$address =~ s/\s+<\/p>\s*//;
				$address =~ s/^\s+//;
				if ($address =~ m/NSW/) {
					# Print line to file
					if ($school eq "") {
						print "FUDGELYKLES $suburbName\n"
					}
					if ($type eq "") {
						print "DO A BARREL ROLL $suburbName\n"
					}
					if ($address eq "") {
						print "NO $suburbName\n"
					}
					print CSV "$suburbName|$school|$address|$type\n";
				}
				$typeFlag = FALSE;
				$addressFlag = FALSE;
				$schoolFlag = FALSE;
				
				# Reset variables
				$school = "";
				$address = "";
				$type = "";
			}
		}
		if (m/<div class="listing-section attributes">/) {
			$typeFlag = TRUE;
		}
	}
	
	close F;
}
close CSV;
#foreach my $file (glob "schools/*.txt") {

#}