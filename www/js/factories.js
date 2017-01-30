ukuleleApp.factory('ChordsFactory', function() {
    return {
        get: function() {
            var chords = [];

            chords.push({
                'name': 'A',
                'french_name': 'LA',
                'chords': {
                    'Major': [{
                        'Fingers': {
                            'C1': '1',
                            'G2': '2',
                        }
                    }]
                }
            });
            chords.push({
                'name': 'Bb', 
                'french_name': 'SI b',
                'chords': {
                    'Major': [{
                        'Fingers': {
                            'A1': '1',
                            'E1': '1',
                            'C2': '2',
                            'G3': '3',
                        }
                    }]
                }
            });
            chords.push({
                'name': 'B', 
                'french_name': 'SI',
                'chords': {
                    'Major': [{
                        'Fingers': {
                            'A2': '1',
                            'E2': '1',
                            'C3': '2',
                            'G4': '3',
                        }
                    }]
                }
            });
            chords.push({
                'name': 'C', 
                'french_name': 'DO',
                'chords': {
                    'Major': [{
                        'Fingers': {
                            'A3': '3',
                        }
                    }]
                }
            });
            chords.push({
                'name': 'Db', 
                'french_name': 'RÉ b',
                'chords': {
                    'Major': [{
                        'Fingers': {
                            'G1': '1',
                            'C1': '1',
                            'E1': '1',
                            'A4': '4',
                        }
                    }]
                }
            });
            chords.push({
                'name': 'D', 
                'french_name': 'RÉ',
                'chords': {
                    'Major': [{
                        'Fingers': {
                            'G2': '1',
                            'C2': '2',
                            'E2': '3',
                        }
                    }]
                }
            });
            chords.push({
                'name': 'Eb', 
                'french_name': 'MI b',
                'chords': {
                    'Major': [{
                        'Fingers': {
                            'A1': '1',
                            'C3': '2',
                            'E3': '3',
                        }
                    }]
                }
            });
            chords.push({
                'name': 'E', 
                'french_name': 'MI',
                'chords': {
                    'Major': [{
                        'Fingers': {
                            'A1': '1',
                            'G4': '2',
                            'C4': '3',
                            'E4': '4',
                        }
                    }]
                }
            });
            chords.push({
                'name': 'F', 
                'french_name': 'Fa',
                'chords': {
                    'Major': [{
                        'Fingers': {
                            'E1': '1',
                            'G2': '2',
                        }
                    }]
                }
            });
            chords.push({
                'name': 'Gb', 
                'french_name': 'SOL b',
                'chords': {
                    'Major': [{
                        'Fingers': {
                            'C1': '1',
                            'A1': '1',
                            'E2': '2',
                            'G3': '3',
                        }
                    }]
                }
            });
            chords.push({
                'name': 'G', 
                'french_name': 'Sol',
                'chords': {
                    'Major': [{
                        'Fingers': {
                            'C2': '1',
                            'A2': '2',
                            'E3': '3',
                        }
                    }]
                }
            });
            chords.push({
                'name': 'Ab', 
                'french_name': 'LA b',
                'chords': {
                    'Major': [{
                        'Position': 'middle',
                        'Fingers': {
                            'C2': '1',
                            'A2': '2',
                            'E3': '3',
                        }
                    }]
                }
            });

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
