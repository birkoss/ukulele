ukuleleApp.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
    $ionicConfigProvider.tabs.position('bottom');

    $stateProvider.state('chords-quiz', {
        url: '/chords-quiz',
        templateUrl: 'views/chords/quiz/index.html',
        controller: 'ChordsQuizCtrl',
    })

    $stateProvider.state('notes-list', {
        url: '/notes-list',
        templateUrl: 'views/notes/index.html',
        controller: 'NotesListCtrl',
    })
    
    $stateProvider.state('notes-quiz', {
        url: '/notes-quiz',
        templateUrl: 'views/notes/quiz/index.html',
        controller: 'NotesQuizCtrl',
    })

    $stateProvider.state('tab', {
        url: '/tab',
        abstract: true,
        templateUrl: 'views/chords/tabs.html'
    })

    .state('tab.chords-list', {
        url: '/chords-list',
        views: {
            'tab-chords-list': {
                templateUrl: 'views/chords/tab-list.html',
                controller: 'ChordsListCtrl',
            }
        }
    })

    .state('tab.chord-detail', {
        url: '/chords/:chordType/:chordId',
        views: {
            'tab-chords-list': {
                templateUrl: 'views/chords/detail.html',
                controller: 'ChordDetailCtrl',

            }
        }
    })

    .state('tab.chords-favorites', {
        url: '/chords-favorites',
        views: {
            'tab-chords-favorites': {
                templateUrl: 'views/chords/tab-favorites.html',
                controller: 'ChordsFavoritesCtrl',
            }
        }
    })

    .state('tab.favorites-detail', {
        url: '/chords/:chordType/:chordId',
        views: {
            'tab-chords-favorites': {
                templateUrl: 'views/chords/detail.html',
                controller: 'ChordDetailCtrl',

            }
        }
    });

    $urlRouterProvider.otherwise('/tab/chords-list');
});
