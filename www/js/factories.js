ukuleleApp.factory('ChordsFactory', function() {
    return {
        get: function() {
            var chords = [];

            chords.push({
                'name': 'A',
                'french_name': 'LA',
                'chords': {
                    'Major': [{
                        'Fingers':{'C1':'1', 'G2':'2'}
                    }],
                    'Minor': [{
                        'Fingers':{'G2':'2'}
                    }],
                    '7': [{
                        'Fingers':{'C1':'1'}
                    }]
                }
            });
            chords.push({
                'name': 'B♭', 
                'alt_name':'A♯',
                'french_name': 'SI b',
                'chords': {
                    'Major': [{
                        'Fingers':{'A1':'1', 'E1':'1', 'C2':'2', 'G3':'3'}
                    }],
                    'Minor': [{
                        'Fingers':{'G3':'3', 'C1':'1', 'E1':'1', 'A1':'1'}
                    }],
                    '7': [{
                        'Fingers':{'G1':'1', 'C2':'2', 'E1':'1', 'A1':'1'}
                    }]
                }
            });
            chords.push({
                'name':'B', 
                'french_name':'SI',
                'chords':{
                    'Major':[{
                        'Fingers':{'A2':'1', 'E2':'1', 'C3':'2', 'G4':'3'}
                    }],
                    'Minor':[{
                        'Fingers':{'G4':'3', 'C2':'2', 'E2':'2', 'A2':'2'}
                    }],
                    '7': [{
                        'Fingers':{'G2':'1', 'C3':'2', 'E2':'1', 'A2':'1'}
                    }]
                }
            });
            chords.push({
                'name':'C', 
                'french_name':'DO',
                'chords':{
                    'Major':[{
                        'Fingers':{'A3':'3'}
                    }],
                    'Minor':[{
                        'Fingers':{'C3':'1', 'E3':'1', 'A3':'1'}
                    }],
                    '7': [{
                        'Fingers':{'A1':'1'}
                    }]
                }
            });
            chords.push({
                'name':'D♭', 
                'alt_name':'C♯',
                'french_name':'RÉ b',
                'chords':{
                    'Major':[{
                        'Fingers':{'G1':'1', 'C1':'1', 'E1':'1', 'A4':'4'}
                    }],
                    'Minor':[{
                        // @TODO Should disable the A string
                        'Fingers':{'G1':'1', 'C1':'1'}
                    }],
                    '7':[{
                        'Fingers':{'G1':'1', 'C1':'1', 'E1':'1', 'A2':'2'}
                    }]
                }
            });
            chords.push({
                'name':'D', 
                'french_name':'RÉ',
                'chords':{
                    'Major':[{
                        'Fingers':{'G2':'1', 'C2':'2', 'E2':'3'}
                    }],
                    'Minor':[{
                        'Fingers':{'G2':'2', 'C2':'3', 'E1':'1'}
                    }],
                    '7':[{
                        'Fingers':{'G2':'1', 'C2':'1', 'E2':'1', 'A3':'2'}
                    }]
                }
            });
            chords.push({
                'name':'E♭', 
                'alt_name':'D♯',
                'french_name':'MI b',
                'chords':{
                    'Major':[{
                        'Fingers':{'A1':'1', 'C3':'2', 'E3':'3'}
                    }],
                    'Minor':[{
                        'Fingers':{'G3':'3', 'C3':'4', 'E2':'2', 'A1':'1'}
                    }],
                    '7':[{
                        'Position':'middle',
                        'Start':2,
                        'Fingers':{'G3':'1', 'C3':'1', 'E3':'1', 'A4':'2'}
                    }]
                }
            });
            chords.push({
                'name':'E', 
                'french_name':'MI',
                'chords':{
                    'Major':[{
                        'Fingers':{'A1':'1', 'G4':'2', 'C4':'3', 'E4':'4'}
                    }],
                    'Minor':[{
                        'Fingers':{'C4':'3', 'E3':'2', 'A2':'1'}
                    }],
                    '7':[{
                        'Fingers':{'G1':'1', 'C2':'2', 'A2':'3'}
                    }]
                }
            });
            chords.push({
                'name':'F', 
                'french_name':'Fa',
                'chords':{
                    'Major':[{
                        'Fingers':{'E1':'1', 'G2':'2'}
                    }],
                    'Minor':[{
                        'Fingers':{'G1':'1', 'E1':'2', 'A3':'4'}
                    }],
                    '7':[{
                        'Fingers':{'G2':'2', 'C3':'3', 'E1':'1', 'A3':'4'}
                    }]
                }
            });
            chords.push({
                'name':'G♭', 
                'alt_name':'F♯',
                'french_name':'SOL b',
                'chords':{
                    'Major':[{
                        'Fingers':{'C1':'1', 'A1':'1', 'E2':'2', 'G3':'3'}
                    }],
                    'Minor':[{
                        'Fingers':{'G2':'2', 'C1':'1', 'E2':'3'}
                    }],
                    '7':[{
                        'Fingers':{'G3':'2', 'C4':'3', 'E2':'1', 'A4':'4'}
                    }]
                }
            });
            chords.push({
                'name':'G', 
                'french_name':'Sol',
                'chords':{
                    'Major':[{
                        'Fingers':{'C2':'1', 'A2':'2', 'E3':'3'}
                    }],
                    'Minor':[{
                        'Fingers':{'C2':'2', 'E3':'3', 'A1':'1'}
                    }],
                    '7':[{
                        'Fingers':{'C2':'2', 'E1':'1', 'A2':'3'}
                    }]
                }
            });
            chords.push({
                'name':'A♭', 
                'alt_name':'G♯',
                'french_name':'LA b',
                'chords':{
                    'Major':[{
                        'Position':'middle',
                        'Start':2,
                        'Fingers':{'C3':'1', 'A3':'1', 'E4':'2', 'G5':'4'}
                    }],
                    'Minor':[{
                        'Fingers':{'G4':'3', 'C3':'2', 'E4':'4', 'A2':'1'}
                    }],
                    '7':[{
                        'Fingers':{'G1':'1', 'C3':'3', 'E2':'2', 'A3':'4'}
                    }]
                }
            });

            return chords;
        },
        get_french_names: function() {
            var names = {'A':'La', 'B':'Si', 'C':'Do', 'D':'Ré', 'E':'Mi', 'F':'Fa', 'G':'Sol'};
            return names;
        }
    }

});

ukuleleApp.factory('ChordTypesFactory', function() {
    return {
        get: function(chord_type) {
            var types = [];

            types.push({
                'name': 'Major',
                'chord': 'Triad',
                'scale': [2, 2, 1, 2, 2, 2, 1],
                'scale_parts': [1, 3, 5],
            });
            types.push({
                'name': 'Minor',
                'chord': 'Triad',
                'scale': [2, 1, 2, 2, 1, 2, 2],
                'scale_parts': [1, 3, 5],
            });
            types.push({
                'name': '7',
                'chord': 'Seventh',
                'scale': [2, 2, 1, 2, 2, 1, 1],
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
