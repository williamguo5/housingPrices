#!/usr/bin/perl -w
use Switch

my $total = 0;
open (CSV, ">schools.txt") or die "Can't create/open schools file";
foreach my $file (glob "pages/*.html") {
	open (F, "<$file") or die "Can't open file.";
	$suburbName = $file;
	$suburbName =~ s/.*?\///;
	$suburbName =~ s/\.html//;
	my $addressFlag = FALSE;
	my $typeFlag = FALSE;
	my $schoolFlag = FALSE;
	my $descFlag = FALSE;
	my $school = "";
	my $address = "";
	my $type = "";
	my $description = "";

	

	while (<F>) {
		if (m/There was an error locating the location you chose/i) {
			#print "WHERE IS THIS: $suburbName\n";
			last;
		}
		# If no results are found, skip file (as there are nearby schools in other suburbs)
		if (m/Returned (\d+)/i) {
			if ($1 eq "0") {
				#print "NO SCHOOLS HERE: $suburbName\n";
				last;
			}
		}
		##### Name #####
		if ($schoolFlag eq FALSE && m/<a[^>]+?href="\/\d+\/.*>(.*)<\/a>$/) {
			$school = $1;
			$schoolFlag = TRUE;
			next;
		}

		##### Address #####
		if ($addressFlag eq TRUE) {
			chomp $_;
			$address .= $_;
			if (m/<\/p>/) {
				$addressFlag = FALSE;
			}
			next;
		}
		if (m/<p class="address">/) {
			$addressFlag = TRUE;
			next;
		}

		##### Description #####
		if ($descFlag eq TRUE) {
			chomp $_;
			
			$description = "$_";
			$description =~ s/<.*$//;
			$description =~ s/^\s+//;
			$description =~ s/\s+$//;
			$descFlag = FALSE;
			next;
		}
		if (m/shortdescription/) {
			$descFlag = TRUE;
			next;
		}

		##### School category (Primary, High, Catholic, Private) #####
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
				$type =~ s/\s+//;
				$address =~ s/\s+/ /g;
				$address =~ s/<br>/,/g;
				$address =~ s/\s+<\/p>\s*//;
				$address =~ s/^\s+//;
				($street = $address) =~ s/^([^,]+).*/$1/;
				($postcode = $address) =~ s/.*(\d{4})$/$1/;
				($state = $address) =~ s/.*([A-Z]{3}).*/$1/;
				my $government = FALSE;
				my $primary = FALSE;
				my $secondary = FALSE;
				my $religion = "";
				my $gender = "";
				if ($type =~ m/government/i) {
					$government = TRUE;
				}
				if ($type =~ m/primary/i) {
					$primary = TRUE;
				}
				if ($type =~ m/secondary/i) {
					$secondary = TRUE;
				}

				if ($type =~ m/([a-z]+\-denominational|anglican|catholic|christian|islamic|jewish|presbyterian|seventh day adventist|uniting church|[a-z]+ Orthodox|baptist|church of england|assyrian|multi-faith)/i) {
					$religion = $1;
				}

				if ($type =~ m/(co[\-]?ed|girls|boys)/i) {
					$gender = $1;
					$gender =~ s/\-//g;
				}

				open (HIGHSCHOOL, "<schoolRanks.html") or die "Can't open schoolRanks.html";
				my $rank = 0;
				my $rankFlag = FALSE;
				(my $tempSchoolName = $school) =~ s/\(.*\)//;	# NEED TO IGNORE WHITESPACE
				$tempSchoolName =~ s/\s+//g;
				while (my $line = <HIGHSCHOOL>) {
					if ($line =~ m/>(.{4,})<\/a>/) {
						$rank += 1;
						my $name = $1;
						$name =~ s/\(.*\)//;
						$name =~ s/\s+//g;
						if (lc($name) eq lc($tempSchoolName)) {
							$rankFlag = TRUE;
							$total += 1;
							last;
						}
					}
				}
				if ($rankFlag eq FALSE) {
					$rank = -1;
				}
				close HIGHSCHOOL;

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
					print CSV "$rank|$school|$government|$primary|$secondary|$religion|$gender|$street|$suburbName|$state|$postcode|$description\n";
				}
				$typeFlag = FALSE;
				$addressFlag = FALSE;
				$schoolFlag = FALSE;
				$descFlag = FALSE;
				
				# Reset variables
				$school = "";
				$address = "";
				$type = "";
				$description = "";
			}
		}
		if (m/<div class="listing-section attributes">/) {
			$typeFlag = TRUE;
			next;
		}
	}
	
	close F;
}
close CSV;
print "$total\n";