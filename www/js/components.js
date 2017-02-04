ukuleleApp.component('chordFinger', {
    bindings: {
        fingers:'=fingers',
        position:'=position',
        labels:'=labels',
        muted:'=muted',
    },
    controller: function() {
        this.$onInit = function() {
            console.log('onInit');
            this.toggleMarker = function(event) {
                for (var i=0; i<event.path.length; i++) {
                    if (event.path[i].nodeName == 'svg') {
                        svg_parent = event.path[i];
                    }
                }

                var x = event.offsetX;
                var y = event.offsetY;
                var parent_width = svg_parent.clientWidth;
                var parent_height = svg_parent.clientHeight;

                var scale = (parent_width / 250);

                var origin_start = 36 * scale;
                var grid_size = 55 * scale;

                x-= origin_start;
                y-= origin_start;

                var p_x = Math.max(0, Math.floor(x / grid_size));
                var p_y = Math.max(0, Math.floor(y / grid_size));

                var strings = {'0':'G', '1':'C', '2':'E', '3':'A'};

                this.fingers[strings[p_x] + (p_y+1)] = '1';
                console.log(this.labels);
                console.log('sway2: ' + scale);
                console.log('XY:' + x + 'x' + y);
                console.log('Fret:' + p_x + 'x' + p_y);
                console.log('Parent:' + parent_width + 'x' + parent_height);
            };
        };
        this.sway = function() {
            console.log('sway');
        };
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
