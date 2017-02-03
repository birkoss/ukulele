ukuleleApp.filter('completeChord', function(ChordTypesFactory) {
    return function(name, chord_type) {
        if (name == undefined) {
            return name;
        }

        // Add the chord type suffix if available
        if (chord_type != undefined) {
            name += ChordTypesFactory.get(chord_type).suffix;
        }

        return name;
    }
});
ukuleleApp.filter('translateChord', function(ChordsService) {
    return function(name, show_in_french) {
        if (name == undefined) {
            return name;
        }

        if (show_in_french) {
            var french_names = ChordsService.get_french_names();
            for (var note in french_names) {
                if (name.indexOf(note) >= 0) {
                    name = name.replace(note, french_names[note]);
                    break;
                }
            }
        }

        return name;
    }
});
