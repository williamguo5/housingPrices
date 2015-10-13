#!/usr/bin/perl -w
# pass in the .csv file that you want to simplify
use constant TRUE => 1;
use constant FALSE => 0;

open (SUBURBS, "<$ARGV[0]") or die "Cannot open suburbNames.txt";
open (DATAFILE, "<$ARGV[1]") or die "Can't open csv data file";
open (ENDFILE, ">suburbPricing.csv") or die "Can't open csv destination file.";
%suburbs = ();
%houses = ();
%units = ();

while (my $suburb = <SUBURBS>) {
	chomp $suburb;
	$suburbs{uc($suburb)} = 0;
}
foreach my $key (keys %suburbs) {
	$houses{$key}[0] = 0;
	$houses{$key}[1] = 0;
	$units{$key}[0] = 0;
	$units{$key}[1] = 0;
}

while (my $entry = <DATAFILE>) {
	@data = split(',', $entry);
	if ($data[0] eq "\"NSW\"") {
		my $name = $data[4];
		$name = uc($name);
		$name =~ s/\"//g;

		if (exists $suburbs{$name}) {					# If its a suburb in Sydney
			if ($data[7] eq "") {							# If the median is not given
				if (($data[8] && $data[6])) {				# Try to just calculate the mean and use that
					($data[7] = $data[8]) =~ s/\"//g;
					$data[7] = int($data[7]/$data[6]);
				} else {
					$data[7] = 0;
				}

			} else {
				$data[7] =~ s/\"//g;
			}
			$data[17] =~ s/\"//g;

			if ($data[5] eq "\"H\"") {						# If it is housing data
				if ($data[7] != 0) {
					$houses{$name}[0] = $data[7];
				}
				if ($data[17] ne "") {
					if ($data[17] != 0) {
						$houses{$name}[1] = $data[17];
					}
				}
			} else {
				$units{$name}[0] = $data[7];
				if ($data[17] ne "") {
					if ($data[17] != 0) {
						$units{$name}[1] = $data[17];
					}
				}
			}
			$suburbs{$name} += 1;
		}
	}
}
print "\nREALESTATE DATA FOR THESE PLACES NOT FOUND:\n";
print "########################\n";
print ENDFILE "SUBURB,HOUSE PRICE,HOUSE RENT PRICE,UNIT PRICE,UNIT RENT PRICE\n";
foreach my $suburb (keys %suburbs) {
	print ENDFILE "$suburb,$houses{$suburb}[0],$houses{$suburb}[1],$units{$suburb}[0],$units{$suburb}[1]\n";
	if ($suburbs{$suburb} == 0) {
		print "  $suburb\n";
	}
}
print "########################\n";

close ENDFILE;
close DATAFILE;
close SUBURBS;