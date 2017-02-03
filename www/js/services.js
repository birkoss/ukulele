ukuleleApp.service('ChordsFavorites', function(localStorageService) {
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

    this.add = function (chord_id, chord_type, chord_index) {
        var favorite = {'chord_id':chord_id, 'chord_type':chord_type, 'chord_index':chord_index};

        if (favorites.indexOf(favorite) == -1) {
            favorites.push(favorite);
            this.save();
        }
    };

    this.remove = function(index) {
        favorites.splice(favorites.indexOf(index), 1);
        this.save();
    };

    this.save = function() {
        localStorageService.set('chords_favorites', favorites);
    };

    this.load = function() {
        if (localStorageService.get('chords_favorites')) {
            favorites = localStorageService.get('chords_favorites');
        }
    }

    this.load();
});

ukuleleApp.factory('ChordsService', function(ChordTypesFactory, ConfigService) {

    var scales = ['A', 'A♯/B♭', 'B', 'C', 'C♯/D♭', 'D', 'D♯/E♭', 'E', 'F', 'F♯/G♭', 'G', 'G♯/A♭'];

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
        },
        generate: function(chord_id, chord_type, chord_index) {
            var chord = this.get(chord_id);
            var scale = this.buildScale(chord_id, chord_type);

            // Build all available chords for this chord (and chord type)
            var chord_single_chord = chord.chords[ConfigService.load('filters')['chord_type']][chord_index];

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
                var position = parseInt(finger_position.substr(1, 1));
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
                var fret = parseInt(finger_position.substr(1, 1));

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
        },
        buildScale: function(chord_id, chord_type) {
            var single_chord_type = ChordTypesFactory.get(chord_type);

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
