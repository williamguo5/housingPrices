#!/usr/bin/perl -w

open(F, "<age_population.csv") or die;
%suburbs = ();
while ($line = <F>) {
    @data = split(',', $line);
    if ($data[0] eq "Suburb") {
        next;
    }
    $suburbs{$data[0]}[0] += $data[1] + $data[2];
    $suburbs{$data[0]}[1] += $data[3] + $data[4];
    $suburbs{$data[0]}[2] += $data[5] + $data[6];
    $suburbs{$data[0]}[3] += $data[7] + $data[8];
    $suburbs{$data[0]}[4] += $data[9] + $data[10];
    $suburbs{$data[0]}[5] += $data[11] + $data[12];
    $suburbs{$data[0]}[6] += $data[13] + $data[14];
    $suburbs{$data[0]}[7] += $data[15] + $data[16];
    $suburbs{$data[0]}[8] += $data[17] + $data[18];
}

close F;

open(P, ">age.csv") or die;
foreach $key (keys %suburbs) {
    print P "$key";
    for ($i=0; $i < 9; $i++) {
        print P ",$suburbs{$key}[$i]";
    }
    print P "\n";
}