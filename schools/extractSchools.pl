#!/usr/bin/perl -w

use constant FALSE => 0;
use constant TRUE => 1;
my $total = 0;
open (CSV, ">schools.txt") or die "Can't create/open schools file";
print CSV "RANK|SCHOOL|GOVERNMENT|PRIMARY|SECONDARY|RELIGION|GENDER|STREET|SUBURB|STATE|POSTCODE|DESCRIPTION\n";
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
		if ($addressFlag) {
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
		if ($descFlag) {
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
		if ($typeFlag) {
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
				my $isGovernment = FALSE;
				my $isPrimary = FALSE;
				my $isSecondary = FALSE;
				my $religion = "";
				my $gender = "";
				if ($type =~ m/government/i) {
					$isGovernment = TRUE;
				}
				if ($type =~ m/primary/i) {
					$isPrimary = TRUE;
				}
				if ($type =~ m/secondary/i) {
					$isSecondary = TRUE;
				}

				if ($type =~ m/([a-z]+\-denominational|anglican|catholic|christian|islamic|jewish|presbyterian|seventh day adventist|uniting church|[a-z]+ Orthodox|baptist|church of england|assyrian|multi-faith)/i) {
					$religion = $1;
				}

				if ($type =~ m/(co[\-]?ed|girls|boys)/i) {
					$gender = $1;
					$gender =~ s/\-//g;
				}

				my $rank = findSchoolRank($isSecondary, $school, $postcode);

				if ($address =~ m/NSW/i) {
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
					print CSV "$rank|$school|$isGovernment|$isPrimary|$isSecondary|$religion|$gender|$street|$suburbName|$state|$postcode|$description\n";
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
				next;
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





####################
####### SUBS #######
####################

# Returns the rank of the given school if one exists,
# else returns -1.
# [0] : Bool - isSecondary
# [1] : String - schoolName
# [2] : String - postCode
sub findSchoolRank {
	my $schoolFile = "";
	if ($_[0]) {
		$schoolFile = "secondaryRanks.txt";
	} else {
		$schoolFile = "primaryRanks.txt";
	}

	open (SCHOOL, "<$schoolFile") or die "Can't open secondaryRanks.txt";

	my $rankFlag = FALSE;
	my $subRank = 0;
	(my $tempSchoolName = $_[1]) =~ s/\(.*\)//g;
	$tempSchoolName =~ s/[\,\'\&]+//g;
	$tempSchoolName =~ s/primary|secondary|high|catholic|school//i;
	my @schoolWords = split / /, $tempSchoolName;
	if (!$_[0]) {
		push @schoolWords, $_[2];
	}

	while (my $line = <SCHOOL>) {
		if ($line =~ m/>(.{4,})<\/a>/) {
			$subRank += 1;
			my $name = $1;
			$name =~ s/\(.*\)//g;
			$name =~ s/\s+//g;
			$name =~ s/[\,\'\&]+//g;

			my $matchFlag = TRUE;
			foreach my $word (@schoolWords) {
				if ($name !~ m/$word/i) {
					$matchFlag = FALSE;
				}
			}
			if ($matchFlag) {
				$rankFlag = TRUE;
				$total += 1;
				last;
			}
		}
	}
	if (!$rankFlag) {
		$subRank = -1;
	}
	close SCHOOL;
	
	return $subRank;
}