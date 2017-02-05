ukuleleApp.controller('ChordsFavoritesCtrl', function($scope, $filter, $state, $ionicSideMenuDelegate, ChordsFavoritesService, ChordsService, ChordTypesService, ConfigService) {
    $scope.options = ConfigService.load('options');

    $scope.showDetail = function(chord_id, chord_type) {
        $state.go('tab.favorites-detail', {'chordType':chord_type, 'chordId':chord_id});
    };

    $scope.getChordsList = function() {
        return ChordsFavoritesService.all();
    };

    $scope.toggleMenu = function() {
        $ionicSideMenuDelegate.toggleLeft();
    };
});

ukuleleApp.controller('ChordDetailCtrl', function($scope, $stateParams, $filter, ChordsService, ChordTypesService, ConfigService, ChordsFavoritesService) {
    $scope.options = ConfigService.load('options');

    var chord_id = $stateParams.chordId;
    var chord_type = $stateParams.chordType;

    var single_chord_type = ChordTypesService.get(chord_type);

    var chord = ChordsService.get(chord_id);

    $scope.strings = ['G', 'C', 'E', 'A'];
    $scope.scale_parts = single_chord_type.scale_parts;

    $scope.current_scale = ChordsService.buildScale(chord.name, chord_type);

    $scope.chord = chord;
    $scope.chord_type = chord_type;

    $scope.add = function(chord_id, chord_type, chord_index) {
        ChordsFavoritesService.add(chord_id, chord_type, chord_index);
    };

    $scope.remove = function(chord_id, chord_type, chord_index) {
        var favorite_index = ChordsFavoritesService.getIndex(chord_id, chord_type, chord_index);
        if (favorite_index >= 0) {
            ChordsFavoritesService.remove(favorite_index);
        }
    };

    $scope.isFavorite = function(chord_id, chord_type, chord_index) {
        return ChordsFavoritesService.exists(chord_id, chord_type, chord_index);
    };
});

ukuleleApp.controller('ChordsListCtrl', function($scope, $filter, $ionicModal, $ionicSideMenuDelegate, $ionicPopover, $state, ChordTypesService, ConfigService, ChordsService) {

    $scope.filters = ConfigService.load('filters');

    $scope.options = ConfigService.load('options');

    $scope.chord_types = ChordTypesService.all();

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

    $scope.toggleMenu = function() {
        $ionicSideMenuDelegate.toggleLeft();
    };

});


ukuleleApp.controller('QuizCtrl', function($scope, $ionicSideMenuDelegate, $ionicPopup, $ionicPopover, ChordsService, ConfigService, ChordTypesService) {
    $scope.answer = {};

    $scope.options = ConfigService.load('quiz_options');

    $scope.playing = false;

    $ionicPopover.fromTemplateUrl('views/quiz/popups/options.html', {
        scope: $scope
    }).then(function(popover) {
    $scope.popover = popover;
});

    $scope.pickChord = function() {
        $scope.answer = {};

        $scope.current_chord_type = $scope.getChordTypes()[$scope.getRandomInt(0, $scope.getChordTypes().length)].name;
        $scope.current_chord = $scope.getChordsList($scope.current_chord_type)[$scope.getRandomInt(0, $scope.getChordsList($scope.current_chord_type).length)].name;

        $scope.playing = true;
    };

    $scope.getChordTypes = function() {
        return ChordTypesService.all().filter(function(item) {
            return $scope.options[item.name]; 
        });
    };

    $scope.getChordsList = function(chord_type) {
        return ChordsService.all().filter(function(item) {
            return (item.types[chord_type]);
        });
    };

    $scope.toggleMenu = function() {
        $ionicSideMenuDelegate.toggleLeft();
    };

    $scope.validate = function() {
        console.log( $scope.answer );
    };

    $scope.showOptions = function($event) {
        $scope.popover.show($event);
    };

    $scope.optionChanged = function() {
        ConfigService.save('quiz_options', $scope.options);
    };

    $scope.$watch('answer', function(newVal, oldVal) {
        if (newVal != oldVal && $scope.playing) {
            var answer = Object.keys($scope.answer);
            answer.sort();

            var all_chords = ChordsService.get($scope.current_chord).types[$scope.current_chord_type].chords;
            for (var single_chord in all_chords) {

                var chord_frets = Object.keys(all_chords[single_chord]['Fingers']);
                chord_frets.sort();


                if (JSON.stringify(chord_frets) == JSON.stringify(answer)) {
                    $scope.answer = all_chords[single_chord]['Fingers'];
                    $scope.playing = false;
                    $scope.win();
                    break;
                }
            }
        }
    }, true);

    $scope.showSolution = function() {
        var all_chords = ChordsService.get($scope.current_chord).types[$scope.current_chord_type].chords;
        for (var single_chord in all_chords) {
            $scope.playing = false;
            $scope.answer = all_chords[single_chord]['Fingers'];
        }
    };

    $scope.win = function() {
        var alertPopup = $ionicPopup.alert({
            title: 'Correct!',
            template: 'It\'s a valid chord!'
        });

        alertPopup.then(function(res) {
            /*$scope.allowNextQuestion();*/
        });
    };

    $scope.getRandomInt = function(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }
});


ukuleleApp.controller('NotesListCtrl', function($scope, $filter, $ionicSideMenuDelegate, $ionicPopover, NotesService, ConfigService) {

    $scope.options = ConfigService.load('notes_options');

    $ionicPopover.fromTemplateUrl('views/notes/popups/options.html', {
        scope: $scope
    }).then(function(popover) {
        $scope.popover = popover;
    });

    $scope.getNotesList = function() {
        return NotesService.all().filter(function(item) {
            return ($scope.options['include_flat_sharp'] || item.name.length == 1);
        });
    };

    $scope.toggleMenu = function() {
        $ionicSideMenuDelegate.toggleLeft();
    };

    $scope.showOptions = function($event) {
        $scope.popover.show($event);
    };

    $scope.configChanged = function() {
        ConfigService.save('notes_options', $scope.options);
    };

});
