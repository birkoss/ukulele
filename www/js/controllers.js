ukuleleApp.controller('ChordsList', function($scope, $ionicModal, $ionicSideMenuDelegate, ChordsFactory, ChordTypesFactory) {

    $scope.filters = {'chord_type': 'Major'};

    $scope.chords = ChordsFactory.get();
    $scope.chord_types = ChordTypesFactory.get();

    $scope.scales = ['A', 'A#/Bb', 'B', 'C', 'C#/Db', 'D', 'D#/Eb', 'E', 'F', 'F#/Gb', 'G', 'G#/Ab'];

    /* Prepare the chord detail modal */
    $ionicModal.fromTemplateUrl('chord-detail.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function(modal) {
        $scope.modal_chord_detail = modal;
    });

    /* Show/Hide chord detail in a modal */
    $scope.showChord = function(chord) {

        // The current chord from ChordFactory
        $scope.current_chord = chord;
       
        // The current chord type (from the selected filters)
        var single_chord_type = ChordTypesFactory.get($scope.filters['chord_type']);


        $scope.strings = ['G', 'C', 'E', 'A'];
        $scope.scale = [];
        $scope.scale_parts = single_chord_type.scale_parts;


        // Double scales to help us loop through it
        var scales = $scope.scales.concat($scope.scales);

        // Find the complete scale for this chord
        // - Cannot have both flat and charp in the same scale
        // - Cannot repeat a note
        $scope.current_scale = [];
        for (var i=0; i<scales.length; i++) {
            // Start with the correct chord
            if (scales[i] == chord.name || scales[i].split('/').indexOf(chord.name) >= 0) {
                $scope.current_scale.push(chord.name);
                for (var j=0; j<single_chord_type.scale.length; j++) {
                    i += single_chord_type.scale[j];
                    var inline_scales = scales[i].split('/');
                    var scale = inline_scales[0];
                    if (inline_scales.length > 1) {
                        // Choose the best note if it's a dual note (charp/flat)

                        // If the previous note start with the same letter, use the flat
                        if ($scope.current_scale[$scope.current_scale.length-1].substr(0, 1) == scale.substr(0, 1)) {
                            scale = inline_scales[1];
                        }

                        // If the first note is a flat, use a flat
                        if (chord.name.substr(1, 1) == 'b') {
                            scale = inline_scales[1];
                        }
                    } else {
                        // Special case where a Cb (instead of B) or a E# (instead of F) may be required...
                        if (scale == 'B' || scale == 'F') {
                            var scale_special_case = {'B': 'Cb', 'F': 'E#'};
                            if ($scope.current_scale[$scope.current_scale.length-1].substr(0, 1) == scale) {
                                scale = scale_special_case[scale];
                            }
                        }
                    }

                    $scope.current_scale.push( scale );
                }
                break;
            }
        }

        // Build all available chords for this chord (and chord type)
        var chords = [];
        for (var c=0; c<chord.chords[ $scope.filters['chord_type'] ].length; c++) {
            var chord_single_chord = chord.chords[$scope.filters['chord_type']][c];

            var single_chord = {};
            single_chord['index'] = c;

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
                            single_chord['notes'][string] = ($scope.current_scale.indexOf(parts[0]) >= 0 ? parts[0] : parts[1]);
                        }
                        break;
                    }
                }

                // Place fingers
                if (fret > single_chord['fingers'][string]) {
                    single_chord['fingers'][string] = fret;
                }
            }
            
            chords.push(single_chord);
        }

        $scope.current_chords = chords;

        $scope.modal_chord_detail.show();
    };
    $scope.hideChord = function() {
        $scope.current_chord = null;

        $scope.modal_chord_detail.hide();
    }

    /* Toggle the filters side-menu (from the button) */
    $scope.showChordTypes = function() {
        $ionicSideMenuDelegate.toggleRight();
    };
});
