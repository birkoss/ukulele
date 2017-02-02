ukuleleApp.service('ConfigService', function(localStorageService) {
    this.filters = {'chord_type':'Major'};

    this.options = {'show_notes':true, 'show_scale':true, 'show_frets':true, 'show_strings':true, 'show_in_french':false};

    this.save = function(type, config) {
        localStorageService.set(type, config);
    };

    this.load = function(type) {
        var config = (type == 'filters' ? this.filters : this.options);
        if (localStorageService.get(type)) {
            config = this.merge(config, localStorageService.get(type));
        }
        return config;
    };

	this.merge = function(target, varArgs) { // .length of function is 2
		'use strict';
		if (target == null) { // TypeError if undefined or null
			throw new TypeError('Cannot convert undefined or null to object');
		}

		var to = Object(target);

		for (var index = 1; index < arguments.length; index++) {
			var nextSource = arguments[index];

			if (nextSource != null) { // Skip over if undefined or null
				for (var nextKey in nextSource) {
					// Avoid bugs when hasOwnProperty is shadowed
					if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
						to[nextKey] = nextSource[nextKey];
					}
				}
			}
		}
		return to;
	};
});
