#!/usr/bin/perl -w

open (F, "<$ARGV[0]") or die "Couldn't open file with suburb names an postcodes";
open (ENDFILE, ">suburbDescriptions.txt") or die "Cannot open ENDFILE";
print ENDFILE "SUBURB,DESCRIPTION,LONG DESCRIPTION\n";
while (<F>) {
    my @data = split(',', $_);
    my $name = lc($data[0]);
    my $postcode = $data[1];
    $name =~ s/ /\%20/g;
    my $page = `curl --silent "http://www.realestate.com.au/neighbourhoods/$name-$postcode-nsw"`;
    if ($page =~ /Sorry, page not found/i) {
        print "$name\n";
        next;
    }
    my $description = "";
    my $longDescription = "";

    if ($page =~ /<h2 class="synopsis h2 strong">([^<]+)<\/h2>/) {
        $description = "$1";
    }
    while ($page =~ /<p class=\"body\-paragraph p1\">(.*?)</g) {
        if ($longDescription ne "") {
            $longDescription .= " ";
        }
        $longDescription .= "$1";
    }

    print ENDFILE "$data[0]|$description|$longDescription\n";
}

close ENDFILE;
close F;