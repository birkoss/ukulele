ukuleleApp.factory('ChordsService', function() {
    var chords = [];

    chords.push({
        'name': 'A',
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
        'chords':{
            'Major':[{
                'Fingers':{'G1':'1', 'C1':'1', 'E1':'1', 'A4':'4'}
            }],
            'Minor':[{
                'Mute':['A'],
                'Fingers':{'G1':'1', 'C1':'1'}
            }],
            '7':[{
                'Fingers':{'G1':'1', 'C1':'1', 'E1':'1', 'A2':'2'}
            }]
        }
    });
    chords.push({
        'name':'D', 
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
        
    return {
        all: function() {
            return chords;
        },
        get: function(chord_id) {
            for (var i=0; i<chords.length; i++) {
                if (chords[i].name == chord_id) {
                    return chords[i];
                }
            }
            return null;
        },
        get_french_names: function() {
            var names = {'A':'La', 'B':'Si', 'C':'Do', 'D':'Ré', 'E':'Mi', 'F':'Fa', 'G':'Sol'};
            return names;
        }
    }

});

ukuleleApp.service('ConfigService', function(localStorageService) {
    this.filters = {'chord_type':'Major'};

    this.options = {'show_notes':true, 'show_scale':false, 'show_frets':true, 'show_strings':true, 'show_in_french':false};

    this.save = function(type, config) {
        localStorageService.set(type, config);
    };

    this.load = function(type) {
        var config = (type == 'filters' ? this.filters : this.options);
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
