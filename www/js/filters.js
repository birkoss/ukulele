ukuleleApp.filter('replaceName', function(ChordsService, ConfigService) {
    return function(name) {
        var options = ConfigService.load('options');
        if (options['show_in_french']) {
            var french_names = ChordsService.get_french_names();
            for (var note in french_names) {
                if (name.indexOf(note) >= 0) {
                    name = name.replace(note, french_names[note]);
                    break;
                }
            }
        }
        return name;
    }
});
