ukuleleApp.factory('ChordTypesFactory', function() {
    return {
        get: function(chord_type) {
            var types = [];

            types.push({
                'name': 'Major',
                'chord': 'Triad',
                'suffix': '',
                'scale': [2, 2, 1, 2, 2, 2, 1],
                'scale_parts': [1, 3, 5],
            });
            types.push({
                'name': 'Minor',
                'chord': 'Triad',
                'suffix': 'm',
                'scale': [2, 1, 2, 2, 1, 2, 2],
                'scale_parts': [1, 3, 5],
            });
            types.push({
                'name': '7',
                'chord': 'Seventh',
                'suffix': '7',
                'scale': [2, 2, 1, 2, 2, 1, 2],
                'scale_parts': [1, 3, 5, 7],
            });

            if (chord_type != undefined) {
                for (var i=0; i<types.length; i++) {
                    if (types[i].name == chord_type) {
                        return types[i];
                    }
                }
            }
            
            return types;
        }
    }
});
