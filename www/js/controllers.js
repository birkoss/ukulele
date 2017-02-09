ukuleleApp.controller('ChordsFavoritesCtrl', function($scope, $filter, $state, $ionicSideMenuDelegate, ChordsFavoritesService, ChordsService, ChordTypesService, ConfigService) {
    $scope.options = ConfigService.load('options');

    $scope.showDetail = function(chord_id, chord_type, chord_index) {
        $state.go('tab.favorites-detail-index', {'chordType':chord_type, 'chordId':chord_id, 'chordIndex':chord_index});
    };

    $scope.getChordsList = function() {
        return ChordsFavoritesService.all();
    };

    $scope.toggleMenu = function() {
        $ionicSideMenuDelegate.toggleLeft();
    };
});

ukuleleApp.controller('ChordDetailCtrl', function($scope, $stateParams, $timeout, $filter, $location, $ionicScrollDelegate, ChordsService, ChordTypesService, ConfigService, ChordsFavoritesService) {
    $scope.options = ConfigService.load('options');

    var chord_id = $stateParams.chordId;
    var chord_type = $stateParams.chordType;

    // Go to the correct index if provided (mostly from the favorites)
    if ($stateParams.chordIndex != undefined) {
        $timeout(function() {
            $location.hash('chord_index_' + $stateParams.chordIndex);
            $ionicScrollDelegate.anchorScroll();
        }, 250);
    }

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

ukuleleApp.controller('ChordsListCtrl', function($scope, $filter, $ionicSideMenuDelegate, $ionicPopover, $state, ChordTypesService, ConfigService, ChordsService) {

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


ukuleleApp.controller('NotesQuizCtrl', function($scope, $ionicSideMenuDelegate, $ionicPopup, $ionicPopover, ConfigService, NotesService) {
    $scope.answers = [];
    $scope.answers_tried = [];

    $scope.playing = false;

    $scope.options = ConfigService.load('notes_quiz_options');

    $ionicPopover.fromTemplateUrl('views/notes/quiz/popups/options.html', {
        scope: $scope
    }).then(function(popover) {
    $scope.popover = popover;
});

    $scope.pickNote = function() {
        $scope.playing = true;
        $scope.answers = [];
        $scope.answers_tried = [];

        $scope.current_note = $scope.getNotesList()[$scope.getRandomInt(0, $scope.getNotesList().length)];

        $scope.answers.push($scope.current_note.name);

        do {
            var junk_note = $scope.getNotesList()[$scope.getRandomInt(0, $scope.getNotesList().length)].name;

            if ($scope.answers.indexOf(junk_note) == -1) {
                $scope.answers.push(junk_note);
            }

        } while ($scope.answers.length < 5);

        $scope.answers.sort();
    };

    $scope.pickAnswer = function(answer) {
        if ($scope.playing) {
            $scope.answers_tried.push(answer);
            if ($scope.current_note.name == answer) {
                $scope.playing = false;
                $scope.goodAnswer();
            } else {
                $scope.wrongAnswer(answer);
            }
        }
    };

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

    $scope.optionChanged = function() {
        ConfigService.save('notes_quiz_options', $scope.options);
    };

    $scope.wrongAnswer = function(answer) {
        var alertPopup = $ionicPopup.alert({
            title: 'Wrong!',
            template: 'It\'s not the correct note!'
        });
    };

    $scope.goodAnswer = function() {
        var alertPopup = $ionicPopup.alert({
            title: 'Correct!',
            template: 'It\'s the correct note!'
        });

        alertPopup.then(function(res) {
            /*$scope.allowNextQuestion();*/
        });
    };

    $scope.getRandomInt = function(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }
});

ukuleleApp.controller('ChordsQuizCtrl', function($scope, $ionicSideMenuDelegate, $ionicPopup, $ionicPopover, ChordsService, ConfigService, ChordTypesService) {
    $scope.answer = {};

    $scope.options = ConfigService.load('quiz_options');

    $scope.playing = false;

    $scope.fret_start = 0;
    $scope.fret_labels = [];

    $ionicPopover.fromTemplateUrl('views/chords/quiz/popups/options.html', {
        scope: $scope
    }).then(function(popover) {
    $scope.popover = popover;
});

    $scope.pickChord = function() {
        $scope.fret_start = 0;
        $scope.moveFret(1);

        $scope.answer = {};

        $scope.current_chord_type = $scope.getChordTypes()[$scope.getRandomInt(0, $scope.getChordTypes().length)].name;
        $scope.current_chord = $scope.getChordsList($scope.current_chord_type)[$scope.getRandomInt(0, $scope.getChordsList($scope.current_chord_type).length)].name;

        $scope.playing = true;
    };

    $scope.getChordTypesFilters = function() {
        var filters = [];
        for (var key in $scope.options) {
            if (key.substr(0, 13) == 'include_type_') {
                filters.push(key.substr(13));
            }
        }
        return filters;
    };

    $scope.moveFret = function(y) {
        $scope.fret_start += y;
        
        $scope.fret_labels = [];
        for(var i=0; i<4; i++) {
            $scope.fret_labels.push($scope.fret_start + i);
        }
    };

    $scope.getChordTypes = function() {
        return ChordTypesService.all().filter(function(item) {
            return $scope.options['include_type_' + item.name];
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

            for (var i in answer) {
                var string = answer[i].substr(0, 1);
                var fret = parseInt(answer[i].substr(1)) + $scope.fret_start - 1;

                answer[i] = string + fret;
            }

            var all_chords = ChordsService.get($scope.current_chord).types[$scope.current_chord_type].chords;
            for (var single_chord in all_chords) {

                var chord_frets = Object.keys(all_chords[single_chord]['Fingers']);
                chord_frets.sort();

                if (JSON.stringify(chord_frets) == JSON.stringify(answer)) {
                    $scope.answer = all_chords[single_chord]['Fingers'];

                    $scope.adaptAnswerFretStart();

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

            $scope.fret_start = 1;

            if (all_chords[single_chord]['Start'] != undefined) {
                $scope.fret_start = parseInt(all_chords[single_chord]['Start']) ;

                $scope.adaptAnswerFretStart();
            }

            $scope.moveFret(0);
            break;
        }
    };

    $scope.adaptAnswerFretStart = function() {
        for (var key in $scope.answer) {
            var string = key.substr(0, 1);
            var fret = parseInt(key.substr(1)) - $scope.fret_start + 1;

            var finger = $scope.answer[key];
            delete $scope.answer[key];

            $scope.answer[string + fret] = finger;
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
