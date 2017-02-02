ukuleleApp.controller('ChordsList', function($scope, $filter, $ionicModal, $ionicSideMenuDelegate, ChordsFactory, ChordTypesFactory, ConfigService) {

    $scope.filters = ConfigService.load('filters');

    $scope.options = ConfigService.load('options');

    $scope.chords = ChordsFactory.get();
    $scope.chord_types = ChordTypesFactory.get();

    $scope.chord_families = {};
    for (var i=0; i<$scope.chord_types.length; i++) {
        if ($scope.chord_families[$scope.chord_types[i].chord] == undefined) {
            $scope.chord_families[$scope.chord_types[i].chord] = [];
        }
        $scope.chord_families[$scope.chord_types[i].chord].push($scope.chord_types[i].name);
    }

    $scope.scales = ['A', 'A♯/B♭', 'B', 'C', 'C♯/D♭', 'D', 'D♯/E♭', 'E', 'F', 'F♯/G♭', 'G', 'G♯/A♭'];

    $scope.chords_list = [];

    /* Prepare the chord detail modal */
    $ionicModal.fromTemplateUrl('chord-detail.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function(modal) {
        $scope.modal_chord_detail = modal;
    });

    /* Generate the chords list (depending of the current chord type, and the language) */
    $scope.generateChordsList = function() {
        var single_chord_type = ChordTypesFactory.get($scope.filters['chord_type']);

        var list = [];
        for (var i=0; i<$scope.chords.length; i++) {
            var single_chord = $scope.chords[i];

            var chord = {
                'id':single_chord.name,
                'name':$filter('replaceName')(single_chord.name)+single_chord_type.suffix,
            };

            if (single_chord.alt_name) {
                chord['alt_name'] = $filter('replaceName')(single_chord.alt_name)+single_chord_type.suffix;
            }
            
            // Only add chords having that type available
            if (single_chord.chords[$scope.filters['chord_type']] != undefined) {
                // Can only build the chord if it's available in the current chord type...
                chord['first_chord'] = $scope.buildChord(single_chord.name, $scope.filters['chord_type'], 0);
                list.push(chord);
            }
        }
        $scope.chords_list = list;
    }

    /* Show/Hide chord detail in a modal */
    $scope.showChord = function(chord_id) {
        var single_chord_type = ChordTypesFactory.get($scope.filters['chord_type']);

        var chord = $scope.getChordById(chord_id);

        // The current chord from ChordFactory
        $scope.current_chord = {
            'name':$filter('replaceName')(chord.name) + single_chord_type.suffix,
        };

        if (chord.alt_name) {
            $scope.current_chord['alt_name'] = $filter('replaceName')(chord.alt_name) + single_chord_type.suffix;
        }
       

        $scope.strings = ['G', 'C', 'E', 'A'];
        $scope.scale_parts = single_chord_type.scale_parts;

        $scope.current_scale = $scope.buildScale(chord.name, $scope.filters['chord_type']);

        var chords = [];
        for (var c=0; c<chord.chords[ $scope.filters['chord_type'] ].length; c++) {
            var single_chord = $scope.buildChord(chord_id, $scope.filters['chord_type'], c);
            chords.push(single_chord);
        }

        $scope.current_chords = chords;

        $scope.modal_chord_detail.show();
    };

    /* Hide the modal */
    $scope.hideChord = function() {
        $scope.current_chord = null;

        $scope.modal_chord_detail.hide();
    }

    /* Toggle the filters side-menu (from the button) */
    $scope.showChordTypes = function() {
        $ionicSideMenuDelegate.toggleRight();
    };

    /* Toggle the options side-menu (from the button) */
    $scope.showOptions = function() {
        $ionicSideMenuDelegate.toggleLeft();
    };

    /* Called when a config has changed */
    $scope.configChanged = function(type) {
        ConfigService.save(type, (type == 'filters' ? $scope.filters : $scope.options));

        $scope.generateChordsList();
    };

    /* Helpers */
    $scope.getChordById = function(chord_id) {
        for (var i=0; i<$scope.chords.length; i++) {
            if ($scope.chords[i].name == chord_id) {
                return $scope.chords[i];
            }
        }
    };

    $scope.buildScale = function(chord_name, chord_type) {
        var single_chord_type = ChordTypesFactory.get(chord_type);

        // Double scales to help us loop through it
        var scales = $scope.scales.concat($scope.scales);

        // Find the complete scale for this chord
        // - Cannot have both flat and charp in the same scale
        // - Cannot repeat a note
        var current_scale = [];
        for (var i=0; i<scales.length; i++) {
            // Start with the correct chord
            if (scales[i] == chord_name || scales[i].split('/').indexOf(chord_name) >= 0) {
                current_scale.push(chord_name);
                for (var j=0; j<single_chord_type.scale.length; j++) {
                    i += single_chord_type.scale[j];
                    var inline_scales = scales[i].split('/');
                    var scale = inline_scales[0];
                    if (inline_scales.length > 1) {
                        // Choose the best note if it's a dual note (charp/flat)

                        // If the previous note start with the same letter, use the flat
                        if (current_scale[current_scale.length-1].substr(0, 1) == scale.substr(0, 1)) {
                            scale = inline_scales[1];
                        }

                        // If the first note is a flat, use a flat
                        if (chord_name.substr(1, 1) == '♭') {
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

    $scope.buildChord = function(chord_id, chord_type, chord_index) {
        var chord = $scope.getChordById(chord_id);

        var scale = $scope.buildScale(chord.name, chord_type);

        // Build all available chords for this chord (and chord type)
        var chord_single_chord = chord.chords[$scope.filters['chord_type']][chord_index];

        var single_chord = {};
        single_chord['index'] = chord_index;

        single_chord['notes'] = {'G':'G', 'C':'C', 'E':'E', 'A':'A'};
        single_chord['fingers'] = {'G': 0, 'C': 0, 'E': 0, 'A': 0};

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
        var scales = $scope.scales.concat($scope.scales);

        // Show the notes and fingers for that chord
        for (var finger_position in chord_single_chord['Fingers']) {
            var string = finger_position.substr(0, 1);
            var fret = parseInt(finger_position.substr(1, 1));

            // Place notes
            for (var i=0; i<scales.length; i++) {
                if (scales[i] == string) {
                    single_chord['notes'][string] = scales[i + fret];
                    if (single_chord['notes'][string].indexOf('/') >= 0) {
                        var parts = single_chord['notes'][string].split('/');
                        single_chord['notes'][string] = (scale.indexOf(parts[0]) >= 0 ? parts[0] : parts[1]);
                    }
                    break;
                }
            }

            // Place fingers
            if (fret > single_chord['fingers'][string]) {
                single_chord['fingers'][string] = fret;
            }
        }

        return single_chord;
    };
});
