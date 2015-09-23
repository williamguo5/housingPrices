#!/usr/bin/perl -w
# pass in the .csv file to simplify
use constant TRUE => 1;
use constant FALSE => 0;

open (SUBURBS, "<$ARGV[0]") or die "Cannot open suburbNames.txt";
open (DATAFILE, "<$ARGV[1]") or die "Can't open csv data file";
open (ENDFILE, ">suburbHousePricing.csv") or die "Can't open csv destination file.";
%suburbs = ();
%houses = ();
%units = ();

while (my $suburb = <SUBURBS>) {
	chomp $suburb;
	$suburbs{lc($suburb)} = 0;
}
while (my $entry = <DATAFILE>) {
	@data = split(',', $entry);
	if ($data[0] eq "\"NSW\"") {
		$data[4] = lc($data[4]);
		$data[4] =~ s/\"//g;

		if (exists $suburbs{$data[4]}) {					# If its a suburb in Sydney
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
			if ($data[5] eq "\"H\"") {						# If it is housing data
				if (exists $houses{$data[4]}) {
					if ($data[7] != 0) {
						$houses{$data[4]} = $data[7];
					}
				} else {									# Else it is units data
					$houses{$data[4]} = $data[7];
				}
			} else {
				$units{$data[4]} = $data[7];
			}
			$suburbs{$data[4]} += 1;
		}
	}
}
foreach my $key (keys %houses) {
	print ENDFILE "$key, $houses{$key}\n";
}

print "\nPLACES NOT FOUND\n";
print "########################\n";
foreach my $key (keys %suburbs) {
	if ($suburbs{$key} == 0) {
		print "$key\n";
		print ENDFILE "$key, $suburbs{$key}\n";
	}
}
print "########################\n";

close ENDFILE;
close DATAFILE;
close SUBURBS;