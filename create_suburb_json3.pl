#!/usr/bin/perl -w

#json file header
print "{\n";
print '   "type": "FeatureCollection",', "\n";
print '   "features": [', "\n";


# ---------------------- Start printing for each suburb -------------------------
$line_count = 0;
while($suburb = <>){
	chomp $suburb;
	
	$url = "https://raw.githubusercontent.com/aidanmorgan/aus_suburb_kml/master/NSW/$suburb.kml";
	$suburb2 = lc $suburb;
	print ",\n" if($line_count != 0);
	$line_count++;
	print '      {', "\n";
	print '         "type": "Feature",', "\n";
	print '         "properties": {', "\n";
	
	print '            "name": "', $suburb2, '",', "\n";
	print '            "color": "blue"', "\n";
	print '         },', "\n";
	print '         "geometry": {', "\n";
	print '            "type": "Polygon",', "\n";
	print '            "coordinates": [', "\n";
	print '               [', "\n";
	print '                  ';
	
	
	
	open S, "wget -q -O- '$url'|" or die;
	$list = '';
	$set_count = 0;
	die if S eq '';
	while($line = <S>){
		die if ($line =~ /^\s*$/);
		# $list .= $line;
		if($line =~ /^\s*<coordinates>/){
			if ($set_count != 0){
				print "\n";
				print '               ],', "\n";
				print '               [', "\n";
				print '                  ';
			}
			$set_count++;
			$list = $line;
			$list =~ s/\s*<coordinates>//;
			$list =~ s/<\/coordinates>//;
			chomp $list;		
			@coord = split /[ ]/, $list;
			foreach $set (@coord){
				$set = "[$set]";
			}
			$list = join ', ', @coord;
			push @set, $list;
			print $list;
		}
	}
	print "\n";
	print '               ]', "\n";
	print '            ]', "\n";
	print '         }', "\n";
	print '      }';
}

# ---------------------- End printing for each suburb --------------------------
#json file footer
print "\n";
print '   ]', "\n";
print "}\n";