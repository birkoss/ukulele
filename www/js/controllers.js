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

        // The scale of the current chord & the parts to highlight
        $scope.current_scale = [];
        $scope.scale_parts = single_chord_type.scale_parts;

        $scope.strings = ['G', 'C', 'E', 'A'];
        $scope.notes = {'G':'G', 'C':'C', 'E':'E', 'A':'A'};
        $scope.fingers = [0, 0, 0, 1];

        $scope.chord_paths = {'top': '', 'middle': ''};

        // Determine the fret frame and labels
        $scope.fret_frame = 'top';
        $scope.fret_labels = [1, 2, 3, 4];
        if( chord.chords['Major'][0]['Position'] == 'middle' ) {
            $scope.fret_frame = 'middle';
            $scope.fret_labels = [2, 3, 4, 5];
        }

        // Double scales to help us loop through it
        var scales = $scope.scales.concat($scope.scales);

        // Find the complete scale for this chord
        for (var i=0; i<scales.length; i++) {
            // Start with the correct chord
            if (scales[i] == chord.name || scales[i].split('/').indexOf(chord.name) >= 0) {
                $scope.current_scale.push(chord.name);
                for (var j=0; j<single_chord_type.scale.length; j++) {
                    i += single_chord_type.scale[j];
                    var inline_scales = scales[i].split('/');
                    var scale = inline_scales[0];
                    if (inline_scales.length > 1) {
                        // Choose the best name
                        if ($scope.current_scale[$scope.current_scale.length-1].substr(0, 1) == scale.substr(0, 1)) {
                            scale = inline_scales[1];
                        }
                    }
                    $scope.current_scale.push( scale );
                }
                break;
            }
        }

        // Determine the note from this chord
        for (var finger in chord.chords['Major'][0]['Fingers']) {
            var string = finger.substr(0, 1);
            var fret = parseInt(finger.substr(1, 1));

            for (var i=0; i<scales.length; i++) {
                if (scales[i] == string) {
                    $scope.notes[string] = scales[i + fret];
                    if ($scope.notes[string].indexOf('/') >= 0) {
                        var parts = $scope.notes[string].split('/');
                        $scope.notes[string] = ($scope.current_scale.indexOf(parts[0]) ? parts[1] : parts[0]);
                    }
                    break;
                }
            }
        }

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
