#!/usr/bin/perl -w

%suburbs = ();

open (F, "<schools.txt") or die "cannot open file";
while (<F>) {
    my @data = split('\|', $_);
    if ($data[0] ne "RANK") {
        $suburbs{$data[8]} += 1;
    }
}
close F;

open (P, ">numSchools.txt") or die "cannot open numSchools.txt";
foreach my $key (keys %suburbs) {
    print P "$key|$suburbs{$key}\n";
}
close P;