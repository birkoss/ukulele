ukuleleApp.service('ConfigService', function(localStorageService) {
    this.filters = {'chord_type':'Major'};

    this.options = {'show_notes':true, 'show_scale':true, 'show_fingers':true, 'show_strings':true, 'show_in_french':false};

    this.save = function(type) {
        localStorageService.set(type, (type == 'filters' ? this.filters : this.options));
    };

    this.load = function(type) {
        var config = (type == 'filters' ? this.filters : this.options);
        if (localStorageService.get(type)) {
            config = assign(config, localStorage.get(type));
        }
        return config;
    };
});
