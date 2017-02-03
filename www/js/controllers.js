ukuleleApp.controller('ChordsFavoritesCtrl', function($scope, $filter, $state, ChordsFavorites, ChordsService, ChordTypesFactory) {
    $scope.generateChordsList = function() {
        var list = [];

        //ChordsFavorites.add('A', 'Major', 0);
        for (var chord_favorite_index in ChordsFavorites.all()) {
            var single_favorite = ChordsFavorites.get(chord_favorite_index);
            var single_chord = ChordsService.get(single_favorite.chord_id);
            var single_chord_type = ChordTypesFactory.get(single_favorite.chord_type);

            var chord = {
                'id':single_chord.name,
                'name':$filter('replaceName')(single_chord.name)+single_chord_type.suffix,
                'type':single_favorite.chord_type,
            };

            if (single_chord.alt_name) {
                chord['alt_name'] = $filter('replaceName')(single_chord.alt_name)+single_chord_type.suffix;
            }
            
            console.log(single_chord.name + ',' + single_favorite.chord_type + ',' + single_favorite.chord_index);
            chord['first_chord'] = ChordsService.generate(single_chord.name, single_favorite.chord_type, single_favorite.chord_index);

            list.push(chord);
        }

        $scope.chords_list = list;
    };

    $scope.showDetail = function(chord_id, chord_type) {
        $state.go('tab.favorites-detail', {'chordType':chord_type, 'chordId':chord_id});
    };
});

ukuleleApp.controller('ChordDetail', function($scope, $stateParams, $filter, ChordsService, ChordTypesFactory, ConfigService, ChordsFavorites) {
    $scope.options = ConfigService.load('options');

    var chord_id = $stateParams.chordId;
    var chord_type = $stateParams.chordType;

    var single_chord_type = ChordTypesFactory.get(chord_type);

    var chord = ChordsService.get(chord_id);

    // The current chord from ChordFactory
    $scope.current_chord = {
        'id':chord_id,
        'name':$filter('replaceName')(chord.name) + single_chord_type.suffix,
        'type':chord_type,
    };

    if (chord.alt_name) {
        $scope.current_chord['name'] += ' / ' + $filter('replaceName')(chord.alt_name) + single_chord_type.suffix;
    }


    $scope.strings = ['G', 'C', 'E', 'A'];
    $scope.scale_parts = single_chord_type.scale_parts;

    $scope.current_scale = ChordsService.buildScale(chord.name, chord_type);

    var chords = [];
    for (var c=0; c<chord.chords[ chord_type ].length; c++) {
        var single_chord = ChordsService.generate(chord_id, chord_type, c);
        chords.push(single_chord);
    }

    $scope.current_chords = chords;

    $scope.add = function(chord_id, chord_type, chord_index) {
        ChordsFavorites.add(chord_id, chord_type, chord_index);
    };

    $scope.remove = function(chord_id, chord_type, chord_index) {
        var favorite_index = ChordsFavorites.getIndex(chord_id, chord_type, chord_index);
        if (favorite_index >= 0) {
            ChordsFavorites.remove(favorite_index);
        }
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

    /* Generate the chords list (depending of the current chord type, and the language) */
    $scope.generateChordsList = function() {
        var single_chord_type = ChordTypesFactory.get($scope.filters['chord_type']);

        var list = [];
        for (var chord_id in ChordsService.all()) {
            var single_chord = ChordsService.all()[chord_id];

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
                chord['first_chord'] = ChordsService.generate(single_chord.name, $scope.filters['chord_type'], 0);
                list.push(chord);
            }
        }
        $scope.chords_list = list;
    }

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

        $scope.generateChordsList();
    };

});
