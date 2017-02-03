ukuleleApp.filter('filterChordsByType', function() {
    return function(items, chord_type) {

    }
});

ukuleleApp.filter('replaceName', function(ChordsService, ChordTypesFactory, ConfigService) {
    return function(name, chord_type) {
        var options = ConfigService.load('options');
        if (options['show_in_french']) {
            var french_names = ChordsService.get_french_names();
            for (var note in french_names) {
                if (name.indexOf(note) >= 0) {
                    name = name.replace(note, french_names[note]);
                    break;
                }
            }
        }

        // Add the chord type suffix if available
        if (chord_type != undefined) {
            name += ChordTypesFactory.get(chord_type).suffix;
        }

        return name;
    }
});
