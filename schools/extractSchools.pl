#!/usr/bin/perl -w

foreach $file (glob "pages/*.html") {
	open (F, "<$file") or die "Can't open file.";
	$filename = $file;
	$filename =~ s/.*?\///;
	$filename =~ s/\.html//;
	open (CSV, ">schools/$filename.txt") or die "Can't create/open schools file";
	my $addressFlag = FALSE;
	my $typeFlag = FALSE;
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
		if (m/<a[^>]+?href="\/\d+\/[a-zA-Z-_]+?">.*?([a-zA-Z-_ ',]+)<\/a>/) {
			$school = $1;
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
					print CSV "$school|$address|$type\n";
				}
				$typeFlag = FALSE;
				
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
	close CSV;
	close F;
}