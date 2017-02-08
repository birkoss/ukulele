ukuleleApp.service('NotesService', function() {
    var notes = [];

    notes.push({
        'name':'C',
    });
    notes.push({
        'name':'C♯',
    });
    notes.push({
        'name':'D♭',
    });
    notes.push({
        'name': 'D',
    });
    notes.push({
        'name':'D♯',
    });
    notes.push({
        'name':'E♭',
    });
    notes.push({
        'name': 'E',
    });
    notes.push({
        'name': 'F',
    });
    notes.push({
        'name':'F♯',
    });
    notes.push({
        'name':'G♭',
    });
    notes.push({
        'name': 'G',
    });
    notes.push({
        'name':'G♯',
    });
    notes.push({
        'name':'A♭',
    });
    notes.push({
        'name': 'A',
    });
    notes.push({
        'name':'A♯',
    });
    notes.push({
        'name':'B♭',
        'direction':'down',
    });
    notes.push({
        'name': 'B',
        'direction':'down',
    });
    notes.push({
        'name':'C',
        'direction':'down',
    });
    notes.push({
        'name':'C♯',
        'direction':'down',
    });
    notes.push({
        'name':'D♭',
        'direction':'down',
    });
    notes.push({
        'name': 'D',
        'direction':'down',
    });
    notes.push({
        'name':'D♯',
        'direction':'down',
    });
    notes.push({
        'name':'E♭',
        'direction':'down',
    });
    notes.push({
        'name': 'E',
        'direction':'down',
    });
    notes.push({
        'name': 'F',
        'direction':'down',
    });
    notes.push({
        'name':'F♯',
        'direction':'down',
    });
    notes.push({
        'name':'G♭',
        'direction':'down',
    });
    notes.push({
        'name': 'G',
        'direction':'down',
    });
    this.all = function() {
        return notes;
    };

    this.get = function(note) {
        for (var i=0; i<notes.length; i++) {
            if (notes[i].name == note) {
                return notes[i];
            }
        }
        return null;
    };
});
ukuleleApp.service('ChordTypesService', function() {
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

    this.all = function() {
        return types;
    };

    this.get = function(chord_type) {
        for (var i=0; i<types.length; i++) {
            if (types[i].name == chord_type) {
                return types[i];
            }
        }
        return null;
    };
});
ukuleleApp.service('ChordsFavoritesService', function(localStorageService, ChordsService) {
    var favorites = [];

    this.all = function() {
        return favorites;
    };

    this.get = function(index) {
        if (index < favorites.length) {
            return favorites[index];
        }
        return null;
    };

    this.getIndex = function(chord_id, chord_type, chord_index) {
        for (var i=0; i<favorites.length; i++) {
            if (favorites[i].chord_id == chord_id && favorites[i].chord_type == chord_type && favorites[i].chord_index == chord_index) {
                return i;
            }
        }
        return -1;
    };

    this.exists = function(chord_id, chord_type, chord_index) {
        return (this.getIndex(chord_id, chord_type, chord_index) >= 0);
    };

    this.add = function (chord_id, chord_type, chord_index) {
        var favorite = {'chord_id':chord_id, 'chord_type':chord_type, 'chord_index':chord_index};

        if (!this.exists(chord_id, chord_type, chord_index)) {
            favorites.push(favorite);
            this.generate();
            this.save();
        }
    };

    this.remove = function(index) {
        favorites.splice(favorites.indexOf(index), 1);
        this.save();
    };

    this.save = function() {
        var striped_favorites = favorites.slice(0);

        for (var i=0; i<striped_favorites.length; i++) {
            delete striped_favorites.chord;
        }
        
        localStorageService.set('chords_favorites', striped_favorites);
    };

    this.load = function() {
        if (localStorageService.get('chords_favorites')) {
            favorites = localStorageService.get('chords_favorites');
        }
        this.generate();
    };

    this.generate = function() {
        for (var i=0; i<favorites.length; i++) {
            favorites[i].chord = ChordsService.get(favorites[i].chord_id);
        }
    };

    this.load();
});

ukuleleApp.service('ChordsService', function(ChordTypesService, ConfigService) {

    var scales = ['A', 'A♯/B♭', 'B', 'C', 'C♯/D♭', 'D', 'D♯/E♭', 'E', 'F', 'F♯/G♭', 'G', 'G♯/A♭'];

    var chords = [];

    chords.push({
        'name': 'A',
        'types': {
            'Major': {
                'chords': [{
                    'Fingers':{'C1':'1', 'G2':'2'}
                },{
                    'Position':'middle',
                    'Start':2,
                    'Fingers':{'G2':'1', 'C4':'2', 'E5':'4', 'A4':'3'} 
                },{
                    'Position':'middle',
                    'Start':3,
                    'Fingers':{'G6':'3', 'C4':'1', 'E5':'2', 'A4':'1'}
                },{
                    'Position':'middle',
                    'Start':6,
                    'Fingers':{'G9':'3', 'C9':'3', 'E9':'3', 'A7':'1'}
                },{
                    'Position':'middle',
                    'Start':9,
                    'Fingers':{'G9':'1', 'C9':'1', 'E9':'1', 'A12':'4'} 
                }]
            }, 
            'Minor': {
                'chords': [{
                    'Fingers':{'G2':'2'}
                },{
                    'Position':'middle',
                    'Start':2,
                    'Fingers':{'G2':'1', 'C4':'3', 'E5':'4', 'A3':'2'}
                },{
                    'Position':'middle',
                    'Start':2,
                    'Fingers':{'G5':3, 'C4':2, 'E5':4, 'A3':1}
                },{
                    'Position':'middle',
                    'Start':4,
                    'Fingers':{'G5':2, 'C4':1, 'E5':3, 'A7':4}
                },{
                    'Position':'middle',
                    'Start':7,
                    'Fingers':{'G9':3, 'C9':4, 'E8':2, 'A7':1}
                }]
            },
            '7': {
                'chords': [{
                    'Fingers':{'C1':'1'}
                }]
            }
        }
    });
    chords.push({
        'name': 'B♭',
        'alt_name':'A♯',
        'types': {
            'Major': {
                'chords': [{
                    'Fingers':{'A1':'1', 'E1':'1', 'C2':'2', 'G3':'3'}
                }]
            },
            'Minor': {
                'chords': [{
                    'Fingers':{'G3':'3', 'C1':'1', 'E1':'1', 'A1':'1'}
                },{
                    'Position':'middle',
                    'Start':5,
                    'Fingers':{'G6':2, 'C5':1, 'E6':3, 'A8':4}
                },{
                    'Position':'middle',
                    'Start':7,
                    'Fingers':{'G10':3, 'C10':4, 'E9':2, 'A8':1}
                }]
            },
            '7': {
                'chords': [{
                    'Fingers':{'G1':'1', 'C2':'2', 'E1':'1', 'A1':'1'}
                }]
            }
        }
    });
    chords.push({
        'name':'B',
        'types':{
            'Major':{
                'chords': [{
                    'Fingers':{'A2':'1', 'E2':'1', 'C3':'2', 'G4':'3'}
                },{
                    'Position':'middle',
                    'Start':5,
                    'Fingers':{'G8':'3', 'C6':'1', 'E7':'2', 'A6':'1'} 
                },{
                    'Position':'middle',
                    'Start':8,
                    'Fingers':{'G11':'3', 'C11':'3', 'E11':'3', 'A8':'1'}
                }]
            },
            'Minor':{
                'chords': [{
                    'Fingers':{'G4':'3', 'C2':'2', 'E2':'2', 'A2':'2'}
                },{
                    'Position':'middle',
                    'Start':4,
                    'Fingers':{'G4':1, 'C6':3, 'E7':4, 'A5':2}
                },{
                    'Position':'middle',
                    'Start':5,
                    'Fingers':{'G7':3, 'C6':2, 'E7':4, 'A5':1}
                },{
                    'Position':'middle',
                    'Start':6,
                    'Fingers':{'G7':2, 'C6':1, 'E7':3, 'A9':4}
                },{
                    'Position':'middle',
                    'Start':9,
                    'Fingers':{'G11':3, 'C11':4, 'E10':2, 'A9':1}
                }]
            },
            '7': {
                'chords': [{
                    'Fingers':{'G2':'1', 'C3':'2', 'E2':'1', 'A2':'1'}
                }]
            }
        }
    });
    chords.push({
        'name':'C',
        'types':{
            'Major':{
                'chords': [{
                    'Fingers':{'A3':'3'}
                },{
                    'Position':'middle',
                    'Start':2,
                    'Fingers':{'G5':'3', 'C4':'2', 'E3':'1', 'A3':'1'}
                },{
                    'Position':'middle',
                    'Start':5,
                    'Fingers':{'G5':'1', 'C7':'2', 'E8':'4', 'A7':'3'}
                }]
            },
            'Minor':{
                'chords': [{
                    'Fingers':{'C3':'1', 'E3':'1', 'A3':'1'}
                },{
                    'Position':'middle',
                    'Start':3,
                    'Fingers':{'G5':3, 'C3':1, 'E3':1, 'A3':1}
                },{
                    'Position':'middle',
                    'Start':5,
                    'Fingers':{'G5':1, 'C7':3, 'E8':4, 'A6':2}
                },{
                    'Position':'middle',
                    'Start':5,
                    'Fingers':{'G8':3, 'C7':2, 'E8':4, 'A6':1}
                },{
                    'Position':'middle',
                    'Start':7,
                    'Fingers':{'G8':2, 'C7':1, 'E8':3, 'A10':4}
                }]
            },
            '7': {
                'chords': [{
                    'Fingers':{'A1':'1'}
                }]
            }
        }
    });
    chords.push({
        'name':'D♭',
        'alt_name':'C♯',
        'types':{
            'Major':{
                'chords': [{
                    'Fingers':{'G1':'1', 'C1':'1', 'E1':'1', 'A4':'4'}
                },{
                    'Position':'middle',
                    'Start':3,
                    'Fingers':{'G6':'3', 'C5':'2', 'E4':'1', 'A4':'1'}
                }/*,{
                    'Position':'middle',
                    'Start':4,
                    'Fingers':{'G6':'3', 'C5':'2', 'E4':'1', 'A8':'4'} 
                }*/,{
                    'Position':'middle',
                    'Start':6,
                    'Fingers':{'G6':'1', 'C8':'2', 'E9':'4', 'A8':'3'}
                },{
                    'Position':'middle',
                    'Start':7,
                    'Fingers':{'G10':'3', 'C8':'1', 'E9':'2', 'A8':'1'}
                }]
            },
            'Minor':{
                'chords': [{
                    'Mute':['A'],
                    'Fingers':{'G1':'1', 'C1':'1'}
                },{
                    'Fingers':{'G1':1, 'C4':3, 'E4':3, 'A4':3}
                },{
                    'Position':'middle',
                    'Start':3,
                    'Fingers':{'G6':3, 'C4':1, 'E4':1, 'A4':1}
                },{
                    'Position':'middle',
                    'Start':4,
                    'Fingers':{'G6':3, 'C4':1, 'E4':1, 'A7':4}
                },{
                    'Position':'middle',
                    'Start':6,
                    'Fingers':{'G6':1, 'C8':3, 'E9':4, 'A7':2}
                },{
                    'Position':'middle',
                    'Start':7,
                    'Fingers':{'G9':3, 'C8':2, 'E9':4, 'A7':1}
                }]
            },
            '7':{
                'chords': [{
                    'Fingers':{'G1':'1', 'C1':'1', 'E1':'1', 'A2':'2'}
                }]
            }
        }
    });
    chords.push({
        'name':'D',
        'types':{
            'Major':{
                'chords': [{
                    'Fingers':{'G2':'1', 'C2':'2', 'E2':'3'}
                },{
                    'Position':'middle',
                    'Start':2,
                    'Fingers':{'G2':'1', 'C2':'1', 'E2':'1', 'A5':'4'}
                },{
                    'Position':'middle',
                    'Start':4,
                    'Fingers':{'G7':'3', 'C6':'2', 'E5':'1', 'A5':'1'} 
                },{
                    'Position':'middle',
                    'Start':7,
                    'Fingers':{'G7':'1', 'C9':'2', 'E10':'4', 'A9':'3'}
                }/*,{
                   'Position':'middle',
                   'Start':5,
                    'Fingers':{'G7':'3', 'C6':'2', 'E5':'1', 'A9':'4'}
                }*/]
            },
            'Minor':{
                'chords': [{
                    'Fingers':{'G2':'2', 'C2':'3', 'E1':'1'}
                },{
                    'Position':'middle',
                    'Start':2,
                    'Fingers':{'G2':1, 'C5':4, 'E5':4, 'A5':4}
                },{
                    'Position':'middle',
                    'Start':4,
                    'Fingers':{'G7':3, 'C5':1, 'E5':1, 'A5':1}
                },{
                    'Position':'middle',
                    'Start':5,
                    'Fingers':{'G7':3, 'C5':1, 'E5':1, 'A8':4}
                },{
                    'Position':'middle',
                    'Start':7,
                    'Fingers':{'G7':1, 'C9':3, 'E10':4, 'A8':2}
                },{
                    'Position':'middle',
                    'Start':8,
                    'Fingers':{'G10':3, 'C9':2, 'E10':4, 'A8':1}
                }]
            },
            '7':{
                'chords': [{
                    'Fingers':{'G2':'1', 'C2':'1', 'E2':'1', 'A3':'2'}
                }]
            }
        }
    });
    chords.push({
        'name':'E♭',
        'alt_name':'D♯',
        'types':{
            'Major':{
                'chords': [{
                    'Fingers':{'A1':'1', 'C3':'2', 'E3':'3'}
                },{
                    'Position':'middle',
                    'Start':3,
                    'Fingers':{'G3':'1', 'C3':'1', 'E3':'1', 'A6':'4'}
                },{
                    'Position':'middle',
                    'Start':5,
                    'Fingers':{'G8':'3', 'C7':'2', 'E6':'1', 'A6':'1'}
                }]
            },
            'Minor':{
                'chords': [{
                    'Fingers':{'G3':'3', 'C3':'4', 'E2':'2', 'A1':'1'}
                },{
                    'Position':'middle',
                    'Start':3,
                    'Fingers':{'G3':1, 'C6':3, 'E6':3, 'A6':3}
                },{
                    'Position':'middle',
                    'Start':6,
                    'Fingers':{'G8':3, 'C6':1, 'E6':1, 'A6':1}
                }]
            },
            '7':{
                'chords': [{
                    'Position':'middle',
                    'Start':2,
                    'Fingers':{'G3':'1', 'C3':'1', 'E3':'1', 'A4':'2'}
                }]
            }
        }
    });
    chords.push({
        'name':'E',
        'types':{
            'Major':{
                'chords': [{
                    'Fingers':{'A2':'1', 'G4':'2', 'C4':'3', 'E4':'4'}
                },{
                    'Fingers':{'G1':'1', 'C4':'4', 'A2':'2'}
                },{
                    'Position':'middle',
                    'Start':4,
                    'Fingers':{'G4':'1', 'C4':'1', 'E4':'1', 'A7':'4'}
                },{
                    'Position':'middle',
                    'Start':6,
                    'Fingers':{'G9':'3', 'C8':'2', 'E7':'1', 'A7':'1'}
                }]
            },
            'Minor':{
                'chords': [{
                    'Fingers':{'C4':'3', 'E3':'2', 'A2':'1'}
                },{
                    'Fingers':{'C4':4, 'A2':2}
                },{
                    'Fingers':{'G4':3, 'C4':4, 'E3':2, 'A2':1}
                },{
                    'Position':'middle',
                    'Start':4,
                    'Fingers':{'G4':1, 'E7':3, 'C7':3, 'A7':3}
                },{
                    'Position':'middle',
                    'Start':6,
                    'Fingers':{'G9':3, 'C7':1, 'E7':1, 'A7':1}
                }]
            },
            '7':{
                'chords': [{
                    'Fingers':{'G1':'1', 'C2':'2', 'A2':'3'}
                }]
            }
        }
    });
    chords.push({
        'name':'F',
        'types':{
            'Major':{
                'chords': [{
                    'Fingers':{'E1':'1', 'G2':'2'}
                },{
                    'Fingers':{'G2':'2', 'E1':'1', 'A3':'3'}
                },{
                    'Position':'middle',
                    'Start':2,
                    'Fingers':{'G5':'2', 'C5':'3', 'E5':'4', 'A3':'1'}
                },{
                    'Position':'middle',
                    'Start':5,
                    'Fingers':{'G5':'1', 'C5':'1', 'E5':'1', 'A8':'4'}
                },{
                    'Position':'middle',
                    'Start':7,
                    'Fingers':{'G10':'3', 'C9':'2', 'E8':'1', 'A8':'1'}
                }]
            },
            'Minor':{
                'chords': [{
                    'Fingers':{'G1':'1', 'E1':'2', 'A3':'4'}
                },{
                    'Position':'middle',
                    'Start':2,
                    'Fingers':{'G5':3, 'C5':4, 'E4':2, 'A3':1}
                },{
                    'Position':'middle',
                    'Start':5,
                    'Fingers':{'G5':1, 'C8':3, 'E8':3, 'A8':3}
                },{
                    'Position':'middle',
                    'Start':7,
                    'Fingers':{'G10':3, 'C8':1, 'E8':1, 'A8':1}
                }]
            },
            '7':{
                'chords': [{
                    'Fingers':{'G2':'2', 'C3':'3', 'E1':'1', 'A3':'4'}
                }]
            }
        }
    });
    chords.push({
        'name':'G♭',
        'alt_name':'F♯',
        'types':{
            'Major':{
                'chords': [{
                    'Fingers':{'C1':'1', 'A1':'1', 'E2':'2', 'G3':'3'}
                },{
                    'Fingers':{'G3':'3', 'C1':'1', 'E2':'2', 'A4':'4'}
                },{
                    'Position':'middle',
                    'Start':3,
                    'Fingers':{'G3':'1', 'C6':'3', 'E6':'4', 'A4':'2'}
                },{
                    'Position':'middle',
                    'Start':3,
                    'Fingers':{'G6':'2', 'C6':'3', 'E6':'4', 'A4':'1'}
                },{
                    'Position':'middle',
                    'Start':6,
                    'Fingers':{'G6':'1', 'C6':'1', 'E6':'1', 'A9':'4'}
                },{
                    'Position':'middle',
                    'Start':8,
                    'Fingers':{'G11':'3', 'C10':'2', 'E9':'1', 'A9':'1'}
                }]
            },
            'Minor':{
                'chords': [{
                    'Fingers':{'G2':'2', 'C1':'1', 'E2':'3'}
                },{
                    'Fingers':{'G2':2, 'C1':1, 'E2':3, 'A4':4}
                },{
                    'Position':'middle',
                    'Start':3,
                    'Fingers':{'G6':3, 'C6':4, 'E5':2, 'A4':1}
                },{
                    'Position':'middle',
                    'Start':6,
                    'Fingers':{'G6':1, 'C9':3, 'E9':3, 'A9':3}
                }]
            },
            '7':{
                'chords': [{
                    'Fingers':{'G3':'2', 'C4':'3', 'E2':'1', 'A4':'4'}
                }]
            }
        }
    });
    chords.push({
        'name':'G',
        'types':{
            'Major':{
                'chords': [{
                    'Fingers':{'C2':'1', 'A2':'2', 'E3':'3'}
                },{
                    'Fingers':{'G4':'3', 'C2':'1', 'E3':'2', 'A2':'1'}
                },{
                    'Position':'middle',
                    'Start':2,
                    'Fingers':{'G4':'3', 'C2':'1', 'E3':'2', 'A5':'4'}
                },{
                    'Position':'middle',
                    'Start':4,
                    'Fingers':{'G7':'2', 'C7':'3', 'E7':'4', 'A5':'1'} 
                },{
                    'Position':'middle',
                    'Start':7,
                    'Fingers':{'G7':'1', 'C7':'1', 'E7':'1', 'A10':'4'}
                }]
            },
            'Minor':{
                'chords': [{
                    'Fingers':{'C2':'2', 'E3':'3', 'A1':'1'}
                },{
                    'Position':'middle',
                    'Start':2,
                    'Fingers':{'G3':2, 'C2':1, 'E3':3, 'A5':4}
                },{
                    'Fingers':{'G3':3, 'C2':2, 'E3':4, 'A1':1}
                },{
                    'Position':'middle',
                    'Start':4,
                    'Fingers':{'G7':3, 'C7':4, 'E6':2, 'A5':1}
                }]
            },
            '7':{
                'chords': [{
                    'Fingers':{'C2':'2', 'E1':'1', 'A2':'3'}
                }]
            }
        }
    });
    chords.push({
        'name':'A♭',
        'alt_name':'G♯',
        'types':{
            'Major':{
                'chords': [{
                    'Position':'middle',
                    'Start':2,
                    'Fingers':{'C3':'1', 'A3':'1', 'E4':'2', 'G5':'4'}
                },{
                    'Fingers':{'G1':'1', 'C3':'2', 'E4':'4', 'A3':'3'}
                },{
                    'Position':'middle',
                    'Start':5,
                    'Fingers':{'G8':'2', 'C8':'3', 'E8':'4', 'A6':'1'}
                }]
            },
            'Minor':{
                'chords': [{
                    'Fingers':{'G4':'3', 'C3':'2', 'E4':'4', 'A2':'1'}
                },{
                    'Fingers':{'G1':1, 'C3':3, 'E4':4, 'A2':2}
                },{
                    'Position':'middle',
                    'Start':3,
                    'Fingers':{'G4':2, 'C3':1, 'E4':3, 'A6':4}
                },{
                    'Position':'middle',
                    'Start':6,
                    'Fingers':{'G8':3, 'C8':4, 'E7':2, 'A6':1}
                }]
            },
            '7':{
                'chords': [{
                    'Fingers':{'G1':'1', 'C3':'3', 'E2':'2', 'A3':'4'}
                }]
            }
        }
    });

    this.init = function() {
        for (var c=0; c<chords.length; c++) {

            chords[c].getLayout = function(chord_type, chord_index) {
                if (chord_index == undefined) {
                    chord_index = 0;
                }
                return this.types[chord_type].chords[chord_index].layout;
            };
            for (var chord_type in chords[c]['types']) {
                chords[c]['types'][chord_type]['scale'] = this.buildScale(chords[c].name, chord_type);
                for (var c2=0; c2<chords[c]['types'][chord_type]['chords'].length; c2++) {
                    chords[c]['types'][chord_type]['chords'][c2]['layout'] = this.generate(chords[c].name, chord_type, c2);
                }
            }
        }
    };
    this.all = function() {
        return chords;
    };

    this.get = function(chord_id) {
        for (var i=0; i<chords.length; i++) {
            if (chords[i].name == chord_id) {
                return chords[i];
            }
        }
        return null;
    };

    this.get_french_names = function() {
        var names = {'A':'La', 'B':'Si', 'C':'Do', 'D':'Ré', 'E':'Mi', 'F':'Fa', 'G':'Sol'};
        return names;
    };

    this.generate = function(chord_id, chord_type, chord_index) {
        var chord = this.get(chord_id);
        var scale = this.buildScale(chord_id, chord_type);

        // Build all available chords for this chord (and chord type)
        var chord_single_chord = chord.types[chord_type]['chords'][chord_index];

        var single_chord = {};
        single_chord['index'] = chord_index;

        single_chord['notes'] = {'G':'G', 'C':'C', 'E':'E', 'A':'A'};
        single_chord['frets'] = {'G': 0, 'C': 0, 'E': 0, 'A': 0};

        single_chord['fret_position'] = (chord_single_chord['Position'] == undefined ? 'top' : chord_single_chord['Position']);

        // Place the correct fret labels (depending on the start position)
        var fret_start = (chord_single_chord['Start'] == undefined ? 1 : chord_single_chord['Start']);
        single_chord['fret_labels'] = [];
        for (var i=0; i<4; i++) {
            single_chord['fret_labels'].push(i+fret_start);
        }

        // Place the finger on the fret (depending on the start position)
        single_chord['fret_fingers'] = {};
        for (finger_position in chord_single_chord['Fingers']) {
            var finger = chord_single_chord['Fingers'][finger_position];
            var position = parseInt(finger_position.substr(1));
            if (fret_start > 1) {
                position -= (fret_start-1);
            }
            single_chord['fret_fingers'][ finger_position.substr(0,1) + position ] = finger;
        }

        // Double scales to help us loop through it
        var doubled_scales = scales.concat(scales);

        // Show the notes and fingers for that chord
        for (var finger_position in chord_single_chord['Fingers']) {
            var string = finger_position.substr(0, 1);
            var fret = parseInt(finger_position.substr(1));

            // Place notes
            for (var i=0; i<doubled_scales.length; i++) {
                if (doubled_scales[i] == string) {
                    single_chord['notes'][string] = doubled_scales[i + fret];
                    if (single_chord['notes'][string].indexOf('/') >= 0) {
                        var parts = single_chord['notes'][string].split('/');
                        single_chord['notes'][string] = (scale.indexOf(parts[0]) >= 0 ? parts[0] : parts[1]);
                    }
                    break;
                }
            }

            // Place frets position
            if (fret > single_chord['frets'][string]) {
                single_chord['frets'][string] = fret;
            }

            // Check if this current chord is favorited
            //single_chord['favorited'] = ChordsFavorites.exists(chord_id, chord_type, chord_index);
        }

        // Mute strings
        single_chord['muted'] = {};
        if (chord_single_chord['Mute'] != undefined) {
            for (var i=0; i<chord_single_chord['Mute'].length; i++) {
                single_chord['muted'][ chord_single_chord['Mute'][i] ] = true;
                single_chord['notes'][chord_single_chord['Mute'][i]] = 'X';
                single_chord['frets'][chord_single_chord['Mute'][i]] = ' ';
            }
        }

        return single_chord;
    };

    this.buildScale = function(chord_id, chord_type) {
        var single_chord_type = ChordTypesService.get(chord_type);

        // Double scales to help us loop through it
        var doubled_scales = scales.concat(scales);

        // Find the complete scale for this chord
        // - Cannot have both flat and charp in the same scale
        // - Cannot repeat a note
        var current_scale = [];
        for (var i=0; i<doubled_scales.length; i++) {
            // Start with the correct chord
            if (doubled_scales[i] == chord_id || doubled_scales[i].split('/').indexOf(chord_id) >= 0) {
                current_scale.push(chord_id);
                for (var j=0; j<single_chord_type.scale.length; j++) {
                    i += single_chord_type.scale[j];
                    var inline_scales = doubled_scales[i].split('/');
                    var scale = inline_scales[0];
                    if (inline_scales.length > 1) {
                        // Choose the best note if it's a dual note (charp/flat)

                        // If the previous note start with the same letter, use the flat
                        if (current_scale[current_scale.length-1].substr(0, 1) == scale.substr(0, 1)) {
                            scale = inline_scales[1];
                        }

                        // If the first note is a flat, use a flat
                        if (chord_id.substr(1, 1) == '♭') {
                            scale = inline_scales[1];
                        }
                    } else {
                        // Special case where a Cb (instead of B) or a E# (instead of F) may be required...
                        if (scale == 'B' || scale == 'F') {
                            var scale_special_case = {'B': 'Cb', 'F': 'E#'};
                            if (current_scale[current_scale.length-1].substr(0, 1) == scale) {
                                scale = scale_special_case[scale];
                            }
                        }
                    }

                    current_scale.push( scale );
                }
                break;
            }
        }

        return current_scale;
    };


    this.init();
});

ukuleleApp.service('ConfigService', function(localStorageService, ChordTypesService) {
    this.filters = {'chord_type':'Major'};

    this.options = {'show_notes':true, 'show_scale':false, 'show_frets':true, 'show_strings':true, 'show_in_french':false};

    this.quiz_options = {'show_in_french':false};

    this.notes_options = {'show_flat_sharp':false, 'show_in_french':false};
    this.notes_quiz_options = {'include_flat_sharp':false, 'show_in_french':false};

    this.save = function(type, config) {
        localStorageService.set(type, config);
    };

    this.load = function(type) {
        var config = null;
        switch (type) {
            case 'filters':
                config = this.filters;
                break;
            case 'options':
                config = this.options;
                break;
            case 'quiz_options':
                for (var type_index in ChordTypesService.all()) {
                    this.quiz_options['include_type_' + ChordTypesService.all()[type_index].name] = false;
                }
                this.quiz_options['include_type_Major'] = true;
                this.quiz_options['include_type_Minor'] = true;
                config = this.quiz_options;
                break;
            case 'notes_options':
                config = this.notes_options;
                break;
            case 'notes_quiz_options':
                config = this.notes_quiz_options;
                break;
        }
        if (localStorageService.get(type)) {
            config = this.merge(config, localStorageService.get(type));
        }
        return config;
    };

    this.merge = function(target, varArgs) { // .length of function is 2
        'use strict';
        if (target == null) { // TypeError if undefined or null
            throw new TypeError('Cannot convert undefined or null to object');
        }

        var to = Object(target);

        for (var index = 1; index < arguments.length; index++) {
            var nextSource = arguments[index];

            if (nextSource != null) { // Skip over if undefined or null
                for (var nextKey in nextSource) {
                    // Avoid bugs when hasOwnProperty is shadowed
                    if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
                        to[nextKey] = nextSource[nextKey];
                    }
                }
            }
        }
        return to;
    };
});
