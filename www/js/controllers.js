ukuleleApp.controller('ChordsList', function($scope, $ionicSideMenuDelegate, ChordsFactory, ChordTypesFactory) {

    $scope.filters = {'chord_type': 'Major'};

    $scope.chords = ChordsFactory.get();
    $scope.chord_types = ChordTypesFactory.get();

    /* Toggle the filters side-menu (from the button) */
    $scope.showChordTypes = function() {
        $ionicSideMenuDelegate.toggleRight();
    };
});
