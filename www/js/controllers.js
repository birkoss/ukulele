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
        $scope.current_chord = chord;

        $scope.current_scale = [];
        var scale_modifier = [2, 2, 1, 2, 2, 2, 1];
        $scope.scale_parts = [1, 3, 5];

        var scales = $scope.scales.concat($scope.scales);
        for (var i=0; i<scales.length; i++) {
            if (scales[i] == chord.name || (scales[i].indexOf('/' + chord.name) >= 0 || scales[i].indexOf(chord.name + '/') >= 0)) {
                $scope.current_scale.push(chord.name);
                for (var j=0; j<scale_modifier.length; j++) {
                    i += scale_modifier[j];
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
