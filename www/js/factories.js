ukuleleApp.factory('ChordsFactory', function() {
    return {
        get: function() {
            var chords = [];

            chords.push({'name': 'A', 'french_name': 'LA'});
            chords.push({'name': 'A# / Bb', 'french_name': 'LA # / SI b'});
            chords.push({'name': 'B', 'french_name': 'SI'});
            chords.push({'name': 'C', 'french_name': 'DO'});
            chords.push({'name': 'C# / Db', 'french_name': 'DO # / RÉ b'});
            chords.push({'name': 'D', 'french_name': 'RÉ'});
            chords.push({'name': 'D# / Eb', 'french_name': 'RÉ # / MI b'});
            chords.push({'name': 'E', 'french_name': 'MI'});
            chords.push({'name': 'F', 'french_name': 'Fa'});
            chords.push({'name': 'F# / Gb', 'french_name': 'Fa # / SOL b'});
            chords.push({'name': 'G', 'french_name': 'Sol'});
            chords.push({'name': 'G# / Ab', 'french_name': 'SOL # / LA b'});

            return chords;
        }
    }

});

ukuleleApp.factory('ChordTypesFactory', function() {
    return {
        get: function() {
            var types = [];

            types.push({'name': 'Major'});
            types.push({'name': 'Minor'});

            return types;
        }
    }
});
