ukuleleApp.filter('chordsByType', function() {
    return function(items, chord_type) {
        var filtered = [];
        for (var i=0; i<items.length; i++) {
            if (items[i]['chords'][chord_type] != undefined) {
                filtered.push(items[i]);
            }
        }
        return filtered;
    }
});
ukuleleApp.filter('replaceName', function(ChordsFactory) {
    return function(name) {
        var french_names = ChordsFactory.get_french_names();
        return name;
    }
});
