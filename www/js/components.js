ukuleleApp.component('chordFinger', {
    bindings: {
        fingers:'=fingers',
        position:'=position',
        labels:'=labels',
        muted:'=muted',
    },

    templateUrl:'views/components/chord-finger.html'
});

ukuleleApp.directive('fillContent', function($ionicScrollDelegate) {
    return {
        link: function($scope, element, attrs) {
            element.ready(function() {
                element[0].style.height = $ionicScrollDelegate.getScrollView().__clientHeight + 'px';
            });
        }
    };
});
