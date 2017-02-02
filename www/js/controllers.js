ukuleleApp.controller('ChordsList', function($scope, $filter, $ionicModal, $ionicSideMenuDelegate, $ionicPopover, ChordTypesFactory, ConfigService, ChordsService) {

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

    /* Show/Hide chord detail in a modal */
    $scope.showChord = function(chord_id) {
        var single_chord_type = ChordTypesFactory.get($scope.filters['chord_type']);

        var chord = ChordsService.get(chord_id);

        // The current chord from ChordFactory
        $scope.current_chord = {
            'name':$filter('replaceName')(chord.name) + single_chord_type.suffix,
        };

        if (chord.alt_name) {
            $scope.current_chord['alt_name'] = $filter('replaceName')(chord.alt_name) + single_chord_type.suffix;
        }
       

        $scope.strings = ['G', 'C', 'E', 'A'];
        $scope.scale_parts = single_chord_type.scale_parts;

        $scope.current_scale = ChordsService.buildScale(chord.name, $scope.filters['chord_type']);

        var chords = [];
        for (var c=0; c<chord.chords[ $scope.filters['chord_type'] ].length; c++) {
            var single_chord = ChordsService.generate(chord_id, $scope.filters['chord_type'], c);
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
    $scope.showChordTypes = function($event) {
        //$ionicSideMenuDelegate.toggleRight();
        $scope.current_popup = $scope.popups['filters'];
        $scope.current_popup.show($event);
    };

    /* Toggle the options side-menu (from the button) */
    $scope.showOptions = function($event) {
        //$ionicSideMenuDelegate.toggleLeft();
        $scope.current_popup = $scope.popups['options'];
        $scope.current_popup.show($event);
    };

    /* Called when a config has changed */
    $scope.configChanged = function(type) {
        ConfigService.save(type, (type == 'filters' ? $scope.filters : $scope.options));

        $scope.generateChordsList();
    };

});
