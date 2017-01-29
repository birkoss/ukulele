ukuleleApp.controller('ChordsList', function($scope, $ionicModal, $ionicSideMenuDelegate, ChordsFactory, ChordTypesFactory) {

    $scope.filters = {'chord_type': 'Major'};

    $scope.chords = ChordsFactory.get();
    $scope.chord_types = ChordTypesFactory.get();

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
