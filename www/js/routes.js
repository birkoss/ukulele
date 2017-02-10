ukuleleApp.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
    $ionicConfigProvider.tabs.position('bottom');

    /* Chords */

    $stateProvider.state('chords', {
        url:'/chords',
        templateUrl:'views/chords/tabs.html',
        abstract:true
    })
    .state('chords.list', {
        url:'/list',
        views: {
            'chords-list': {
                templateUrl:'views/chords/tab-list.html',
                controller:'ChordsListCtrl',
            }
        }
    })
    .state('chords.detail', {
        url: '/:chordType/:chordId',
        views: {
            'chords-list': {
                templateUrl: 'views/chords/detail.html',
                controller: 'ChordDetailCtrl',
            }
        }
    })
    .state('chords.favorites', {
        url: '/favorites',
        views: {
            'chords-favorites': {
                templateUrl: 'views/chords/tab-favorites.html',
                controller: 'ChordsFavoritesCtrl',
            }
        }
    })
    .state('chords.detail-position', {
        url: '/:chordType/:chordId/:chordIndex',
        views: {
            'chords-favorites': {
                templateUrl: 'views/chords/detail.html',
                controller: 'ChordDetailCtrl',
            }
        }
    })
    .state('chords-quiz', {
        url: '/chords/quiz',
        templateUrl: 'views/chords/quiz/index.html',
        controller: 'ChordsQuizCtrl',
    });

    /* Notes */

    $stateProvider.state('notes', {
        url:'/notes',
        templateUrl:'views/notes/tabs.html',
        abstract:true
    })
    .state('notes.list', {
        url:'/list',
        views: {
            'notes-list': {
                templateUrl:'views/notes/tab-list.html',
                controller:'NotesListCtrl',
            }
        }
    })
    .state('notes.favorites', {
        url: '/favorites',
        views: {
            'notes-favorites': {
                templateUrl:'views/notes/tab-favorites.html',
                controller:'NotesFavoritesCtrl',
            }
        }
    })
    .state('notes-quiz', {
        url: '/notes/quiz',
        templateUrl:'views/notes/quiz/index.html',
        controller:'NotesQuizCtrl',
    });

    $urlRouterProvider.otherwise('/chords/list');
});
