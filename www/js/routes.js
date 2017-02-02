ukuleleApp.config(function($stateProvider, $urlRouterProvider) {
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
                controller: 'ChordsList'
            }
        }
    })

    .state('tab.chords-favorites', {
        url: '/chords-favorites',
        views: {
            'tab-chords-favorites': {
                templateUrl: 'views/chords/tab-favorites.html',
            }
        }
    });

    $urlRouterProvider.otherwise('/tab/chords-list');
});
