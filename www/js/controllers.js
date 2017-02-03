ukuleleApp.controller('ChordsFavoritesCtrl', function($scope, $filter, $state, ChordsFavorites, ChordsService, ChordTypesFactory, ConfigService) {
    $scope.options = ConfigService.load('options');

    $scope.showDetail = function(chord_id, chord_type) {
        $state.go('tab.favorites-detail', {'chordType':chord_type, 'chordId':chord_id});
    };

    $scope.getChordsList = function() {
        return ChordsFavorites.all();
    };
});

ukuleleApp.controller('ChordDetail', function($scope, $stateParams, $filter, ChordsService, ChordTypesFactory, ConfigService, ChordsFavorites) {
    $scope.options = ConfigService.load('options');

    var chord_id = $stateParams.chordId;
    var chord_type = $stateParams.chordType;

    var single_chord_type = ChordTypesFactory.get(chord_type);

    var chord = ChordsService.get(chord_id);

    $scope.strings = ['G', 'C', 'E', 'A'];
    $scope.scale_parts = single_chord_type.scale_parts;

    $scope.current_scale = ChordsService.buildScale(chord.name, chord_type);

    $scope.chord = chord;
    $scope.chord_type = chord_type;

    $scope.add = function(chord_id, chord_type, chord_index) {
        ChordsFavorites.add(chord_id, chord_type, chord_index);
    };

    $scope.remove = function(chord_id, chord_type, chord_index) {
        var favorite_index = ChordsFavorites.getIndex(chord_id, chord_type, chord_index);
        if (favorite_index >= 0) {
            ChordsFavorites.remove(favorite_index);
        }
    };

    $scope.isFavorite = function(chord_id, chord_type, chord_index) {
        return ChordsFavorites.exists(chord_id, chord_type, chord_index);
    };
});

ukuleleApp.controller('ChordsList', function($scope, $filter, $ionicModal, $ionicSideMenuDelegate, $ionicPopover, $state, ChordTypesFactory, ConfigService, ChordsService) {

    $scope.filters = ConfigService.load('filters');

    $scope.options = ConfigService.load('options');

    $scope.chord_types = ChordTypesFactory.get();

    $scope.chord_families = {};
    for (var i=0; i<$scope.chord_types.length; i++) {
        if ($scope.chord_families[$scope.chord_types[i].chord] == undefined) {
            $scope.chord_families[$scope.chord_types[i].chord] = [];
        }
        $scope.chord_families[$scope.chord_types[i].chord].push($scope.chord_types[i].name);
    }

    $scope.chords_list = [];

    $scope.popups = {};

    $ionicPopover.fromTemplateUrl('views/chords/popups/options.html', {
        scope: $scope
    }).then(function(popover) {
        $scope.popups['options'] = popover;
    });
    $ionicPopover.fromTemplateUrl('views/chords/popups/filters.html', {
        scope: $scope
    }).then(function(popover) {
        $scope.popups['filters'] = popover;
    });


    $scope.showDetail = function(chord_id) {
        $state.go('tab.chord-detail', {'chordType':$scope.filters['chord_type'], 'chordId':chord_id});
    };

    /* Toggle the filters side-menu (from the button) */
    $scope.showChordTypes = function($event) {
        $scope.current_popup = $scope.popups['filters'];
        $scope.current_popup.show($event);
    };

    /* Toggle the options side-menu (from the button) */
    $scope.showOptions = function($event) {
        $scope.current_popup = $scope.popups['options'];
        $scope.current_popup.show($event);
    };

    /* Called when a config has changed */
    $scope.configChanged = function(type) {
        ConfigService.save(type, (type == 'filters' ? $scope.filters : $scope.options));
    };

    $scope.getChordsList = function() {
        return ChordsService.all().filter(function(item) {
            return (item.types[$scope.filters['chord_type']]);
        });
    };

});
